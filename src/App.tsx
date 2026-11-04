import { useState } from "react";
import Achievements from "./components/Achievements";
import Header from "./components/Header";
import MissionCard from "./components/MissionCard";
import PlanetMap from "./components/PlanetMap";
import Garage from "./components/Garage";
import TreasureBox from "./components/TreasureBox";
import "./styles/app.css";

export type GameData = {
  xp:number;
  coins:number;
  missions:number;
  streak:number;
  treasureReady:boolean;
  treasureOpened:boolean;
};

export default function App(){
 const [gameData,setGameData]=useState<GameData>({
  xp:Number(localStorage.getItem("xp")||0),
  coins:Number(localStorage.getItem("coins")||0),
  missions:Number(localStorage.getItem("missions")||0),
  streak:Number(localStorage.getItem("streak")||0),
  treasureReady:localStorage.getItem("treasureReady")==="true",
  treasureOpened:localStorage.getItem("treasureOpened")==="true"
 });
 const [selectedShip, setSelectedShip] = useState(
  localStorage.getItem("selectedShip") || "explorer"
  );
 const [screen, setScreen] = useState("home");
 const SHIP_COSTS: Record<string, number> = {
  explorer: 0,
  falcon: 100,
  titan: 250,
  lightning: 500,
  orbiter: 1000,
  "lunar-x": 1500,
  "mars-runner": 2500,
  nova: 5000,
  "galaxy-rider": 10000,
  "cosmic-king": 25000,
};

const ownedShips = JSON.parse(
  localStorage.getItem("ownedShips") ||
    '["explorer"]'
);

const validOwnedShips = ownedShips.filter(
  (id: string) =>
    Object.keys(SHIP_COSTS).includes(id)
);

const spentOnShips = validOwnedShips.reduce(
  (sum: number, shipId: string) =>
    sum + SHIP_COSTS[shipId],
  0
);

const lifetimeCoins =
  gameData.coins + spentOnShips;
return (
  <div className="app" dir="rtl">
    <div className="container">
      <Header
        xp={gameData.xp}
        coins={gameData.coins}
        streak={gameData.streak}
        selectedShip={selectedShip}
      />

      {screen === "home" && (
        <>
          <MissionCard
            gameData={gameData}
            setGameData={setGameData}
          />

          <PlanetMap />

          <TreasureBox
            gameData={gameData}
            setGameData={setGameData}
          />
        </>
      )}

      {screen === "garage" && (
        <Garage
          selectedShip={selectedShip}
          setSelectedShip={setSelectedShip}
/>
      )}

      {screen === "achievements" && (
<Achievements
  streak={gameData.streak}
  shipsOwned={validOwnedShips.length}
  lifetimeCoins={lifetimeCoins}
/>
      )}

      {screen === "settings" && (
        <div className="card">
          <h2>⚙️ הגדרות</h2>

          <p>גרסה 0.6</p>

<div
  dir="ltr"
  style={{
    opacity: 0.8,
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center",
  }}
>
<div>Developed by Yaya 🚀</div>
<div>Yaya 2026</div>

</div>
          <button
  className="startBtn"
  onClick={() => {
const saveData = { ...localStorage };

    navigator.clipboard.writeText(
      JSON.stringify(saveData)
    );

    alert("קוד השמירה הועתק ללוח");
  }}
>
  📤 ייצא שמירה
</button>

<button
  className="pauseBtn"
  onClick={() => {
    const pin = prompt(
      "הכנס קוד מפתח"
    );

    if (pin !== "2026") {
      alert("קוד שגוי");
      return;
    }

    const saveCode = prompt(
      "הדבק כאן את קוד השמירה"
    );

    if (!saveCode) return;

    try {
      const saveData = JSON.parse(saveCode);

      Object.entries(saveData).forEach(
        ([key, value]) => {
          localStorage.setItem(
            key,
            String(value)
          );
        }
      );

      alert("השמירה שוחזרה בהצלחה");

      location.reload();
    } catch {
      alert("קוד שמירה לא תקין");
    }
  }}
>
  📥 ייבא שמירה
</button>

          <button
            className="settingsBtn"
            onClick={() => {
                const pin = prompt(
  "הכנס קוד מפתח"
);

if (pin !== "2026") {
  alert("קוד שגוי");
  return;
}
              if (
                confirm(
                  "למחוק את כל ההתקדמות?"
                )
              ) {
                localStorage.clear();
                location.reload();
              }
            }}
          >
            🗑️ איפוס כל ההתקדמות
          </button>
        </div>
      )}

      <div className="bottomNav">
<button
  className={
    screen === "home"
      ? "activeNav"
      : ""
  }
  onClick={() => setScreen("home")}
>
  <div>🏠</div>
  <div>בית</div>
</button>

<button
  className={
    screen === "garage"
      ? "activeNav"
      : ""
  }
  onClick={() => setScreen("garage")}
>
  <div>🛸</div>
  <div>מוסך</div>
</button>

<button
  className={
    screen === "achievements"
      ? "activeNav"
      : ""
  }
  onClick={() =>
    setScreen("achievements")
  }
>
  <div>🏆</div>
  <div>הישגים</div>
</button>

<button
  className={
    screen === "settings"
      ? "activeNav"
      : ""
  }
  onClick={() =>
    setScreen("settings")
  }
>
  <div>⚙️</div>
  <div>הגדרות</div>
</button>
      </div>
    </div>
  </div>
);
}
