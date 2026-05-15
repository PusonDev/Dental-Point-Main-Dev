export default function DentalAnimation() {
  const elements = ["🦷", "🪥", "✨", "🦷", "💫", "🦷", "✨", "🪥"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <span
          key={i}
          className="absolute text-white animate-float opacity-[0.12]"
          style={{
            left: `${10 + i * 11}%`,
            fontSize: `${20 + (i % 3) * 15}px`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${15 + i * 2}s`,
          }}
        >
          {el}
        </span>
      ))}
    </div>
  );
}
