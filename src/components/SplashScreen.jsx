import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2400)
    const t2 = setTimeout(() => onDone(), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1A1F2E 0%, #07080D 70%)' }}
    >
      {/* 広がる波紋 */}
      <div className="absolute" style={{ top: '38%' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gold/20"
            style={{
              width: 200, height: 200,
              left: -100, top: -100,
              animation: `ripple 3s ease-out ${i * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ロゴ */}
      <img
        src="/waves-logo.png"
        alt="waves"
        className="w-[260px] relative z-10"
        style={{
          animation: 'logoReveal 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          filter: 'drop-shadow(0 8px 40px rgba(216,178,124,0.35))',
        }}
      />

      <style>{`
        @keyframes logoReveal {
          0%   { opacity: 0; transform: scale(0.88) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ripple {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
