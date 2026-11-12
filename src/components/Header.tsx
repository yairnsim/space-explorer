type HeaderProps = {
  xp: number;
  coins: number;
  streak: number;
  selectedShip: string;
};

function getLevel(xp: number) {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  if (xp < 2000) return 5;
  if (xp < 4000) return 6;
  if (xp < 8000) return 7;
  if (xp < 16000) return 8;
  if (xp < 32000) return 9;

  return 10;
}

function getNextLevelXp(xp: number) {
  if (xp < 100) return 100;
  if (xp < 250) return 250;
  if (xp < 500) return 500;
  if (xp < 1000) return 1000;
  if (xp < 2000) return 2000;
  if (xp < 4000) return 4000;
  if (xp < 8000) return 8000;
  if (xp < 16000) return 16000;
  if (xp < 32000) return 32000;

  return 50000;
}


export default function Header({
  xp,
  coins,
  streak,
  selectedShip,
}: HeaderProps) {
 
  const shipIcon =
  `/ships_icons/${{
    explorer: "01_Explorer.png",
    falcon: "02_Falcon.png",
    titan: "03_Titan.png",
    lightning: "04_Lightning.png",
    orbiter: "05_Orbiter.png",
    "lunar-x": "06_Lunar_X.png",
    "mars-runner": "07_Mars_Runner.png",
    nova: "08_Nova.png",
    "galaxy-rider": "09_Galaxy_Rider.png",
    "cosmic-king": "10_Cosmic_King.png",
  }[selectedShip]}`;
  const level = getLevel(xp);
  const nextLevelXp = getNextLevelXp(xp);
  const progress = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="card">
      <div className="ship">
        <img
          src={shipIcon}
          alt={selectedShip}
          className="headerShip"/></div>
      <h1>סייר החלל</h1>
      <div>🔥 רצף {streak} ימים</div>
      <div>⭐ Level {level}</div>
      <div>🪙 {coins}</div>
      <div className="xp">XP {xp}</div>

      <div style={{ marginTop: "12px" }}>
        <div>התקדמות לרמה הבאה</div>
        <div style={{ height: "12px", background: "#28466f", borderRadius: "20px", overflow: "hidden", marginTop: "6px" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#3dff91,#ffcf33)" }} />
        </div>
        <div style={{ marginTop: "6px", fontSize: "14px" }}>
          {xp} / {nextLevelXp} XP
        </div>
      </div>
    </div>
  );
}
