import { Client } from '@notionhq/client'
import type { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

type LinkItem = {
  id: string
  title: string
  url: string
  description?: string
  category?: string
  featured?: boolean
  primary?: boolean
  order?: number
  icon?:
    | { type: 'emoji'; emoji: string }
    | { type: 'external'; url: string }
    | { type: 'file'; url: string }
}

function normalizeIcon(page: PageObjectResponse): LinkItem['icon'] {
  const icon: any = (page as any).icon
  if (!icon) return undefined

  if (icon.type === 'emoji' && typeof icon.emoji === 'string') {
    return { type: 'emoji', emoji: icon.emoji }
  }

  if (icon.type === 'external' && typeof icon.external?.url === 'string') {
    return { type: 'external', url: icon.external.url }
  }

  if (icon.type === 'file' && typeof icon.file?.url === 'string') {
    return { type: 'file', url: icon.file.url }
  }

  return undefined
}

function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return 'properties' in page
}

function getPlainTextFromTitleProp(prop: any): string {
  // Notion title property structure: { type: 'title', title: Array<{ plain_text: string }> }
  const parts = prop?.title
  if (!Array.isArray(parts)) return ''
  return parts.map((p) => p?.plain_text).filter(Boolean).join('')
}

function getTitleFromProperties(props: any): string {
  // Support common title field names, plus a generic fallback to the first title-type property.
  const direct =
    getPlainTextFromTitleProp(props?.Name) || getPlainTextFromTitleProp(props?.Title)
  if (direct) return direct

  if (props && typeof props === 'object') {
    for (const key of Object.keys(props)) {
      const prop = props[key]
      if (prop?.type === 'title') {
        const v = getPlainTextFromTitleProp(prop)
        if (v) return v
      }
    }
  }

  return ''
}

function getPlainTextFromRichTextProp(prop: any): string {
  const parts = prop?.rich_text
  if (!Array.isArray(parts)) return ''
  return parts.map((p) => p?.plain_text).filter(Boolean).join('')
}

function getCheckbox(prop: any): boolean | undefined {
  if (prop?.type !== 'checkbox') return undefined
  return Boolean(prop?.checkbox)
}

function getNumber(prop: any): number | undefined {
  if (prop?.type !== 'number') return undefined
  return typeof prop?.number === 'number' ? prop.number : undefined
}

function getSelectName(prop: any): string | undefined {
  if (prop?.type !== 'select') return undefined
  return prop?.select?.name || undefined
}

function getUrl(prop: any): string | undefined {
  if (prop?.type !== 'url') return undefined
  return prop?.url || undefined
}

function getUrlFromProperties(props: any): string | undefined {
  // Support common URL field names, plus a generic fallback to the first url-type property.
  const direct = getUrl(props?.URL) || getUrl(props?.Url) || getUrl(props?.Link)
  if (direct) return direct

  if (props && typeof props === 'object') {
    for (const key of Object.keys(props)) {
      const prop = props[key]
      if (prop?.type === 'url') {
        const v = getUrl(prop)
        if (v) return v
      }
    }
  }

  return undefined
}

function normalizeLinkItem(page: PageObjectResponse): LinkItem | null {
  // Expected Notion properties (recommended):
  // - Name (title)
  // - URL (url)
  // - Description (rich_text) [optional]
  // - Category (select) [optional]
  // - Featured (checkbox) [optional]
  // - Primary (checkbox) [optional]
  // - Order (number) [optional]
  // - Enabled (checkbox) [optional]

  const props: any = page.properties

  // Filtering behavior:
  // - If Enabled checkbox exists and is false → exclude.
  // - Otherwise include.
  const enabled = getCheckbox(props?.Enabled)
  if (enabled === false) return null

  const title = getTitleFromProperties(props)
  const url = getUrlFromProperties(props)

  if (!title || !url) return null

  const description = getPlainTextFromRichTextProp(props?.Description) || undefined
  const category = getSelectName(props?.Category)
  const featured = getCheckbox(props?.Featured) || false
  const primary = getCheckbox(props?.Primary) || false
  const order = getNumber(props?.Order)
  const icon = normalizeIcon(page)

  return {
    id: page.id,
    title,
    url,
    description,
    category,
    featured,
    primary,
    order,
    icon
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const debug = query?.debug === '1' || query?.debug === 'true'

    const config = useRuntimeConfig(event) as any

    // Read from runtimeConfig first (preferred), then fall back to runtime env vars.
    // IMPORTANT: use bracket access to avoid any build-time env inlining.
    const token =
      config.notion?.token ||
      process.env['NUXT_NOTION_TOKEN'] ||
      process.env['NOTION_TOKEN']

    const databaseId =
      config.notion?.linksDatabaseId ||
      process.env['NUXT_NOTION_LINKS_DATABASE_ID'] ||
      process.env['NOTION_LINKS_DATABASE_ID']

    if (!token || !databaseId) {
      throw createError({
        statusCode: 500,
        statusMessage:
          'Missing Notion configuration. Set NUXT_NOTION_TOKEN and NUXT_NOTION_LINKS_DATABASE_ID (recommended), or NOTION_TOKEN and NOTION_LINKS_DATABASE_ID (fallback).'
      })
    }

    const notion = new Client({ auth: token, notionVersion: '2025-09-03' })

    // Notion SDK v5+ moved database querying to `dataSources.query`.
    // To support both old & new SDKs, we:
    // 1) try to retrieve the database and query its data source
    // 2) fallback to `databases.query` if available.
    let res:
      | { results: Array<PageObjectResponse | PartialPageObjectResponse> }
      | undefined

    const notionAny = notion as any

    if (notionAny?.dataSources?.query) {
      const db = (await notionAny.databases.retrieve({
        database_id: databaseId
      })) as any

      const dataSourceId = db?.data_source?.id || db?.data_sources?.[0]?.id
      if (!dataSourceId) {
        throw createError({
          statusCode: 500,
          statusMessage:
            'Could not resolve Notion data_source id from database. Ensure the database ID is correct.'
        })
      }

      res = (await notionAny.dataSources.query({
        data_source_id: dataSourceId
      })) as { results: Array<PageObjectResponse | PartialPageObjectResponse> }

      if (debug) {
        // attach for debugging response
        ;(res as any).__debug = {
          mode: 'dataSources.query',
          databaseId,
          dataSourceId,
          databaseObject: db?.object,
          databaseTitle: Array.isArray(db?.title)
            ? db.title.map((t: any) => t?.plain_text).filter(Boolean).join('')
            : undefined
        }
      }
    } else if (notionAny?.databases?.query) {
      res = (await notionAny.databases.query({
        database_id: databaseId
      })) as { results: Array<PageObjectResponse | PartialPageObjectResponse> }

      if (debug) {
        ;(res as any).__debug = {
          mode: 'databases.query',
          databaseId
        }
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage:
          'Notion client does not support querying databases (no dataSources.query or databases.query).'
      })
    }

    const rawResults = res.results
    const fullPages = rawResults.filter(isFullPage)

    let skippedDisabled = 0
    let skippedMissingName = 0
    let skippedMissingUrl = 0
    let included = 0

    const items: LinkItem[] = []
    for (const page of fullPages) {
      const props: any = page.properties

      const enabled = getCheckbox(props?.Enabled)
      if (enabled === false) {
        skippedDisabled++
        continue
      }

      const title = getTitleFromProperties(props)
      if (!title) {
        skippedMissingName++
        continue
      }

      const url = getUrlFromProperties(props)
      if (!url) {
        skippedMissingUrl++
        continue
      }

      const item = normalizeLinkItem(page)
      if (item) {
        items.push(item)
        included++
      }
    }

    // Determine primary link
    const primaryIdx = items.findIndex((i: LinkItem) => i.primary)
    if (primaryIdx === -1) {
      // fallback: first featured
      const featuredIdx = items.findIndex((i: LinkItem) => i.featured)
      if (featuredIdx !== -1) items[featuredIdx].primary = true
    } else {
      // If multiple primary were set, keep only the first
      items.forEach((i: LinkItem, idx: number) => {
        if (idx !== primaryIdx) i.primary = false
      })
    }

    // Sort: primary first, then featured, then order, then title
    items.sort((a: LinkItem, b: LinkItem) => {
      const aP = a.primary ? 1 : 0
      const bP = b.primary ? 1 : 0
      if (aP !== bP) return bP - aP

      const aF = a.featured ? 1 : 0
      const bF = b.featured ? 1 : 0
      if (aF !== bF) return bF - aF

      const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
      const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
      if (ao !== bo) return ao - bo

      return a.title.localeCompare(b.title)
    })

    setHeader(event, 'Content-Type', 'application/json; charset=utf-8')

    if (debug) {
      const first = fullPages[0] as any
      const propertyKeysSample = first?.properties ? Object.keys(first.properties) : []
      return {
        generatedAt: new Date().toISOString(),
        count: items.length,
        items,
        debug: {
          ...(res as any).__debug,
          rawCount: rawResults.length,
          fullPageCount: fullPages.length,
          included,
          skippedDisabled,
          skippedMissingName,
          skippedMissingUrl,
          propertyKeysSample
        }
      }
    }

    return {
      generatedAt: new Date().toISOString(),
      count: items.length,
      items
    }
  },
  {
    // Cache behavior is based on env vars at runtime.
    // (Nitro caching options currently expect a plain object.)
    maxAge: 600,
    staleMaxAge: 3600,
    name: 'notion-links'
  }
)
