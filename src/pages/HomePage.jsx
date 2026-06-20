import { TRACKS, STORY_SERIES } from '../data/tracks'

export default function HomePage({ isPremium, onSelectTrack, onLockedTap }) {
  const freeTrack = TRACKS.find(t => t.free)
  const paidTracks = TRACKS.filter(t => !t.free)

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
      <div className="pt-12 pb-6 flex flex-col items-center text-center">
        <img src={import.meta.env.BASE_URL + "waves-mark.png"} alt="waves" className="w-[120px] mb-3"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(216,178,124,0.25))' }} />
        <p className="text-[0.62rem] tracking-[0.4em] text-gold/80 mb-5">BINAURAL BEAT MEDITATION</p>
        <p className="font-serif text-[1.5rem] font-semibold leading-[1.7] tracking-[0.1em]">
          今夜、どの<br />うねりを聴きますか。
        </p>
      </div>

      {/* プレミアム有効バッジ */}
      {isPremium && (
        <div className="flex items-center justify-center gap-2 mb-5 py-2 rounded-full bg-gold/10 border border-goldLine">
          <span className="text-[0.7rem] tracking-[0.15em] text-gold">✓ PREMIUM 有効中</span>
        </div>
      )}

      {/* 無料トラック */}
      <p className="text-[0.68rem] tracking-[0.3em] text-inkFaint mb-3 pl-1">FREE TRIAL</p>
      <div
        onClick={() => onSelectTrack(freeTrack)}
        className="flex flex-col gap-2.5 p-4 rounded-2xl bg-bgCard border border-goldLine mb-6 cursor-pointer transition-all active:scale-[0.985]"
      >
        <div className="flex items-center gap-4">
          <div className="w-[46px] h-[46px] rounded-full flex-shrink-0 shadow-[inset_0_0_14px_rgba(0,0,0,0.35)]"
            style={{ background: freeTrack.orb }} />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-[1rem] font-semibold tracking-[0.06em] mb-1">{freeTrack.name}</div>
            <div className="text-[0.72rem] text-inkSoft tracking-[0.08em]">{freeTrack.tag}</div>
          </div>
          <span className="text-[0.65rem] tracking-[0.15em] text-bg bg-gold px-2.5 py-1 rounded-full flex-shrink-0 font-medium whitespace-nowrap">
            無料・{freeTrack.duration}
          </span>
        </div>
        <p className="text-[0.78rem] text-gold/85 leading-[1.85] tracking-[0.04em] pl-0.5">
          {freeTrack.description}
        </p>
      </div>

      {/* 有料トラック */}
      <p className="text-[0.68rem] tracking-[0.3em] text-inkFaint mb-3 pl-1">NATURE SERIES</p>
      {paidTracks.map((track) => (
        <div
          key={track.id}
          onClick={() => isPremium ? onSelectTrack(track) : onLockedTap()}
          className={`flex flex-col gap-2.5 p-4 rounded-2xl bg-bgCard border mb-2.5 cursor-pointer transition-all active:scale-[0.985] ${
            isPremium ? 'border-line hover:border-goldLine' : 'border-line opacity-45'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-[46px] h-[46px] rounded-full flex-shrink-0 shadow-[inset_0_0_14px_rgba(0,0,0,0.35)]"
              style={{ background: track.orb }} />
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[1rem] font-semibold tracking-[0.06em] mb-1">{track.name}</div>
              <div className="text-[0.72rem] text-inkSoft tracking-[0.08em]">{track.tag}</div>
            </div>
            {!isPremium && (
              <svg className="text-inkFaint flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            )}
          </div>
          <p className="text-[0.78rem] text-gold/85 leading-[1.85] tracking-[0.04em] pl-0.5">
            {track.description}
          </p>
        </div>
      ))}

      {/* Story Series */}
      <p className="text-[0.68rem] tracking-[0.3em] text-inkFaint mt-7 mb-3 pl-1">STORY SERIES ・ 近日公開</p>
      {STORY_SERIES.slice(0, 2).map((s) => (
        <div key={s.id} onClick={onLockedTap}
          className="flex items-center gap-4 p-4 rounded-2xl bg-bgCard border border-line mb-2.5 opacity-25 cursor-pointer">
          <div className="w-[46px] h-[46px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2A2E38, #1A1D24)' }} />
          <div className="flex-1">
            <div className="font-serif text-[1rem] font-semibold tracking-[0.06em]">{s.name}</div>
            <div className="text-[0.72rem] text-inkSoft">Coming soon</div>
          </div>
          <svg className="text-inkFaint flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      ))}

      {/* Premium banner */}
      {!isPremium && (
        <div className="mt-6 text-center p-6 rounded-[20px] border border-goldLine bg-goldSoft">
          <p className="font-serif text-[1rem] mb-2 tracking-[0.06em]">すべてのうねりを、解き放つ</p>
          <p className="text-[0.75rem] text-inkSoft mb-4 leading-[1.8]">
            5つの周波数すべてと、<br />ループ・タイマー機能が使えます。
          </p>
          <button onClick={onLockedTap} className="inline-block bg-gold text-bg text-[0.78rem] tracking-[0.15em] px-8 py-3 rounded-full font-medium">
            プレミアムにする
          </button>
        </div>
      )}
    </div>
  )
}
