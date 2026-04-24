import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" }
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" }

extend(THREE as unknown as Record<string, unknown>)

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;

        // Depth-based displacement
        float depth = texture2D(uDepthMap, uv).r;
        vec2 displacement = depth * uPointer * 0.01;
        vec2 distortedUv = uv + displacement;

        // Base texture
        vec4 baseColor = texture2D(uTexture, distortedUv);

        // Create scanning effect
        float aspect = ${WIDTH}.0 / ${HEIGHT}.0;
        vec2 tUv = vec2(uv.x * aspect, uv.y);
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;

        float brightness = noise(tUv * tiling * 0.5);
        float dist = length(tiledUv);
        float dot = smoothstep(0.5, 0.49, dist) * brightness;

        // Flow effect based on progress
        float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));

        // Blue scanning overlay
        vec3 mask = vec3(0.0, 0.3, dot * flow * 10.0);

        // Combine effects
        vec3 final = baseColor.rgb + mask;

        gl_FragColor = vec4(final, 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [rawMap, depthMap])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
      material.uniforms.uPointer.value = pointer
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const scaleFactor = 0.3
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const titleWords = "PANDA VAPE".split(" ")
  const subtitle = "Электронные сигареты нового уровня."
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07))
    setSubtitleDelay(Math.random() * 0.1)
  }, [titleWords.length])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleWords, titleWords.length])

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Панда на весь фон */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/30cfddc5-5f5b-471d-ac78-f3b4cdcb7dd8/bucket/6521f578-3ede-42a9-9b75-5359b2546230.jpg"
          alt="Panda Vape"
          className="w-full h-full object-cover opacity-50 scale-110"
          style={{ objectPosition: "center 20%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Синее свечение в центре */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Контент */}
      <div className="h-screen w-full absolute z-[60] px-6 flex flex-col items-center justify-end pb-24 md:pb-32">

        {/* Бейдж */}
        <div className={subtitleVisible ? "fade-in mb-6" : "opacity-0 mb-6"}>
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Более 30 вкусов · Доставка по России
          </span>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-4">
          <div className="text-5xl md:text-7xl xl:text-8xl font-extrabold font-orbitron uppercase">
            <div className="flex space-x-3 lg:space-x-6 justify-center overflow-hidden">
              {titleWords.map((word, index) => (
                <div
                  key={index}
                  className={index < visibleWords ? "fade-in" : ""}
                  style={{
                    animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                    opacity: index < visibleWords ? undefined : 0,
                    color: index === 0 ? "white" : "#60a5fa",
                    textShadow: index === 1 ? "0 0 40px rgba(59,130,246,0.7)" : "0 0 30px rgba(255,255,255,0.2)",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Подзаголовок */}
        <div className="text-base md:text-xl text-gray-300 mb-10 text-center max-w-lg">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : ""}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Кнопки */}
        <div
          className={subtitleVisible ? "fade-in flex flex-col sm:flex-row gap-4" : "opacity-0 flex flex-col sm:flex-row gap-4"}
          style={{ animationDelay: `${titleWords.length * 0.13 + 0.6}s` }}
        >
          <a
            href="#flavors"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold font-orbitron uppercase text-sm rounded-lg transition-all duration-200 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] pointer-events-auto"
          >
            Смотреть каталог
          </a>
          <a
            href="#faq"
            className="px-8 py-3 border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-white font-bold font-orbitron uppercase text-sm rounded-lg transition-all duration-200 backdrop-blur-sm pointer-events-auto"
          >
            Узнать больше
          </a>
        </div>

        {/* Статистика */}
        <div
          className={subtitleVisible ? "fade-in flex gap-8 mt-12 text-center" : "opacity-0 flex gap-8 mt-12 text-center"}
          style={{ animationDelay: `${titleWords.length * 0.13 + 0.9}s` }}
        >
          {[
            { value: "30+", label: "вкусов" },
            { value: "6000", label: "затяжек" },
            { value: "1 день", label: "доставка" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold text-white font-orbitron">{stat.value}</span>
              <span className="text-xs text-blue-400 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero3DWebGL