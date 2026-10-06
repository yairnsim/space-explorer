import { useEffect, useState } from "react";
import Confetti from "react-confetti";
export default function MissionCard() {
  const [c, setC] = useState([false, false, false]);
  const [s, setS] = useState(0);
  const [r, setR] = useState(false);
  const [result, setResult] = useState("");
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    if (!r) return;
    const i = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(i);
  }, [r]);
  const done = c.filter(Boolean).length;
  useEffect(() => {
    if (done === 3 && r) {
      setR(false);
      const best = Number(localStorage.getItem("bestTime") || 0);
      const isRecord = best === 0 || s < best;
      if (isRecord) {
        localStorage.setItem("bestTime", String(s));
        setConfetti(true);
        setTimeout(() => setConfetti(false), 5000);
      }
      const reward = [20, 50, 100][Math.floor(Math.random() * 3)];
      const coins = Number(localStorage.getItem("coins") || 0) + 30 + reward;
      const xp = Number(localStorage.getItem("xp") || 0) + 50;
      const missions = Number(localStorage.getItem("missions") || 0) + 1;
      localStorage.setItem("coins", String(coins));
      localStorage.setItem("xp", String(xp));
      localStorage.setItem("missions", String(missions));
      const streak = Number(localStorage.getItem("streak") || 0) + 1;
      localStorage.setItem("streak", String(streak));
      setResult(
        `${isRecord ? "🏆 שיא אישי חדש!" : "✅ משימה הושלמה"} | זמן ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")} | +50 XP | +${30 + reward} מטבעות`,
      );
    }
  }, [done]);
  return (
    <div className="card">
      {confetti && <Confetti recycle={false} />}
      <h2>🚀 משימת היום</h2>
      <div className="timer">
        {String(Math.floor(s / 60)).padStart(2, "0")}:
        {String(s % 60).padStart(2, "0")}
      </div>
      <div>🏆 שיא: {localStorage.getItem("bestTime") || "--:--"}</div>
      {[0, 1, 2].map((i) => (
        <label className="fuel" key={i}>
          <input
            type="checkbox"
            checked={c[i]}
            onChange={() => {
              const n = [...c];
              n[i] = !n[i];
              setC(n);
            }}
          />{" "}
          תא דלק {i + 1}
        </label>
      ))}
      <div className="progress">
        <div className="bar" style={{ width: `${(done / 3) * 100}%` }}></div>
      </div>
      <button
        className="startBtn"
        onClick={() => {
          setResult("");
          setS(0);
          setC([false, false, false]);
          setR(true);
        }}
      >
        🚀 התחל משימה
      </button>
      <button
        className="resetBtn"
        onClick={() => {
          if (confirm("לאפס הכל?")) {
            localStorage.clear();
            location.reload();
          }
        }}
      >
        🗑️ איפוס
      </button>
      {result && <div className="result">{result}</div>}
    </div>
  );
}
