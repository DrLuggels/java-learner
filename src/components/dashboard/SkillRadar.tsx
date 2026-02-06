interface SkillRadarProps {
  scores: { label: string; value: number; color: string }[];
  size?: number;
}

export default function SkillRadar({ scores, size = 250 }: SkillRadarProps) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const n = scores.length;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLevels.map(level => {
          const points = Array.from({ length: n }, (_, i) => {
            const p = getPoint(i, level);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="var(--color-dark-600)"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="var(--color-dark-600)"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        <polygon
          points={scores.map((s, i) => {
            const p = getPoint(i, s.value);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="rgba(88, 166, 255, 0.15)"
          stroke="var(--color-accent-blue)"
          strokeWidth="2"
        />

        {scores.map((s, i) => {
          const p = getPoint(i, s.value);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--color-accent-blue)"
              stroke="var(--color-dark-800)"
              strokeWidth="2"
            />
          );
        })}

        {scores.map((s, i) => {
          const p = getPoint(i, 115);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-dark-400"
              fontSize="11"
            >
              {s.label}
            </text>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        {scores.map(s => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-dark-400">{s.label}: <span className="text-dark-200 font-medium">{s.value}%</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
