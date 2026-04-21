export default function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <span>9:41</span>
      <span className="sb-right">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
        </svg>
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M1 4a10 10 0 0113 0" />
          <path d="M3 6.5a7 7 0 019 0" />
          <path d="M5 9a4 4 0 015 0" />
        </svg>
        <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="10"
            rx="2.5"
            stroke="currentColor"
            opacity="0.5"
          />
          <rect x="2" y="2" width="18" height="7" rx="1.3" fill="currentColor" />
          <rect
            x="22.5"
            y="3.5"
            width="1.5"
            height="4"
            rx="0.5"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </span>
    </div>
  );
}
