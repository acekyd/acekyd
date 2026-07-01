<template>
  <div ref="root" class="aurora" aria-hidden="true">
    <canvas ref="canvasEl" class="aurora__canvas" />
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(async () => {
  if (!import.meta.client) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.createElement('canvas').getContext('webgl')) return

  let THREE: any
  try {
    THREE = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js')
  } catch (e) {
    return
  }

  const canvas = canvasEl.value!
  const container = root.value!

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
  const pr = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(pr)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const isDark = () => document.documentElement.classList.contains('dark')
  const channels = (name: string, fallback: number[]) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    const p = raw.split(/[\s,]+/).map(Number).filter((n) => !Number.isNaN(n))
    return p.length === 3 ? p : fallback
  }
  const accent = () => {
    const [r, g, b] = channels('--accent', [13, 158, 120])
    return new THREE.Color(r / 255, g / 255, b / 255)
  }
  // A muted cool tone to give the aurora depth alongside the teal accent.
  const cool = () => (isDark() ? new THREE.Color(0.10, 0.38, 0.52) : new THREE.Color(0.52, 0.60, 0.80))

  const uniforms = {
    uTime: { value: reduced ? 12.0 : 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uMouseStr: { value: 0 },
    uAccent: { value: accent() },
    uCool: { value: cool() },
    uIntensity: { value: isDark() ? 0.42 : 0.18 },
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime, uMouseStr, uIntensity;
      uniform vec2 uRes, uMouse;
      uniform vec3 uAccent, uCool;

      float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5;
        for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; }
        return v;
      }

      void main(){
        float aspect = uRes.x / uRes.y;
        vec2 uv = vUv;
        vec2 auv = vec2(uv.x*aspect, uv.y);
        vec2 amouse = vec2(uMouse.x*aspect, uMouse.y);

        float t = uTime * 0.06;
        float scale = 2.2;

        // cursor pulls the field toward it, creating a soft warp
        float md = distance(auv, amouse);
        float mInf = smoothstep(0.5, 0.0, md) * uMouseStr;
        vec2 warp = (amouse - auv) * mInf * 0.35;

        // domain-warped fbm → slow liquid bands
        vec2 base = auv*scale + warp;
        vec2 q = vec2(fbm(base + vec2(0.0,0.0) + t), fbm(base + vec2(5.2,1.3) + t*1.1));
        vec2 r = vec2(fbm(base + 2.0*q + vec2(1.7,9.2) - t*0.8), fbm(base + 2.0*q + vec2(8.3,2.8) + t*0.6));
        float n = fbm(base + 3.0*r);
        float tone = fbm(base*0.7 + r);

        vec3 col = mix(uCool, uAccent, smoothstep(0.35, 0.8, tone));

        float bands = smoothstep(0.42, 0.95, n);
        float alpha = bands * uIntensity;
        alpha += mInf * uIntensity * 0.7;            // accent bloom under cursor
        col = mix(col, uAccent, mInf * 0.5);

        // fade toward all edges so it dissolves into the page background
        float edge = smoothstep(0.0, 0.22, uv.x) * smoothstep(1.0, 0.78, uv.x)
                   * smoothstep(0.0, 0.10, uv.y) * smoothstep(1.0, 0.62, uv.y);
        alpha *= edge;

        // fine film grain breaks up banding and adds a premium texture
        float g = (hash(uv*uRes + uTime) - 0.5) * 0.05;
        col += g;
        alpha += g * 0.4;

        gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
      }
    `,
  })

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  scene.add(quad)

  const target = new THREE.Vector2(0.5, 0.5)
  function onPointer(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    target.set((e.clientX - rect.left) / rect.width, 1.0 - (e.clientY - rect.top) / rect.height)
  }
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

  function resize() {
    const w = container.clientWidth
    const h = container.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    uniforms.uRes.value.set(w * pr, h * pr)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  const themeObs = new MutationObserver(() => {
    uniforms.uAccent.value = accent()
    uniforms.uCool.value = cool()
    uniforms.uIntensity.value = isDark() ? 0.42 : 0.18
  })
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  if (reduced) {
    renderer.render(scene, camera)
    cleanup = () => { ro.disconnect(); themeObs.disconnect(); material.dispose(); renderer.dispose() }
    return
  }

  let raf = 0, visible = true, last = performance.now()
  function frame(now: number) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    if (!visible) return
    uniforms.uTime.value += dt
    uniforms.uMouse.value.lerp(target, 0.06)
    uniforms.uMouseStr.value += (0.9 - uniforms.uMouseStr.value) * 0.04
    renderer.render(scene, camera)
  }
  const io = new IntersectionObserver((en) => (visible = en[0]?.isIntersecting ?? true))
  io.observe(container)
  const onVis = () => (visible = document.visibilityState === 'visible')
  document.addEventListener('visibilitychange', onVis)
  raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect(); io.disconnect(); themeObs.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    if (!reduced) window.removeEventListener('pointermove', onPointer)
    material.dispose(); renderer.dispose()
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>
.aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.aurora__canvas { width: 100%; height: 100%; display: block; }
</style>
