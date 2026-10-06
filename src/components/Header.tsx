type HeaderProps = {
  xp: number;
  coins: number;
  streak: number;
};

function getLevel(xp: number) {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  return 5;
}

function getNextLevelXp(xp: number) {
  if (xp < 100) return 100;
  if (xp < 250) return 250;
  if (xp < 500) return 500;
  if (xp < 1000) return 1000;
  return 2000;
}

export default function Header({ xp, coins, streak }: HeaderProps) {
  const ship = localStorage.getItem("ship") || "🚀";
  const level = getLevel(xp);
  const nextLevelXp = getNextLevelXp(xp);
  const progress = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="card">
      <div className="ship">{ship}</div>
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
