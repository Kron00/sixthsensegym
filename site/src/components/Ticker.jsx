
export default function Ticker() {
  const text = 'PANATTA ✦ ARSENAL STRENGTH ✦ GHOST ✦ ROGUE ✦ KABUKI ✦ KEISER ✦ 24/7 ACCESS ✦ PRIVATE MEMBERSHIP ✦ ';
  const repeated = Array(8).fill(text).join('');

  return (
    <div className="w-full bg-[var(--black)] py-4 overflow-hidden">
      {/* Top gold line */}
      <div className="h-[1px] bg-[var(--gold)]/20 mb-4" />

      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-[0.15em] text-[var(--gold)]/60">
            {repeated.split('✦').map((segment, i, arr) => (
              <span key={i}>
                {segment}
                {i < arr.length - 1 && (
                  <span className="text-[var(--gold)]/30">✦</span>
                )}
              </span>
            ))}
          </span>
        </div>
        <div className="animate-marquee flex shrink-0">
          <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-[0.15em] text-[var(--gold)]/60">
            {repeated.split('✦').map((segment, i, arr) => (
              <span key={i}>
                {segment}
                {i < arr.length - 1 && (
                  <span className="text-[var(--gold)]/30">✦</span>
                )}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-[1px] bg-[var(--gold)]/20 mt-4" />
    </div>
  );
}
