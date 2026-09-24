const recommendationOptions = [
  { action: "Reuse", icon: "bi-arrow-repeat", description: "Use the item again in its current form or for another useful purpose." },
  { action: "Repair", icon: "bi-tools", description: "Check whether a small repair can make the item usable again." },
  { action: "Donate", icon: "bi-heart", description: "Give the item to someone who may still need it." },
  { action: "Sell", icon: "bi-currency-rupee", description: "If it still has value, consider selling it instead of discarding it." },
  { action: "Upcycle", icon: "bi-stars", description: "Transform the item into something new and useful." },
  { action: "Recycle", icon: "bi-recycle", description: "Send the item to the correct recycling channel when other options are not suitable." },
  { action: "Dispose", icon: "bi-trash", description: "Use regular disposal only when better options are not practical or safe." }
];

document.addEventListener("DOMContentLoaded", () => {
  const selection = getData(STORAGE_KEYS.selection);
  const title = document.getElementById("recommendationTitle");
  const summary = document.getElementById("itemSummary");
  const grid = document.getElementById("recommendationGrid");
  const message = document.getElementById("recommendationMessage");

  if (!selection) {
    showMessage(message, "No item has been selected yet. Please check an item first.", "warning");
    title.textContent = "Let's check an item first";
    grid.innerHTML = '<div class="col-12 text-center"><a class="btn btn-success rounded-pill" href="check-item.html">Go to Check an Item</a></div>';
    return;
  }

  title.textContent = `Here are some better options for your ${selection.itemName}.`;
  summary.textContent = `${selection.category} • Condition: ${selection.condition} • Preference: ${selection.preference}`;

  const item = typeof findItemByName === "function" ? findItemByName(selection.itemName) : null;
  const allowed = item ? item.possibleActions : recommendationOptions.map(option => option.action);

  recommendationOptions.forEach(option => {
    const isLast = option.action === "Dispose";
    const recommended = allowed.includes(option.action);
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <article class="recommendation-card ${isLast ? "action-last" : ""}">
        <div class="action-icon mb-3"><i class="bi ${option.icon}"></i></div>
        <div class="d-flex justify-content-between gap-2 align-items-start">
          <h2 class="h5 fw-bold">${option.action}</h2>
          ${recommended ? '<span class="badge bg-success-subtle text-success-emphasis">Good option</span>' : ""}
        </div>
        <p class="text-secondary">${option.description}</p>
        <button class="btn btn-outline-success rounded-pill choose-action" data-action="${option.action}">
          Choose This Action
        </button>
      </article>
    `;
    grid.appendChild(card);
  });

  if (item) {
    const note = document.createElement("div");
    note.className = "col-12";
    note.innerHTML = `<div class="alert alert-success mb-0"><i class="bi bi-lightbulb me-2"></i>${item.recommendation}</div>`;
    grid.prepend(note);
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest(".choose-action");
    if (!button) return;

    const action = button.dataset.action;
    saveAction({ item: selection.itemName, action, category: selection.category });
    showToast("Your action has been saved successfully!");
  });
});
