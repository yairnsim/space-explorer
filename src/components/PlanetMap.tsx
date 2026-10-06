import { useEffect, useState } from "react";
import Confetti from "react-confetti";

type Planet = {
  name: string;
  unlockAt: number;
  xpBonus: number;
  coinBonus: number;
};

const planets: Planet[] = [
  { name: "🌍 Earth", unlockAt: 0, xpBonus: 0, coinBonus: 0 },
  { name: "🔴 Mars", unlockAt: 7, xpBonus: 100, coinBonus: 200 },
  { name: "🟠 Jupiter", unlockAt: 14, xpBonus: 100, coinBonus: 200 },
  { name: "🪐 Saturn", unlockAt: 21, xpBonus: 150, coinBonus: 300 },
  { name: "✨ Galaxy X", unlockAt: 28, xpBonus: 200, coinBonus: 400 },
  { name: "⭐ Galaxy Prime", unlockAt: 35, xpBonus: 300, coinBonus: 500 },
];

export default function PlanetMap() {
  const missions = Number(localStorage.getItem("missions") || 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unlocked = planets.find(p => p.unlockAt > 0 && p.unlockAt === missions);
    if (!unlocked) return;

    const rewardKey = `planet-${unlocked.unlockAt}`;
    if (localStorage.getItem(rewardKey)) return;

    const xp = Number(localStorage.getItem("xp") || 0) + unlocked.xpBonus;
    const coins = Number(localStorage.getItem("coins") || 0) + unlocked.coinBonus;

    localStorage.setItem("xp", String(xp));
    localStorage.setItem("coins", String(coins));
    localStorage.setItem(rewardKey, "true");

    setMessage(`🎉 ${unlocked.name} נפתח! +${unlocked.xpBonus} XP +${unlocked.coinBonus} מטבעות`);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, [missions]);

  const nextPlanet = planets.find(p => missions < p.unlockAt);

  return (
    <div className="card">
      {showConfetti && <Confetti recycle={false} />}
      <h3>🪐 מסע הכוכבים</h3>
      {message && <div className="result">{message}</div>}
      {planets.map(p => (
        <div key={p.name}>{missions >= p.unlockAt ? "✅" : "🔒"} {p.name}</div>
      ))}
      {nextPlanet && (
        <div className="result">🚀 עוד {nextPlanet.unlockAt - missions} משימות לפתיחת {nextPlanet.name}</div>
      )}
    </div>
  );
}
