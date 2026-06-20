export default function BreathOrb({ size = 200, gradient, idle = true }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border border-gold/15" />
      <div className="absolute rounded-full border border-gold/15" style={{ inset: size * 0.11 }} />
      <div
        className={`absolute rounded-full ${idle ? 'animate-idlePulse' : ''}`}
        style={{
          inset: size * 0.22,
          background: gradient || 'radial-gradient(circle, rgba(216,178,124,0.35) 0%, rgba(20,24,33,0.6) 75%)',
          boxShadow: '0 0 50px rgba(216,178,124,0.12)',
        }}
      />
    </div>
  )
}
