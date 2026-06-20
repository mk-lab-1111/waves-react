import { useState, useEffect, useRef } from 'react'

export default function BreathingPage({ onExit }) {
  const [phase, setPhase] = useState('inhale') // 'inhale' | 'exhale'
  const [remaining, setRemaining] = useState(300)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    function inhale() {
      setPhase('inhale')
      timeoutRef.current = setTimeout(exhale, 3000)
    }
    function exhale() {
      setPhase('exhale')
      timeoutRef.current = setTimeout(inhale, 6000)
    }
    inhale()

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current)
          onExit()
          return 0
        }
        return r - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const expanded = phase === 'inhale'
  const m = Math.floor(remaining / 60)
  const s = remaining % 60

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ background: '#07080D' }}>
      <div className="flex items-center justify-between px-5 pt-14 flex-shrink-0">
        <button onClick={onExit} className="w-[38px] h-[38px] rounded-full bg-bgCard border border-line flex items-center justify-center text-inkSoft">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <p className="text-[0.7rem] tracking-[0.3em] text-inkFaint">🎵 再生中</p>
        <div className="w-[38px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <p className="text-[0.75rem] text-inkSoft tracking-[0.15em] mb-2">3-6 呼吸法 ・ 自律神経を整える</p>

        <div className="relative w-[240px] h-[240px] mb-12">
          <div
            className="absolute inset-0 rounded-full border border-gold/[0.18]"
            style={{
              transform: expanded ? 'scale(1.04)' : 'scale(1)',
              transition: expanded ? 'transform 3s ease' : 'transform 6s ease',
            }}
          />
          <div
            className="absolute rounded-full border border-gold/[0.12]"
            style={{
              inset: 20,
              transform: expanded ? 'scale(1.04)' : 'scale(1)',
              transition: expanded ? 'transform 3s ease' : 'transform 6s ease',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: 50,
              background: 'radial-gradient(circle, rgba(216,178,124,0.5) 0%, rgba(20,24,33,0.5) 75%)',
              boxShadow: '0 0 60px rgba(216,178,124,0.18)',
              transform: expanded ? 'scale(1.15)' : 'scale(0.85)',
              transition: expanded ? 'transform 3s cubic-bezier(0.45,0,0.55,1)' : 'transform 6s cubic-bezier(0.45,0,0.55,1)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-serif text-[1.3rem] font-medium tracking-[0.3em]">
            {expanded ? '吸って' : 'はいて'}
          </div>
        </div>

        <p className="font-serif text-[2rem] tracking-[0.1em] text-inkSoft tabular-nums mb-10">
          {m}:{String(s).padStart(2, '0')}
        </p>

        <button onClick={onExit} className="px-10 py-3.5 rounded-full border border-line text-inkSoft text-[0.78rem] tracking-[0.2em]">
          終了する
        </button>
      </div>
    </div>
  )
}
