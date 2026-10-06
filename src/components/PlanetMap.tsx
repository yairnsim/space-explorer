export default function PlanetMap() {
  const m = Number(localStorage.getItem("missions") || 0);
  const p = ["🌍 Earth", "🔴 Mars", "🟠 Jupiter", "🪐 Saturn", "✨ Galaxy X"];
  return (
    <div className="card">
      <h3>🪐 מסע הכוכבים</h3>
      {p.map((x, i) => (
        <div key={i}>
          {m >= i * 5 ? "✅" : "🔒"} {x}
        </div>
      ))}
    </div>
  );
}
