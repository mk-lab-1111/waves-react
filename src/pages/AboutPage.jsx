import { FREQ_GUIDE } from '../data/tracks'

export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-14 pb-8">
      <img src="/waves-mark.png" alt="waves" className="w-[90px] mb-6 opacity-90"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(216,178,124,0.2))' }} />
      <p className="font-serif text-[1.5rem] font-semibold leading-[1.8] tracking-[0.1em] mb-4">
        バイノーラルビート × メディテーション<br />二つの音が生む、静かなうねり
      </p>
      <p className="text-[0.85rem] text-inkSoft leading-[2] mb-8">
        「バイノーラルビート」とは、右耳と左耳に<br />
        わずかに異なる周波数の音を届けることで生まれる<br />
        音のうねりのこと。脳はその差を一つの<br />
        "うねり"として感じ取ります。<br /><br />
        wavesは、このバイノーラルビートとメディテーション音楽を<br />
        組み合わせ、目的に応じてうねりを設計しています。
      </p>

      <p className="text-[0.68rem] tracking-[0.3em] text-inkFaint mb-3">周波数帯ガイド</p>

      {FREQ_GUIDE.map((f) => (
        <div key={f.name} className="flex items-center gap-4 bg-bgCard border border-line rounded-2xl px-5 py-4.5 mb-2.5">
          <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: f.orb }} />
          <div>
            <p className="text-[0.65rem] tracking-[0.2em] text-gold mb-0.5">{f.hz}</p>
            <p className="font-serif text-[0.95rem] font-semibold tracking-[0.05em] mb-1">{f.name}</p>
            <p className="text-[0.75rem] text-inkSoft leading-[1.7]">{f.desc}</p>
          </div>
        </div>
      ))}

      <p className="mt-6 text-[0.72rem] text-inkSoft leading-[2.1] border-t border-line pt-5">
        ※ wavesの音源は、脳波そのものを測定・操作するものではなく、聴覚刺激によるリラクゼーション体験を目的として設計されています。効果の感じ方には個人差があります。<br /><br />
        🎧 効果を感じるには、ヘッドホン・イヤホンの使用を推奨します。
      </p>
    </div>
  )
}
