// Simple localStorage helpers used across the prototype.
const STORAGE_KEYS = {
  selection: "byti_selection",
  savedIdeas: "byti_saved_ideas",
  actions: "byti_actions"
};

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function removeData(key) {
  localStorage.removeItem(key);
}

function saveIdea(idea) {
  const ideas = getSavedIdeas();
  if (!ideas.some(saved => saved.id === idea.id)) {
    ideas.push(idea);
    saveData(STORAGE_KEYS.savedIdeas, ideas);
    return true;
  }
  return false;
}

function getSavedIdeas() {
  return getData(STORAGE_KEYS.savedIdeas, []);
}

function saveAction(action) {
  const actions = getActions();
  actions.unshift({
    ...action,
    id: Date.now(),
    savedAt: new Date().toISOString()
  });
  saveData(STORAGE_KEYS.actions, actions.slice(0, 30));
}

function getActions() {
  return getData(STORAGE_KEYS.actions, []);
}

// FUTURE BACKEND:
// These localStorage functions can later be replaced by requests
// to a Java Spring Boot REST API with a MySQL database.
