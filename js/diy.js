const diyIdeas = [
  {
    id: "jeans-tote", title: "Old Jeans → Tote Bag", icon: "bi-bag",
    description: "Turn sturdy denim into a simple reusable carry bag.",
    difficulty: "Medium", time: "45 min",
    steps: ["Cut the jeans below the pockets.", "Sew or securely tie the bottom closed.", "Use strips of denim as handles.", "Decorate or reinforce the bag if needed."]
  },
  {
    id: "bottle-pot", title: "Plastic Bottle → Plant Pot", icon: "bi-flower1",
    description: "Give a clean plastic bottle a new job as a small planter.",
    difficulty: "Easy", time: "20 min",
    steps: ["Wash and dry the bottle.", "Cut the bottle safely at the desired height.", "Make small drainage holes.", "Add soil and a small plant."]
  },
  {
    id: "jar-storage", title: "Glass Jar → Storage Container", icon: "bi-box-seam",
    description: "Reuse a clean jar to organize small household items.",
    difficulty: "Easy", time: "10 min",
    steps: ["Wash and dry the jar completely.", "Remove the old label if desired.", "Add a simple label.", "Use it for stationery, spices, or small items."]
  },
  {
    id: "box-organizer", title: "Cardboard Box → Desk Organizer", icon: "bi-grid",
    description: "Use an old box to create a simple organizer for study supplies.",
    difficulty: "Easy", time: "30 min",
    steps: ["Choose a clean, strong cardboard box.", "Cut it to the desired shape.", "Create sections using spare cardboard.", "Cover or decorate it with paper."]
  },
  {
    id: "books-donation", title: "Old Books → Donation", icon: "bi-book",
    description: "Pass useful books to someone who can read and use them.",
    difficulty: "Easy", time: "15 min",
    steps: ["Check that the books are still usable.", "Group books by subject or level.", "Find a school, library, community group, or person who needs them.", "Pack them safely for handover."]
  },
  {
    id: "shirt-cloth", title: "Old T-Shirt → Cleaning Cloth", icon: "bi-stars",
    description: "Convert worn cotton fabric into reusable cleaning cloths.",
    difficulty: "Easy", time: "15 min",
    steps: ["Wash the shirt before reuse.", "Cut away buttons or hard parts.", "Cut the fabric into useful cloth sizes.", "Use and wash the cloths repeatedly."]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("diyGrid");
  const search = document.getElementById("diySearch");
  if (!grid) return;

  renderDiyIdeas(diyIdeas);

  search?.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    const filtered = diyIdeas.filter(idea =>
      `${idea.title} ${idea.description} ${idea.difficulty}`.toLowerCase().includes(term)
    );
    renderDiyIdeas(filtered);
  });

  grid.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-view-id]");
    const saveButton = event.target.closest("[data-save-id]");

    if (viewButton) {
      const idea = diyIdeas.find(item => item.id === viewButton.dataset.viewId);
      if (idea) openIdeaModal(idea);
    }

    if (saveButton) {
      const idea = diyIdeas.find(item => item.id === saveButton.dataset.saveId);
      if (!idea) return;
      const saved = saveIdea(idea);
      showToast(saved ? "Idea saved successfully!" : "This idea is already saved.");
    }
  });
});

function renderDiyIdeas(ideas) {
  const grid = document.getElementById("diyGrid");
  const message = document.getElementById("diyMessage");
  grid.innerHTML = "";

  if (!ideas.length) {
    message.className = "alert alert-info";
    message.textContent = "No ideas found. Try another search.";
    return;
  }
  message.className = "alert d-none";

  ideas.forEach(idea => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <article class="diy-card">
        <div class="idea-icon mb-3"><i class="bi ${idea.icon}"></i></div>
        <h2 class="h5 fw-bold">${idea.title}</h2>
        <p class="text-secondary">${idea.description}</p>
        <div class="small text-secondary mb-3"><i class="bi bi-bar-chart me-1"></i>${idea.difficulty} &nbsp; • &nbsp; <i class="bi bi-clock me-1"></i>${idea.time}</div>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-success btn-sm rounded-pill" data-view-id="${idea.id}">View Idea</button>
          <button class="btn btn-outline-success btn-sm rounded-pill" data-save-id="${idea.id}">Save Idea</button>
        </div>
      </article>
    `;
    grid.appendChild(card);
  });
}

function openIdeaModal(idea) {
  document.getElementById("ideaModalLabel").textContent = idea.title;
  document.getElementById("modalDescription").textContent = idea.description;
  document.getElementById("modalSteps").innerHTML = idea.steps.map(step => `<li>${step}</li>`).join("");
  bootstrap.Modal.getOrCreateInstance(document.getElementById("ideaModal")).show();
}
