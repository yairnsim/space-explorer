import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import type { GameData } from "../App";

type ResultData = {
  isRecord: boolean;
  time: string;
  xp: number;
  coins: number;
};

export default function MissionCard({
  gameData,
  setGameData,
}: {
  gameData: GameData;
  setGameData: any;
}) {
  const [checks, setChecks] = useState([
    false,
    false,
    false,
  ]);

  const [seconds, setSeconds] = useState(0);

  const [running, setRunning] =
    useState(false);

  const [confetti, setConfetti] =
    useState(false);

  const [result, setResult] =
    useState<ResultData | null>(null);

  useEffect(() => {
    if (!running) return;

    const i = setInterval(() => {
      setSeconds((v) => v + 1);
    }, 1000);

    return () => clearInterval(i);
  }, [running]);

  const completed =
    checks.filter(Boolean).length;

  useEffect(() => {
    if (completed !== 3 || !running)
      return;

    setRunning(false);

    const previousBest = Number(
      localStorage.getItem("bestTime") || 0
    );

    const isRecord =
      previousBest === 0 ||
      seconds < previousBest;

    if (isRecord) {
      localStorage.setItem(
        "bestTime",
        String(seconds)
      );

      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
      }, 4000);
    }

    const xpReward = isRecord
      ? 75
      : 50;

    const coinReward = isRecord
      ? 80
      : 30;

    const xp =
      gameData.xp + xpReward;

    const coins =
      gameData.coins + coinReward;

    const missions =
      gameData.missions + 1;

    const streak =
      gameData.streak + 1;

    localStorage.setItem(
      "xp",
      String(xp)
    );

    localStorage.setItem(
      "coins",
      String(coins)
    );

    localStorage.setItem(
      "missions",
      String(missions)
    );

    localStorage.setItem(
      "bestTime",
      String(
        isRecord
          ? seconds
          : previousBest
      )
    );

    setGameData({
      ...gameData,
      xp,
      coins,
      missions,
      streak,
      treasureReady: true,
      treasureOpened: false,
    });

    setResult({
      isRecord,
      time: `${String(
        Math.floor(seconds / 60)
      ).padStart(2, "0")}:${String(
        seconds % 60
      ).padStart(2, "0")}`,
      xp: xpReward,
      coins: coinReward,
    });
  }, [completed]);

  return (
    <div className="card">
      {confetti && (
        <Confetti recycle={false} />
      )}

      <h2>🚀 משימת היום</h2>

      <div className="timer">
        {String(
          Math.floor(seconds / 60)
        ).padStart(2, "0")}
        :
        {String(
          seconds % 60
        ).padStart(2, "0")}
      </div>

      <div>
        🏆 שיא אישי:
        {" "}
        {localStorage.getItem(
          "bestTime"
        ) || "--:--"}
      </div>

      {[0, 1, 2].map((i) => (
        <label
          key={i}
          className="fuel"
        >
          <input
            type="checkbox"
            checked={checks[i]}
            onChange={() => {
              const n = [...checks];

              n[i] = !n[i];

              setChecks(n);
            }}
          />

          תא דלק {i + 1}
        </label>
      ))}

      <div className="progress">
        <div
          className="bar"
          style={{
            width: `${
              (completed / 3) * 100
            }%`,
          }}
        />
      </div>

      <button
        className="startBtn"
        onClick={() => {
          setResult(null);

          setChecks([
            false,
            false,
            false,
          ]);

          setSeconds(0);

          setGameData({
            ...gameData,
            treasureReady: false,
            treasureOpened: false,
          });

          setRunning(true);
        }}
      >
        🚀 התחל משימה
      </button>

      <button
        className="resetBtn"
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
        🗑️ איפוס
      </button>

      {result && (
        <div className="result">
          <h3>
            {result.isRecord
              ? "🏆 שיא אישי חדש!"
              : "✅ כל הכבוד!"}
          </h3>

          <div>
            ⏱ זמן: {result.time}
          </div>

          <div>
            ⭐ +{result.xp} XP
          </div>

          <div>
            🪙 +{result.coins} מטבעות
          </div>

          <div>
            🎁 תיבה מוכנה לפתיחה
          </div>
        </div>
      )}
    </div>
  );
}