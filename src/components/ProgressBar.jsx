export default function ProgressBar({ value, size = 'md', showLabel = true }) {
  const clampedValue = Math.max(0, Math.min(100, value))

  const barColor =
    clampedValue >= 80 ? 'bg-green-500' :
    clampedValue >= 50 ? 'bg-yellow-500' :
    clampedValue > 0 ? 'bg-orange-500' :
    'bg-slate-600'

  const height = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-5' : 'h-3'

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-slate-700 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${barColor} ${height} rounded-full transition-all duration-500`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-slate-400 min-w-[3rem] text-right">
          {clampedValue}%
        </span>
      )}
    </div>
  )
}
