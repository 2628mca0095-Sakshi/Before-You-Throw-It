// Small rule-based demo dataset.
// FUTURE BACKEND: this data can later come from a REST API.
const wasteItems = [
  { name: "Old jeans", category: "Clothing", possibleActions: ["Reuse", "Donate", "Upcycle", "Recycle"], recommendation: "Old jeans can often be donated, turned into something useful, or sent to a textile recycling option." },
  { name: "Cotton shirt", category: "Clothing", possibleActions: ["Reuse", "Donate", "Upcycle", "Recycle"], recommendation: "A usable shirt can be worn again or donated. Damaged fabric can become a cleaning cloth." },
  { name: "Plastic bottle", category: "Plastic", possibleActions: ["Reuse", "Upcycle", "Recycle"], recommendation: "Clean bottles may be reused for simple purposes or placed in the correct recycling stream." },
  { name: "Glass jar", category: "Glass", possibleActions: ["Reuse", "Upcycle", "Recycle"], recommendation: "A clean glass jar can become a storage container or be recycled where accepted." },
  { name: "Cardboard box", category: "Paper", possibleActions: ["Reuse", "Upcycle", "Recycle"], recommendation: "Boxes can be reused for storage, turned into organizers, or recycled when no longer usable." },
  { name: "Old books", category: "Paper", possibleActions: ["Reuse", "Donate", "Sell", "Recycle"], recommendation: "Books in usable condition can be shared, donated, or sold before recycling." },
  { name: "Broken phone", category: "Electronics", possibleActions: ["Repair", "Sell", "Recycle"], recommendation: "Consider repair or responsible e-waste recycling instead of regular household disposal." },
  { name: "Old charger", category: "Electronics", possibleActions: ["Reuse", "Repair", "Recycle"], recommendation: "If safe and working, reuse it. Otherwise use an appropriate e-waste collection option." },
  { name: "Wooden chair", category: "Household", possibleActions: ["Reuse", "Repair", "Donate", "Sell", "Upcycle"], recommendation: "A chair can often be repaired, sold, donated, or refreshed for another use." },
  { name: "Food leftovers", category: "Food", possibleActions: ["Reuse", "Upcycle"], recommendation: "Safe leftovers may be reused in another meal, while suitable scraps may be composted." }
];

function findItemByName(name) {
  const cleanName = name.trim().toLowerCase();
  return wasteItems.find(item => item.name.toLowerCase() === cleanName);
}

function findItemByText(text) {
  const cleanText = text.trim().toLowerCase();
  return wasteItems.find(item => cleanText.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(cleanText));
}
