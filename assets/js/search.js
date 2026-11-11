// Site search: loads search.json once and filters it in the browser (no server needed)
(function () {
  var box = document.getElementById("site-search");
  var results = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  if (!box || !results) return;

  var index = null;

  function tokens(s) {
    return (s || "").toLowerCase().split(/[^a-z0-9]+/).filter(function (t) { return t.length > 1; });
  }

  function score(item, toks) {
    var title = item.title.toLowerCase();
    var cat = (item.category || "").toLowerCase();
    var text = ((item.summary || "") + " " + (item.text || "")).toLowerCase();
    var total = 0;
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i], s = 0;
      if (title.indexOf(t) !== -1) s += 5;
      if (cat.indexOf(t) !== -1) s += 3;
      if (text.indexOf(t) !== -1) s += 1;
      if (s === 0) return 0;      // every word must appear somewhere
      total += s;
    }
    return total;
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt) e.textContent = txt;
    return e;
  }

  function render(query) {
    results.innerHTML = "";
    var toks = tokens(query);
    if (!toks.length) { status.textContent = ""; return; }

    var hits = index
      .map(function (it) { return { it: it, s: score(it, toks) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });

    status.textContent = hits.length
      ? hits.length + (hits.length === 1 ? " result" : " results") + " for “" + query + "”"
      : "No results for “" + query + "”. Try a different word, such as “bulb”, “camera” or “kitchen”.";

    hits.forEach(function (h) {
      var a = el("a", "result-item");
      a.href = h.it.url;
      a.appendChild(el("span", "meta", h.it.type + (h.it.category ? " · " + h.it.category : "")));
      a.appendChild(el("strong", "", h.it.title));
      a.appendChild(el("span", "result-summary", h.it.summary || ""));
      results.appendChild(a);
    });
  }

  function load(cb) {
    if (index) return cb();
    fetch(results.getAttribute("data-index"))
      .then(function (r) { return r.json(); })
      .then(function (d) { index = d; cb(); })
      .catch(function () { status.textContent = "Search is not available right now."; });
  }

  var timer;
  box.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { load(function () { render(box.value); }); }, 150);
  });

  var q = "";
  try { q = new URLSearchParams(location.search).get("q") || ""; } catch (e) {}
  if (q) { box.value = q; load(function () { render(q); }); }
})();
