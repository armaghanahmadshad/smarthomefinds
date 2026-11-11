// Guides hub: filter guide cards by category (works with ?category=kitchen in the URL)
(function () {
  var chips = document.getElementById("guide-filters");
  var list = document.getElementById("guide-list");
  if (!chips || !list) return;

  var cards = Array.prototype.slice.call(list.querySelectorAll(".guide-card"));
  var buttons = Array.prototype.slice.call(chips.querySelectorAll(".chip"));
  var empty = document.getElementById("no-guides");
  chips.hidden = false;

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = filter === "all" || card.getAttribute("data-category") === filter;
      card.hidden = !match;
      if (match) shown++;
    });
    buttons.forEach(function (b) {
      var on = b.getAttribute("data-filter") === filter;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (empty) empty.hidden = shown !== 0;
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-filter");
      apply(f);
      try {
        var url = f === "all" ? location.pathname : location.pathname + "?category=" + encodeURIComponent(f);
        history.replaceState(null, "", url);
      } catch (e) {}
    });
  });

  var wanted = "all";
  try {
    var q = new URLSearchParams(location.search).get("category");
    if (q && buttons.some(function (b) { return b.getAttribute("data-filter") === q; })) wanted = q;
  } catch (e) {}
  apply(wanted);
})();
