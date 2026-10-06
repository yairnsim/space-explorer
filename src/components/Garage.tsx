const SHIPS = [
  { id: "explorer", icon: "🚀", name: "Explorer", cost: 0 },
  { id: "falcon", icon: "🛸", name: "Falcon", cost: 100 },
  { id: "titan", icon: "🚀⚪", name: "Titan", cost: 250 },
  { id: "royal", icon: "🚀👑", name: "Royal One", cost: 500 },
];

export default function Garage() {
  const coins = Number(localStorage.getItem("coins") || 0);

  const ownedShips = JSON.parse(
    localStorage.getItem("ownedShips") || '["explorer"]'
  );

  const activeShip =
    localStorage.getItem("selectedShip") || "explorer";

  function buyOrSelect(ship: (typeof SHIPS)[0]) {
    if (ownedShips.includes(ship.id)) {
      localStorage.setItem("selectedShip", ship.id);
      localStorage.setItem("ship", ship.icon);
      location.reload();
      return;
    }

    if (coins < ship.cost) {
      alert("אין מספיק מטבעות");
      return;
    }

    const updatedShips = [...ownedShips, ship.id];

    localStorage.setItem(
      "ownedShips",
      JSON.stringify(updatedShips)
    );

    localStorage.setItem(
      "coins",
      String(coins - ship.cost)
    );

    localStorage.setItem("selectedShip", ship.id);
    localStorage.setItem("ship", ship.icon);

    alert(`🎉 רכשת את ${ship.name}`);

    location.reload();
  }

  return (
    <div className="card">
      <h3>🚀 מוסך החלליות</h3>

      {SHIPS.map((ship) => (
        <div
          key={ship.id}
          className="garageItem"
        >
          <div>
            {ship.icon} {ship.name}
          </div>

          {ownedShips.includes(ship.id) ? (
            <button
              onClick={() => buyOrSelect(ship)}
            >
              {activeShip === ship.id
                ? "✅ פעילה"
                : "בחר"}
            </button>
          ) : (
            <button
              onClick={() => buyOrSelect(ship)}
            >
              🪙 {ship.cost}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
