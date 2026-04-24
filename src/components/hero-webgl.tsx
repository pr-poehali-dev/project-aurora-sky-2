import { useRef, useState, useEffect } from "react"

const PARTICLE_COUNT = 120

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8", "#ffffff"]

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Фон
      const bg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      bg.addColorStop(0, "rgba(10, 20, 50, 1)")
      bg.addColorStop(1, "rgba(0, 0, 0, 1)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Свечение под мышью
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 300)
      glow.addColorStop(0, "rgba(59,130,246,0.08)")
      glow.addColorStop(1, "transparent")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const pts = particles.current

      // Линии между частицами
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(96,165,250,${0.15 * (1 - dist / 130)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Частицы
      for (const p of pts) {
        // Притяжение к мыши
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += (dx / dist) * 0.015
          p.vy += (dy / dist) * 0.015
        }

        // Ограничение скорости
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
      <HeroCanvas />

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
