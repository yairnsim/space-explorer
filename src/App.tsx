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
  missions={gameData.missions}
  shipsOwned={
    JSON.parse(
      localStorage.getItem("ownedShips") ||
      '["explorer"]'
    ).length
  }
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
            className="settingsBtn"
            onClick={() => {
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
  🏠 בית
</button>

<button
  className={
    screen === "garage"
      ? "activeNav"
      : ""
  }
  onClick={() => setScreen("garage")}
>
  🛸 מוסך
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
  🏆 הישגים
</button>

<button
  className={
    screen === "settings"
      ? "activeNav"
      : ""
  }
  onClick={() => setScreen("settings")}
>
  ⚙️ הגדרות
</button>
      </div>
    </div>
  </div>
);
}
