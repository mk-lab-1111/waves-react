import BreathOrb from '../components/BreathOrb'

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const INTENSITY_MODES = [
  { key: 'soft',    label: 'SOFT',    desc: '気づかない程度' },
  { key: 'deep',    label: 'DEEP',    desc: 'はっきり感じる' },
  { key: 'deepest', label: 'DEEPEST', desc: '深い没入感' },
]

const TIMER_OPTIONS = [15, 30, 60, 90]

export default function PlayerPage({
  track, intensity, setIntensity,
  isPlaying, togglePlay,
  currentTime, duration,
  isPremium, loopMode, setLoopMode,
  sleepTimer, setTimer, timerRemaining,
  onBack, onBreathing, onUpsell,
}) {
  const remaining = duration ? duration - currentTime : 0

  return (
    <div className="flex-1 flex flex-col min-h-0"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1A1F2E 0%, #0A0C12 70%)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 flex-shrink-0">
        <button onClick={onBack}
          className="w-[38px] h-[38px] rounded-full bg-bgCard border border-line flex items-center justify-center text-inkSoft">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        {sleepTimer > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-goldLine">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D8B27C" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v5l3 2"/></svg>
            <span className="text-[0.7rem] text-gold tabular-nums">{formatTime(timerRemaining)}</span>
          </div>
        )}
        <div className="w-[38px]" />
      </div>

      {/* Scrollable body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 pt-6 pb-14 flex flex-col items-center text-center">

        {/* Title */}
        <p className="text-[0.7rem] tracking-[0.35em] text-gold mb-2.5">{track.band}</p>
        <p className="font-serif text-[1.6rem] font-semibold tracking-[0.12em] mb-1.5">{track.name}</p>
        <p className="text-[0.75rem] text-inkSoft">{track.free ? '無料体験 ・ 3分' : track.tag}</p>

        {/* Effect */}
        <p className="text-[0.65rem] tracking-[0.35em] text-inkFaint mt-10 mb-4">EFFECT</p>
        <p className="text-[0.8rem] text-gold leading-[1.95] tracking-[0.04em] max-w-[300px]">
          {track.description}
        </p>

        {/* Sound viz */}
        <p className="text-[0.65rem] tracking-[0.35em] text-inkFaint mt-10 mb-5">SOUND</p>
        <BreathOrb size={200} />
        <p className="font-serif text-[2.4rem] font-light tracking-[0.08em] tabular-nums mt-6 mb-6">
          {formatTime(remaining)}
        </p>

        {/* Intensity toggle */}
        <div className="flex gap-1 mb-4 p-1 rounded-full bg-bgCard border border-line">
          {INTENSITY_MODES.map(({ key, label }) => (
            <button key={key} onClick={() => setIntensity(key)}
              className={`px-4 py-2 rounded-full text-[0.7rem] tracking-[0.15em] font-medium transition-colors ${
                intensity === key ? 'bg-gold text-bg' : 'text-inkSoft'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-[0.7rem] text-inkFaint mb-6">
          {INTENSITY_MODES.find(m => m.key === intensity)?.desc}
        </p>

        {/* Meditate button */}
        <button onClick={togglePlay}
          className="flex items-center justify-center gap-2.5 w-[200px] py-4 rounded-full bg-gold text-bg font-serif text-[0.95rem] tracking-[0.15em] font-semibold shadow-[0_14px_36px_-10px_rgba(216,178,124,0.4)] mb-10">
          {isPlaying ? (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>Pause</>
          ) : (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>Meditate</>
          )}
        </button>

        {/* ===== プレミアム機能：ループ & タイマー ===== */}
        <p className="text-[0.65rem] tracking-[0.35em] text-inkFaint mb-4">
          PLAYBACK {!isPremium && '・ PREMIUM'}
        </p>

        {isPremium ? (
          <div className="w-full space-y-4 mb-10">
            {/* ループ */}
            <div className="bg-bgCard border border-line rounded-2xl p-4">
              <p className="text-[0.7rem] text-inkSoft tracking-[0.1em] mb-3 text-left">再生モード</p>
              <div className="flex gap-2">
                <button onClick={() => setLoopMode('once')}
                  className={`flex-1 py-2.5 rounded-xl text-[0.75rem] tracking-[0.1em] transition-colors ${
                    loopMode === 'once' ? 'bg-gold text-bg font-medium' : 'bg-bg text-inkSoft border border-line'
                  }`}>
                  1回のみ
                </button>
                <button onClick={() => setLoopMode('loop')}
                  className={`flex-1 py-2.5 rounded-xl text-[0.75rem] tracking-[0.1em] transition-colors ${
                    loopMode === 'loop' ? 'bg-gold text-bg font-medium' : 'bg-bg text-inkSoft border border-line'
                  }`}>
                  ∞ ループ
                </button>
              </div>
            </div>

            {/* スリープタイマー */}
            <div className="bg-bgCard border border-line rounded-2xl p-4">
              <p className="text-[0.7rem] text-inkSoft tracking-[0.1em] mb-3 text-left">スリープタイマー</p>
              <div className="flex gap-2">
                <button onClick={() => setTimer(0)}
                  className={`flex-1 py-2.5 rounded-xl text-[0.72rem] transition-colors ${
                    sleepTimer === 0 ? 'bg-gold text-bg font-medium' : 'bg-bg text-inkSoft border border-line'
                  }`}>
                  なし
                </button>
                {TIMER_OPTIONS.map((min) => (
                  <button key={min} onClick={() => setTimer(min)}
                    className={`flex-1 py-2.5 rounded-xl text-[0.72rem] transition-colors ${
                      sleepTimer === min ? 'bg-gold text-bg font-medium' : 'bg-bg text-inkSoft border border-line'
                    }`}>
                    {min}分
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button onClick={onUpsell}
            className="w-full bg-bgCard border border-goldLine rounded-2xl p-5 mb-10 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D8B27C" strokeWidth="1.5"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
            </div>
            <div className="text-left flex-1">
              <p className="text-[0.82rem] text-ink">ループ・タイマー</p>
              <p className="text-[0.7rem] text-inkSoft">プレミアムで長時間の瞑想・睡眠導入に</p>
            </div>
            <span className="text-gold text-[0.7rem] tracking-[0.1em]">解放 →</span>
          </button>
        )}

        {/* Breathing support */}
        <p className="text-[0.65rem] tracking-[0.35em] text-inkFaint mb-4">BREATHING</p>
        <div className="w-full bg-bgCard border border-line rounded-[22px] p-6 flex flex-col items-center mb-10">
          <p className="font-serif text-[1.05rem] font-semibold tracking-[0.1em] mb-1.5">呼吸法サポート</p>
          <p className="text-[0.75rem] text-inkSoft tracking-[0.05em] mb-5">3-6呼吸法 ・ 自律神経を整える</p>
          <div className="relative w-[84px] h-[84px] mb-5">
            <div className="absolute inset-0 rounded-full border border-gold/20" />
            <div className="absolute rounded-full animate-idlePulse"
              style={{ inset: 16, background: 'radial-gradient(circle, rgba(216,178,124,0.35) 0%, rgba(20,24,33,0.6) 75%)', animationDuration: '9s' }} />
          </div>
          <button onClick={onBreathing}
            className="w-full py-3.5 rounded-full border border-goldLine text-gold text-[0.8rem] tracking-[0.2em]">
            開始する
          </button>
        </div>

        {/* Silhouette */}
        <p className="text-[0.65rem] tracking-[0.35em] text-inkFaint mb-4">MEDITATION</p>
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(216,178,124,0.10) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 rounded-full border border-gold/[0.08]" />
          <div className="absolute rounded-full border border-gold/[0.08]" style={{ inset: 28 }} />
          <div className="relative w-[150px] h-[158px] rounded-lg"
            style={{
              backgroundImage: 'url(' + import.meta.env.BASE_URL + 'silhouette.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'grayscale(1) brightness(1.4)', opacity: 0.6, mixBlendMode: 'screen',
            }} />
        </div>
      </div>
    </div>
  )
}
