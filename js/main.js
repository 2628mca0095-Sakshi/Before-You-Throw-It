document.addEventListener("DOMContentLoaded", () => {
  // Automatically closes the mobile navbar after a link is selected.
  document.querySelectorAll(".navbar-collapse .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.querySelector(".navbar-collapse.show");
      if (nav && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  const itemForm = document.getElementById("itemForm");
  if (itemForm) initItemForm(itemForm);
});

function showToast(message) {
  const toastElement = document.getElementById("siteToast");
  if (!toastElement) return;
  const body = toastElement.querySelector(".toast-body");
  body.textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 2600 }).show();
}

function showMessage(element, message, type = "danger") {
  if (!element) return;
  element.className = `alert alert-${type}`;
  element.textContent = message;
}

function initItemForm(form) {
  const itemInput = document.getElementById("itemInput");
  const category = document.getElementById("category");
  const message = document.getElementById("formMessage");

  // Keep the category in sync with a known demo item.
  itemInput.addEventListener("input", () => {
    const item = findItemByText(itemInput.value);
    if (item) category.value = item.category;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemText = itemInput.value.trim();
    const condition = document.querySelector('input[name="condition"]:checked')?.value || "";
    const preference = document.querySelector('input[name="preference"]:checked')?.value || "";

    if (!itemText || !condition) {
      showMessage(message, "Please select an item and its condition first.");
      return;
    }

    let item = findItemByName(itemText);
    if (!item) {
      item = findItemByText(itemText);
    }

    const selected = {
      itemName: item ? item.name : itemText,
      category: category.value || (item ? item.category : "Household"),
      condition,
      preference: preference || "Not sure"
    };

    saveData(STORAGE_KEYS.selection, selected);
    window.location.href = "recommendations.html";
  });
}
