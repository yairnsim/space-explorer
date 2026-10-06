import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import type { GameData } from "../App";

const rewards = [
  { label: "🪙 20 מטבעות", xp: 0, coins: 20 },
  { label: "🪙 50 מטבעות", xp: 0, coins: 50 },
  { label: "🪙 100 מטבעות", xp: 0, coins: 100 },
  { label: "⭐ 50 XP", xp: 50, coins: 0 },
];

export default function TreasureBox({
  gameData,
  setGameData,
}: {
  gameData: GameData;
  setGameData: any;
}) {
  const [reward, setReward] = useState<any>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!gameData.treasureOpened) {
      setReward(null);
    }
  }, [gameData.treasureOpened]);

  function openBox() {
    const r = rewards[Math.floor(Math.random() * rewards.length)];

    setReward(r);
    setConfetti(true);

    setTimeout(() => {
      setConfetti(false);
    }, 4000);

    setGameData({
      ...gameData,
      xp: gameData.xp + r.xp,
      coins: gameData.coins + r.coins,
      treasureReady: false,
      treasureOpened: true,
    });
  }

  return (
    <div className="card">
      {confetti && <Confetti recycle={false} />}

      <h3>🎁 תיבת אוצר</h3>

      {gameData.treasureOpened && reward ? (
        <div className="result">
          <h3>✨ זכית!</h3>
          <div>{reward.label}</div>
          <div style={{ marginTop: "10px" }}>
            ✅ התיבה של היום נפתחה
          </div>
        </div>
      ) : !gameData.treasureReady ? (
        <div className="result">🔒 התיבה נעולה</div>
      ) : (
        <button className="startBtn" onClick={openBox}>
          🎁 פתח תיבה
        </button>
      )}
    </div>
  );
}
