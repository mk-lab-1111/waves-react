import { useState, useRef, useEffect } from 'react'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'
import BreathingPage from './pages/BreathingPage'
import AboutPage from './pages/AboutPage'
import BottomNav from './components/BottomNav'
import SplashScreen from './components/SplashScreen'
import { TRACKS } from './data/tracks'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [screen, setScreen]       = useState('home')
  const [track, setTrack]         = useState(TRACKS[0])
  const [intensity, setIntensity] = useState('soft')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]   = useState(0)

  // プレミアム関連
  const [isPremium, setIsPremium] = useState(false)
  const [loopMode, setLoopMode]   = useState('once')   // 'once' | 'loop'
  const [sleepTimer, setSleepTimer] = useState(0)      // 分。0=なし
  const [timerRemaining, setTimerRemaining] = useState(0) // 秒

  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime   = () => setCurrentTime(audio.currentTime)
    const onLoaded = () => {
     if (!isFinite(audio.duration)) {
       audio.currentTime = 1e101
       audio.addEventListener('timeupdate', function fix() {
         audio.removeEventListener('timeupdate', fix)
         audio.currentTime = 0
         setDuration(audio.duration)
       })
     } else {
       setDuration(audio.duration)
     }
   }
    const onEnded  = () => {
      if (loopMode === 'loop') {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('durationchange', onLoaded)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('durationchange', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [loopMode])

  // intensity切替：再生位置維持
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.audio) return
    const wasPlaying = !audio.paused
    const t = audio.currentTime || 0
    audio.src = track.audio[intensity]
    audio.load()
    audio.currentTime = t
    if (wasPlaying) audio.play().catch(() => {})
  }, [intensity]) // eslint-disable-line

  // スリープタイマー
  useEffect(() => {
    if (!isPlaying || sleepTimer === 0) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimerRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current)
          fadeOutAndStop()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isPlaying, sleepTimer]) // eslint-disable-line

  function fadeOutAndStop() {
    const audio = audioRef.current
    if (!audio) return
    // 8秒かけてフェードアウト
    const startVol = audio.volume
    let step = 0
    const steps = 40
    const fade = setInterval(() => {
      step++
      audio.volume = Math.max(0, startVol * (1 - step / steps))
      if (step >= steps) {
        clearInterval(fade)
        audio.pause()
        audio.currentTime = 0
        audio.volume = startVol
        setIsPlaying(false)
        setSleepTimer(0)
      }
    }, 200)
  }

  function selectTrack(t) {
    const audio = audioRef.current
    setTrack(t)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setSleepTimer(0)
    setTimerRemaining(0)
    setScreen('player')
    setTimeout(() => {
      if (audio && t.audio) {
        audio.src = t.audio[intensity]
        audio.load()
      }
    }, 0)
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  function setTimer(minutes) {
    setSleepTimer(minutes)
    setTimerRemaining(minutes * 60)
  }

  function lockedTap() {
    setScreen('premium')
  }

  function unlockPremium() {
    setIsPremium(true)
    setScreen('home')
  }

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} />
  }

  return (
    <div className="max-w-[420px] mx-auto h-screen flex flex-col bg-bg overflow-hidden">
      <audio ref={audioRef} preload="metadata" />

      {screen === 'home' && (
        <>
          <HomePage
            isPremium={isPremium}
            onSelectTrack={selectTrack}
            onLockedTap={lockedTap}
          />
          <BottomNav current="home" onChange={setScreen} />
        </>
      )}

      {screen === 'player' && (
        <PlayerPage
          track={track}
          intensity={intensity}
          setIntensity={setIntensity}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          currentTime={currentTime}
          duration={duration}
          isPremium={isPremium}
          loopMode={loopMode}
          setLoopMode={setLoopMode}
          sleepTimer={sleepTimer}
          setTimer={setTimer}
          timerRemaining={timerRemaining}
          onBack={() => { setScreen('home') }}
          onBreathing={() => setScreen('breathing')}
          onUpsell={() => setScreen('premium')}
        />
      )}

      {screen === 'breathing' && (
        <BreathingPage onExit={() => setScreen('player')} />
      )}

      {screen === 'about' && (
        <>
          <AboutPage />
          <BottomNav current="about" onChange={setScreen} />
        </>
      )}

      {screen === 'premium' && (
        <PremiumScreen
          isPremium={isPremium}
          onUnlock={unlockPremium}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}

// ===== プレミアム案内画面 =====
function PremiumScreen({ isPremium, onUnlock, onBack }) {
  return (
    <div className="flex-1 flex flex-col min-h-0"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1A1F2E 0%, #07080D 70%)' }}>
      <div className="flex items-center px-5 pt-14 flex-shrink-0">
        <button onClick={onBack}
          className="w-[38px] h-[38px] rounded-full bg-bgCard border border-line flex items-center justify-center text-inkSoft">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-7 flex flex-col items-center text-center justify-center">
        <img src={import.meta.env.BASE_URL + "waves-mark.png"} alt="waves" className="w-[120px] mb-8"
          style={{ filter: 'drop-shadow(0 6px 28px rgba(216,178,124,0.35))' }} />

        <p className="font-serif text-[1.7rem] font-semibold tracking-[0.1em] mb-3">
          waves Premium
        </p>
        <p className="text-[0.85rem] text-inkSoft leading-[2] mb-9">
          すべてのうねりを、心ゆくまで。
        </p>

        <div className="w-full space-y-3.5 mb-10">
          {[
            ['5つの周波数すべて', 'デルタ〜ガンマ波・全曲解放'],
            ['ループ再生', '長時間の瞑想・睡眠導入に'],
            ['スリープタイマー', '15・30・60・90分で自動停止'],
            ['Story Series', '今後追加される物語シリーズ'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 text-left">
              <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D8B27C" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <div>
                <p className="text-[0.9rem] text-ink">{t}</p>
                <p className="text-[0.72rem] text-inkSoft">{d}</p>
              </div>
            </div>
          ))}
        </div>

        {isPremium ? (
          <p className="text-gold text-[0.9rem] tracking-[0.1em] mb-10">✓ プレミアム有効中</p>
        ) : (
          <>
            <button onClick={onUnlock}
              className="w-full py-4 rounded-full bg-gold text-bg font-serif text-[1rem] tracking-[0.12em] font-semibold shadow-[0_14px_36px_-10px_rgba(216,178,124,0.5)] mb-3">
              プレミアムを試す（テスト解放）
            </button>
            <p className="text-[0.68rem] text-inkFaint mb-10">
              ※ 課金システムは近日実装予定です
            </p>
          </>
        )}
      </div>
    </div>
  )
}
