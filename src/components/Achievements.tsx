export default function Achievements({
  missions,
  shipsOwned,
}: {
  missions: number;
  shipsOwned: number;
}) {
  const missionAchievements = [
    {
      title: "🚀 משימה ראשונה",
      unlocked: missions >= 1,
      progress: `${Math.min(missions, 1)} / 1`,
    },
    {
      title: "🚀 10 משימות",
      unlocked: missions >= 10,
      progress: `${Math.min(missions, 10)} / 10`,
    },
    {
      title: "🚀 50 משימות",
      unlocked: missions >= 50,
      progress: `${Math.min(missions, 50)} / 50`,
    },
  ];

  const shipAchievements = [
    {
      title: "🛸 חללית ראשונה",
      unlocked: shipsOwned >= 1,
      progress: `${Math.min(shipsOwned, 1)} / 1`,
    },
    {
      title: "🛸 5 חלליות",
      unlocked: shipsOwned >= 5,
      progress: `${Math.min(shipsOwned, 5)} / 5`,
    },
    {
      title: "👑 כל החלליות",
      unlocked: shipsOwned >= 10,
      progress: `${Math.min(shipsOwned, 10)} / 10`,
    },
  ];

  return (
    <div className="card">
      <h2>🏆 הישגים</h2>

      <div className="achievementScroller">

        <div className="achievementPage">
          <h3>🚀 משימות</h3>

          {missionAchievements.map((achievement) => (
            <div
              key={achievement.title}
              className="achievementItem"
            >
              <div>
                {achievement.unlocked ? "✅" : "🔒"}{" "}
                {achievement.title}
              </div>

              <div className="achievementProgress">
                {achievement.progress}
              </div>
            </div>
          ))}
        </div>

        <div className="achievementPage">
          <h3>🛸 חלליות</h3>

          {shipAchievements.map((achievement) => (
            <div
              key={achievement.title}
              className="achievementItem"
            >
              <div>
                {achievement.unlocked ? "✅" : "🔒"}{" "}
                {achievement.title}
              </div>

              <div className="achievementProgress">
                {achievement.progress}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}