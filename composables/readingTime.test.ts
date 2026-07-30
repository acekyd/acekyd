import { describe, expect, it } from 'vitest'
import { readingMinutes } from './readingTime'

const text = (value: string) => ({ type: 'text', value })

describe('readingMinutes', () => {
  it('counts text recursively and estimates at 200 words per minute', () => {
    const doc = {
      body: {
        children: [
          text('one two three'),
          {
            children: [
              text(Array.from({ length: 197 }, (_, index) => `word${index}`).join(' ')),
            ],
          },
        ],
      },
    }

    expect(readingMinutes(doc)).toBe(1)
  })

  it('returns one minute when the body is empty or missing', () => {
    expect(readingMinutes({ body: { children: [] } })).toBe(1)
    expect(readingMinutes({})).toBe(1)
  })

  it('does not count whitespace-only text nodes', () => {
    const doc = {
      body: {
        children: [text('  \n\t  '), { children: [text('   ')] }],
      },
    }

    expect(readingMinutes(doc)).toBe(1)
  })

  it('rounds at the nearest whole minute boundary', () => {
    const words = (count: number) =>
      Array.from({ length: count }, (_, index) => `word${index}`).join(' ')

    expect(readingMinutes({ body: { children: [text(words(299))] } })).toBe(1)
    expect(readingMinutes({ body: { children: [text(words(300))] } })).toBe(2)
  })
})
