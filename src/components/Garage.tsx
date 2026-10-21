const SHIPS = [
  { id: "explorer",     image: "/ships/01_Explorer.png",     name:  "Explorer",     cost: 0 },
  { id: "falcon",       image: "/ships/02_Falcon.png",       name:  "Falcon",       cost: 100 },
  { id: "titan",        image: "/ships/03_Titan.png",        name:  "Titan",        cost: 250 },
  { id: "lightning",    image: "/ships/04_Lightning.png",    name: "Lightning",     cost: 500 },
  { id: "orbiter",      image: "/ships/05_Orbiter.png",      name:  "Orbiter",      cost: 1000 },
  { id: "lunar-X",      image: "/ships/06_Lunar_X.png",      name:  "Lunar_X",      cost: 1500 },
  { id: "mars-runner",  image: "/ships/07_Mars_Runner.png",  name:  "Mars_Runner",  cost: 2500 },
  { id: "nova",         image: "/ships/08_Nova.png",         name:  "Nova",         cost: 5000 },
  { id: "galaxy-rider", image: "/ships/09_Galaxy_Rider.png", name:  "Galaxy_Rider", cost: 10000 },
  { id: "cosmic-king",  image: "/ships/10_Cosmic_King.png",  name:  "Cosmic_King",  cost: 25000 },
];

export default function Garage({
  selectedShip,
  setSelectedShip,
}: {
  selectedShip: string;
  setSelectedShip: (ship: string) => void;
}) {
  const coins = Number(localStorage.getItem("coins") || 0);

  const ownedShips = JSON.parse(
    localStorage.getItem("ownedShips") || '["explorer"]'
  );

  const activeShip =
    localStorage.getItem("selectedShip") || "explorer";

  function buyOrSelect(ship: (typeof SHIPS)[0]) {
    if (ownedShips.includes(ship.id)) {
      localStorage.setItem("selectedShip", ship.id);
      localStorage.setItem("ship", ship.name);
      setSelectedShip(ship.id);
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
    localStorage.setItem("ship", ship.name);
    setSelectedShip(ship.id);

    alert(`🎉 רכשת את ${ship.name}`);

  }

  return (
    <div className="card">
      <h3>🚀 מוסך החלליות</h3>

      <div className="garageScroller">

      {SHIPS.map((ship) => (
        <div
          key={ship.id}
          className="garageItem"
        >

          <img
            src={ship.image}
            alt={ship.name}
            className="shipImage"
          />

{ownedShips.includes(ship.id) ? (
  <button
    className={
      activeShip === ship.id
        ? "garageBtn active"
        : "garageBtn select"
    }
    onClick={() => buyOrSelect(ship)}
  >
    {activeShip === ship.id
      ? "✅ פעילה"
      : "בחר"}
  </button>
) : (
  <button
    className={
      coins >= ship.cost
        ? "garageBtn buy"
        : "garageBtn locked"
    }
    onClick={() => buyOrSelect(ship)}
  >
    {coins >= ship.cost
      ? "🪙 " + ship.cost
      : "🔒 " + ship.cost}
  </button>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

