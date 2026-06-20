export default function BottomNav({ current, onChange }) {
  return (
    <div className="flex border-t border-line bg-bg/90 backdrop-blur-md flex-shrink-0">
      <button
        onClick={() => onChange('home')}
        className={`flex-1 flex flex-col items-center gap-1.5 py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] text-[0.7rem] tracking-[0.15em] transition-colors ${
          current === 'home' ? 'text-gold' : 'text-inkFaint'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
        HOME
      </button>
      <button
        onClick={() => onChange('about')}
        className={`flex-1 flex flex-col items-center gap-1.5 py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] text-[0.7rem] tracking-[0.15em] transition-colors ${
          current === 'about' ? 'text-gold' : 'text-inkFaint'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5l3 2" />
        </svg>
        仕組み
      </button>
    </div>
  )
}
