const sortingRules = {
  Plastic: "Clean plastic items may be recyclable. Check your local recycling rules.",
  Paper: "Clean and dry paper can usually be placed in the paper recycling stream.",
  Glass: "Clean glass containers may be recyclable. Keep glass separate and follow local collection rules.",
  Metal: "Clean metal cans and suitable scrap metal may be recyclable. Check local collection guidance.",
  Electronics: "Do not put broken electronics in regular household waste. Use an e-waste collection point.",
  "Organic Waste": "Food leftovers and vegetable scraps may be suitable for composting.",
  Textile: "Donate, repair, reuse, or check textile collection options before disposal."
};

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("materialSelect");
  if (!select) return;

  select.addEventListener("change", () => {
    const material = select.value;
    const result = document.getElementById("sortingResult");
    if (!material) {
      result.classList.add("d-none");
      return;
    }

    document.getElementById("sortingTitle").textContent = material;
    document.getElementById("sortingText").textContent = sortingRules[material];
    result.classList.remove("d-none");
  });
});
