document.addEventListener("DOMContentLoaded", () => {
  const actions = getActions();
  const actionCount = actions.length;

  // Keep the requested demo values when there is no user activity.
  document.getElementById("actionsCompleted").textContent = actionCount ? actionCount : "4";
  document.getElementById("itemsSaved").textContent = actionCount ? Math.max(5, new Set(actions.map(a => a.item)).size) : "5";
  document.getElementById("wasteAvoided").textContent = actionCount ? `${(actionCount * 0.25).toFixed(1)} kg` : "1.2 kg";
  document.getElementById("currentStreak").textContent = actionCount ? "1 day" : "2 days";

  renderRecentActions(actions);
  renderImpactChart(actions);
});

function renderRecentActions(actions) {
  const container = document.getElementById("recentActions");

  if (!actions.length) {
    container.innerHTML = `
      <div class="action-row d-flex justify-content-between gap-3"><span>Old Jeans</span><strong class="text-success">Donated</strong></div>
      <div class="action-row d-flex justify-content-between gap-3"><span>Plastic Bottle</span><strong class="text-success">Reused</strong></div>
      <div class="action-row d-flex justify-content-between gap-3"><span>Glass Jar</span><strong class="text-success">Reused</strong></div>
    `;
    return;
  }

  container.innerHTML = actions.slice(0, 7).map(action => `
    <div class="action-row d-flex justify-content-between align-items-center gap-3">
      <span>${escapeHtml(action.item)}</span><strong class="text-success">${escapeHtml(action.action)}</strong>
    </div>
  `).join("");
}

function renderImpactChart(actions) {
  const canvas = document.getElementById("impactChart");
  if (!canvas || typeof Chart === "undefined") return;

  const counts = { Reuse: 0, Donate: 0, Recycle: 0, Repair: 0 };
  actions.forEach(action => {
    if (counts[action.action] !== undefined) counts[action.action]++;
  });

  if (!actions.length) {
    counts.Reuse = 2;
    counts.Donate = 1;
    counts.Recycle = 1;
    counts.Repair = 0;
  }

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Reused", "Donated", "Recycled", "Repaired"],
      datasets: [{ data: [counts.Reuse, counts.Donate, counts.Recycle, counts.Repair] }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      cutout: "65%"
    }
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
