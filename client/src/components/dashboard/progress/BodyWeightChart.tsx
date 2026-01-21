export default function BodyWeightChart() {
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Body Weight
          </h3>
          <p className="text-2xl font-black text-text-main">
            74.2 <span className="text-sm font-normal text-text-muted">kg</span>
          </p>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
          -1.5kg this month
        </span>
      </div>

      <div className="relative h-32 w-full flex items-end justify-between px-2">
        {/* Simplified SVG Path for demo */}
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <path
            d="M 0 80 Q 25 75, 50 60 T 100 40 V 100 H 0 Z"
            fill="url(#grad1)"
          />
          <path
            d="M 0 80 Q 25 75, 50 60 T 100 40"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* X-Axis Labels */}
        <div className="z-10 text-[10px] text-text-muted font-bold">W1</div>
        <div className="z-10 text-[10px] text-text-muted font-bold">W2</div>
        <div className="z-10 text-[10px] text-text-muted font-bold">W3</div>
        <div className="z-10 text-[10px] text-text-muted font-bold">W4</div>
      </div>
    </section>
  );
}
