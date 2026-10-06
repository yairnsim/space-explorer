export default function Garage() {
  function buy(ship: string, cost: number) {
    const coins = Number(localStorage.getItem("coins") || 0);
    if (coins < cost) {
      alert("אין מספיק מטבעות");
      return;
    }
    localStorage.setItem("coins", String(coins - cost));
    localStorage.setItem("ship", ship);
    location.reload();
  }
  return (
    <div className="card">
      <h3>🚀 מוסך חלליות</h3>
      <button onClick={() => buy("🚀", 0)}>🚀 בסיסית</button>
      <button onClick={() => buy("🛸", 100)}>🛸 כחולה (100)</button>
      <button onClick={() => buy("⭐", 250)}>⭐ זהובה (250)</button>
    </div>
  );
}
