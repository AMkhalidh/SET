// SET game — beginner 27-card version
// 3 features: colour, shape, number. no shading.

(() => {

// ---- shape paths ----

function path(s) {
  if (s === "oval")
    return "M30 30 C30 12 55 8 85 8 L115 8 C145 8 170 12 170 30 C170 48 145 52 115 52 L85 52 C55 52 30 48 30 30 Z";
  if (s === "diamond")
    return "M100 8 L170 30 L100 52 L30 30 Z";
  return "M35 40 C50 55 80 55 95 40 C110 25 140 25 165 40 C150 25 135 10 110 14 C85 18 75 30 55 26 C35 22 25 30 35 40 Z";
}

var COLORS = [
  { key: "red",   stroke: "#ff4d6d", fill: "rgba(255,77,109,0.9)"   },
  { key: "green", stroke: "#3ddc84", fill: "rgba(61,220,132,0.9)"  },
  { key: "teal",  stroke: "#00e5cc", fill: "rgba(0,229,204,0.9)"   }
];
var SHAPES  = ["oval", "diamond", "squiggle"];
var NUMBERS = [1, 2, 3];


// ---- tutorial helpers ----

function shapeEl(shape, colorStroke, colorFill, fill, sizeW, sizeH) {
  fill  = fill  || "solid";
  sizeW = sizeW || 44;
  sizeH = sizeH || 22;
  var fillAttr = fill === "solid" ? colorFill : (fill === "empty" ? "none" : "");
  var id = "str_" + Math.random().toString(36).slice(2, 6);
  var defs = "";
  if (fill === "stripe") {
    defs = '<defs><pattern id="' + id + '" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="' + colorStroke + '" stroke-width="2"/></pattern></defs>';
    fillAttr = "url(#" + id + ")";
  }
  return '<svg width="' + sizeW + '" height="' + sizeH + '" viewBox="0 0 200 60">' + defs + '<path d="' + path(shape) + '" fill="' + fillAttr + '" stroke="' + colorStroke + '" stroke-width="6"/></svg>';
}

function exCard(svgs, valid, label) {
  label = label || "";
  var border = valid === true  ? "2px solid #22c55e" :
               valid === false ? "2px solid #ef4444" : "1.5px solid #ddd";
  var shadow = valid === true  ? "box-shadow:0 0 0 3px rgba(34,197,94,0.2)" :
               valid === false ? "box-shadow:0 0 0 3px rgba(239,68,68,0.15)" : "";
  return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px">' +
    '<div style="width:72px;min-height:90px;background:#fff;border-radius:10px;border:' + border + ';' + shadow + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:6px">' +
    svgs + '</div>' +
    (label ? '<div style="font-size:11px;color:#666;font-weight:700;text-align:center;max-width:72px">' + label + '</div>' : '') +
    '</div>';
}

function setRow(cards, tick, caption) {
  caption = caption || "";
  var icon = tick
    ? '<div style="position:absolute;top:-12px;right:-12px;width:24px;height:24px;background:#22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:900">&#10003;</div>'
    : '<div style="position:absolute;top:-12px;right:-12px;width:24px;height:24px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:900">&#10005;</div>';
  return '<div style="background:#f8f8f8;border-radius:14px;padding:14px 14px 10px;border:1.5px solid #e5e7eb;margin-bottom:12px;position:relative">' +
    icon +
    '<div style="display:flex;gap:8px;justify-content:center;align-items:flex-end;margin-bottom:8px">' + cards + '</div>' +
    (caption ? '<div style="font-size:12px;color:#555;text-align:center;font-weight:600;line-height:1.4">' + caption + '</div>' : '') +
    '</div>';
}

var S = {
  teal:  { s: "#00e5cc", f: "rgba(0,229,204,0.9)"   },
  green: { s: "#3ddc84", f: "rgba(61,220,132,0.9)"  },
  red:   { s: "#ff4d6d", f: "rgba(255,77,109,0.9)"  }
};


// ---- tutorial slides ----

var slides = [
  {
    step: "TUTORIAL (1/4)",
    html: '<div class="modal-title">Welcome to SET!</div>' +
      '<div class="modal-desc">This beginner version uses 27 cards. Each card has <strong>three features</strong>: colour, shape, and number of symbols. Every possible combination appears exactly once.</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:4px">' +
      '<div class="feature-box"><div class="feature-title">Colour</div><div style="display:flex;justify-content:space-around;align-items:flex-end">' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("squiggle",S.teal.s,S.teal.f) + '</div><div class="feat-label">Teal</div></div>' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("squiggle",S.green.s,S.green.f) + '</div><div class="feat-label">Green</div></div>' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("squiggle",S.red.s,S.red.f) + '</div><div class="feat-label">Red</div></div>' +
      '</div></div>' +
      '<div class="feature-box"><div class="feature-title">Shape</div><div style="display:flex;justify-content:space-around;align-items:flex-end">' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("squiggle",S.teal.s,S.teal.f) + '</div><div class="feat-label">Squiggle</div></div>' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("diamond",S.teal.s,S.teal.f) + '</div><div class="feat-label">Diamond</div></div>' +
      '<div class="feature-example"><div class="feat-card">' + shapeEl("oval",S.teal.s,S.teal.f) + '</div><div class="feat-label">Oval</div></div>' +
      '</div></div>' +
      '<div class="feature-box"><div class="feature-title">Number</div><div style="display:flex;justify-content:space-around;align-items:flex-end">' +
      '<div class="feature-example"><div class="feat-card" style="flex-direction:column;gap:2px">' + shapeEl("oval",S.teal.s,S.teal.f,undefined,40,20) + '</div><div class="feat-label">1</div></div>' +
      '<div class="feature-example"><div class="feat-card" style="flex-direction:column;gap:2px">' + shapeEl("oval",S.teal.s,S.teal.f,undefined,38,18) + shapeEl("oval",S.teal.s,S.teal.f,undefined,38,18) + '</div><div class="feat-label">2</div></div>' +
      '<div class="feature-example"><div class="feat-card" style="flex-direction:column;gap:1px;padding:3px">' + shapeEl("oval",S.teal.s,S.teal.f,undefined,36,16) + shapeEl("oval",S.teal.s,S.teal.f,undefined,36,16) + shapeEl("oval",S.teal.s,S.teal.f,undefined,36,16) + '</div><div class="feat-label">3</div></div>' +
      '</div></div></div>'
  },
  {
    step: "TUTORIAL (2/4)",
    html: '<div class="modal-title">What makes a SET?</div>' +
      '<div class="modal-desc">A SET is 3 cards where <strong>each feature</strong> is either <strong>all the same</strong> or <strong>all different</strong>. Since every card is unique, at least one feature must always differ.</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
      setRow(exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)), true, "Same colour, same shape,<br>all different numbers") +
      setRow(exCard(shapeEl("diamond",S.teal.s,S.teal.f,undefined,42,22))+exCard(shapeEl("diamond",S.green.s,S.green.f,undefined,42,22)+"<br>"+shapeEl("diamond",S.green.s,S.green.f,undefined,42,22))+exCard(shapeEl("diamond",S.red.s,S.red.f,undefined,42,22)+"<br>"+shapeEl("diamond",S.red.s,S.red.f,undefined,42,22)+"<br>"+shapeEl("diamond",S.red.s,S.red.f,undefined,42,22)), true, "All different colours, same shape,<br>all different numbers") +
      setRow(exCard(shapeEl("oval",S.green.s,S.green.f,undefined,44,22)+"<br>"+shapeEl("oval",S.green.s,S.green.f,undefined,44,22))+exCard(shapeEl("squiggle",S.red.s,S.red.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.red.s,S.red.f,undefined,44,22))+exCard(shapeEl("diamond",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("diamond",S.teal.s,S.teal.f,undefined,44,22)), true, "All different colours, all different shapes,<br>same number") +
      setRow(exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("oval",S.red.s,S.red.f,undefined,44,22))+exCard(shapeEl("diamond",S.green.s,S.green.f,undefined,44,22)+"<br>"+shapeEl("diamond",S.green.s,S.green.f,undefined,44,22)), true, "All different colours, all different shapes,<br>all different numbers") +
      '</div>'
  },
  {
    step: "TUTORIAL (3/4)",
    html: '<div class="modal-title">Not a SET!</div>' +
      '<div class="modal-desc">If any single feature has two cards the same and one different, it\'s <strong>not</strong> a SET. All three features must each pass the "all same or all different" test.</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
      setRow(exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("squiggle",S.red.s,S.red.f,undefined,44,22))+exCard(shapeEl("squiggle",S.red.s,S.red.f,undefined,44,22)), false, "Colour: teal, red, red &mdash;<br>two-and-one, not a SET!") +
      setRow(exCard(shapeEl("diamond",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("diamond",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("diamond",S.teal.s,S.teal.f,undefined,44,22))+exCard(shapeEl("oval",S.green.s,S.green.f,undefined,44,22)+"<br>"+shapeEl("oval",S.green.s,S.green.f,undefined,44,22)), false, "Shape: diamond, diamond, oval &mdash;<br>two-and-one, not a SET!") +
      setRow(exCard(shapeEl("oval",S.red.s,S.red.f,undefined,44,22))+exCard(shapeEl("oval",S.green.s,S.green.f,undefined,44,22)+"<br>"+shapeEl("oval",S.green.s,S.green.f,undefined,44,22))+exCard(shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)+"<br>"+shapeEl("squiggle",S.teal.s,S.teal.f,undefined,44,22)), false, "Number: 1, 2, 2 &mdash;<br>two-and-one, not a SET!") +
      '</div>'
  },
  {
    step: "TUTORIAL (4/4)",
    html: '<div class="modal-title">How to play</div>' +
      '<div class="modal-desc">9 cards are dealt face-up. Find SETs and the board refills. If there\'s no SET on the board, 3 more cards are added.</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:8px">' +
      '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;border:1px solid rgba(255,255,255,0.1);color:#f0f0f5"><div style="font-size:24px;flex-shrink:0">&#127183;</div><div><strong style="color:#fff">Click 3 cards</strong> to select them. Click again to deselect.</div></div>' +
      '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;border:1px solid rgba(255,255,255,0.1);color:#f0f0f5"><div style="font-size:24px;flex-shrink:0">&#9989;</div><div>If all 3 features are all same or all different &mdash; <strong style="color:#fff">that\'s a SET!</strong> Cards are removed and replaced.</div></div>' +
      '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 14px;border:1px solid rgba(255,255,255,0.1);color:#f0f0f5"><div style="font-size:24px;flex-shrink:0">&#128161;</div><div>Stuck? Hit <strong style="color:#fff">Hint</strong> (or press <strong style="color:#fff">H</strong>). No SET on board = 3 more cards dealt.</div></div>' +
      '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,208,96,0.07);border-radius:12px;padding:12px 14px;border:1px solid rgba(255,208,96,0.2);color:#f0f0f5"><div style="font-size:24px;flex-shrink:0">&#128293;</div><div>Build a <strong style="color:#ffd060">streak</strong> by finding SETs without any wrong guesses!</div></div>' +
      '</div>'
  }
];


// ---- tutorial logic ----

var overlay      = document.getElementById("overlay");
var slideContent = document.getElementById("slideContent");
var dotsEl       = document.getElementById("dots");
var tutStep      = document.getElementById("tutStep");
var prevBtn      = document.getElementById("prev");
var nextBtn      = document.getElementById("next");
var slideIndex   = 0;

function renderSlide() {
  slideContent.innerHTML   = slides[slideIndex].html;
  tutStep.textContent      = slides[slideIndex].step;
  prevBtn.style.visibility = slideIndex === 0 ? "hidden" : "visible";
  nextBtn.textContent      = slideIndex === slides.length - 1 ? "Done \u2713" : "Next \u25ba";
  dotsEl.innerHTML = slides.map(function(_, i) {
    return '<div class="dot ' + (i === slideIndex ? "on" : "") + '"></div>';
  }).join("");
}

function openTutorial()  { overlay.classList.add("open"); slideIndex = 0; renderSlide(); }
function closeTutorial() { overlay.classList.remove("open"); }

document.getElementById("btnTutorial").onclick     = openTutorial;
document.getElementById("btnCloseTutorial").onclick = closeTutorial;
document.getElementById("btnSkipTutorial").onclick  = closeTutorial;

prevBtn.onclick = function() { if (slideIndex > 0) { slideIndex--; renderSlide(); } };
nextBtn.onclick = function() {
  if (slideIndex >= slides.length - 1) { closeTutorial(); return; }
  slideIndex++; renderSlide();
};
overlay.onclick = function(e) { if (e.target === overlay) closeTutorial(); };


// ---- splash ----

var splash = document.getElementById("splash");
document.getElementById("enterGame").onclick = function() {
  splash.classList.add("hide");
  setTimeout(function() { splash.style.display = "none"; openTutorial(); }, 700);
};


// ---- game state ----

var deck = [], board = [], selected = new Set();
var score = 0, streak = 0, started = false, locked = false;
var startMs = 0, timer = null;

var grid     = document.getElementById("grid");
var msg      = document.getElementById("msg");
var timeEl   = document.getElementById("time");
var scoreEl  = document.getElementById("score");
var leftEl   = document.getElementById("cardsLeft");
var streakEl = document.getElementById("streak");
var setsLeftEl = document.getElementById("setsLeft");


// ---- deck helpers ----

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function makeDeck() {
  var d = [], id = 0;
  COLORS.forEach(function(c) {
    SHAPES.forEach(function(s) {
      NUMBERS.forEach(function(n) {
        d.push({ id: id++, color: c.key, shape: s, number: n });
      });
    });
  });
  return shuffle(d);
}

function allSame(v) { return v[0] === v[1] && v[1] === v[2]; }
function allDiff(v) { return v[0] !== v[1] && v[0] !== v[2] && v[1] !== v[2]; }

function isSet(a, b, c) {
  return (allSame([a.color,b.color,c.color])   || allDiff([a.color,b.color,c.color]))  &&
         (allSame([a.shape,b.shape,c.shape])    || allDiff([a.shape,b.shape,c.shape]))  &&
         (allSame([a.number,b.number,c.number]) || allDiff([a.number,b.number,c.number]));
}

function findSet() {
  for (var i = 0; i < board.length - 2; i++)
    for (var j = i + 1; j < board.length - 1; j++)
      for (var k = j + 1; k < board.length; k++)
        if (isSet(board[i], board[j], board[k]))
          return [board[i].id, board[j].id, board[k].id];
  return null;
}

function countSets() {
  var n = 0;
  for (var i = 0; i < board.length - 2; i++)
    for (var j = i + 1; j < board.length - 1; j++)
      for (var k = j + 1; k < board.length; k++)
        if (isSet(board[i], board[j], board[k])) n++;
  return n;
}

function dealMoreIfNeeded() {
  while (!findSet() && deck.length > 0) {
    board = board.concat(deck.splice(0, 3));
    render();
  }
}


// ---- best time (localStorage) ----

function getBest() {
  try { return parseInt(localStorage.getItem("set_best") || "0", 10); } catch(e) { return 0; }
}
function saveBest(secs) {
  try {
    var prev = getBest();
    if (!prev || secs < prev) localStorage.setItem("set_best", secs);
  } catch(e) {}
}


// ---- streak display ----

function updateStreak() {
  if (!streakEl) return;
  streakEl.textContent = streak;
  streakEl.parentElement.style.opacity = streak > 0 ? "1" : "0.35";
}

function updateSetsLeft() {
  if (!setsLeftEl) return;
  var n = countSets();
  setsLeftEl.textContent = n;
  // subtle colour hint when it's getting low
  setsLeftEl.style.color = n === 0 ? "var(--red)" : n <= 2 ? "var(--gold)" : "";
}


// ---- rendering ----

function cardSVG(c) {
  var col = COLORS.find(function(x) { return x.key === c.color; });
  var out = "";
  for (var i = 0; i < c.number; i++)
    out += '<svg class="shapeSvg" viewBox="0 0 200 60"><path d="' + path(c.shape) + '" fill="' + col.fill + '" stroke="' + col.stroke + '" stroke-width="6"/></svg>';
  return '<div style="display:flex;flex-direction:column;align-items:center;gap:5px">' + out + '</div>';
}

function render(newIds) {
  // newIds = card ids that just arrived (get deal-in animation)
  newIds = newIds || [];
  grid.innerHTML = "";
  board.forEach(function(card, idx) {
    var d = document.createElement("div");
    d.className = "card";
    if (selected.has(card.id)) d.classList.add("selected");
    if (newIds.indexOf(card.id) !== -1) d.classList.add("card-deal");
    // stagger new cards
    if (newIds.indexOf(card.id) !== -1) {
      var pos = newIds.indexOf(card.id);
      d.style.animationDelay = (pos * 0.06) + "s";
    }
    d.innerHTML = cardSVG(card);
    d.onclick = (function(id) { return function() { pick(id); }; })(card.id);
    grid.appendChild(d);
  });
  scoreEl.textContent = score;
  leftEl.textContent  = deck.length + board.length;
  updateStreak();
  updateSetsLeft();
}

function showScorePopup(text) {
  var pop = document.getElementById("scorePopup");
  pop.textContent = text || "\uD83C\uDF89 SET!";
  pop.classList.remove("show");
  void pop.offsetWidth;
  pop.classList.add("show");
}

function flashCards(ids, type) {
  var cards = grid.querySelectorAll(".card");
  board.forEach(function(card, i) {
    if (ids.indexOf(card.id) !== -1) {
      cards[i].classList.add(type);
      setTimeout(function() { cards[i].classList.remove(type); }, 650);
    }
  });
}


// ---- game flow ----

function start() {
  clearInterval(timer);
  deck  = makeDeck();
  board = deck.splice(0, 9);
  selected.clear();
  score   = 0;
  streak  = 0;
  locked  = false;
  started = true;
  startMs = performance.now();

  timer = setInterval(function() {
    var t = Math.floor((performance.now() - startMs) / 1000);
    timeEl.textContent = (Math.floor(t/60)+"").padStart(2,"0") + ":" + (t%60+"").padStart(2,"0");
  }, 500);

  msg.innerHTML = 'Find a <strong>SET</strong> &mdash; select 3 cards!';

  // deal animation for all opening cards
  var allIds = board.map(function(c) { return c.id; });
  render(allIds);
  dealMoreIfNeeded();
}

function pick(id) {
  if (!started || locked) return;

  if (selected.has(id)) {
    selected.delete(id);
  } else if (selected.size < 3) {
    selected.add(id);
  }
  render();

  if (selected.size !== 3) return;

  var arr  = Array.from(selected);
  var a    = board.find(function(x) { return x.id === arr[0]; });
  var b    = board.find(function(x) { return x.id === arr[1]; });
  var c    = board.find(function(x) { return x.id === arr[2]; });
  var selIds = arr.slice();

  if (isSet(a, b, c)) {
    score++;
    streak++;

    var popText = streak >= 5 ? "\uD83D\uDD25 x" + streak + " STREAK!" :
                  streak >= 3 ? "\u26A1 SET! x" + streak :
                  "\uD83C\uDF89 SET!";
    showScorePopup(popText);

    msg.innerHTML = streak >= 3
      ? '\uD83D\uDD25 <strong>' + streak + '-SET streak!</strong> Keep it up!'
      : '\uD83C\uDF89 <strong>SET!</strong> Nice one!';

    flashCards(selIds, "correct-flash");

    // lock input briefly while cards animate out
    locked = true;
    setTimeout(function() {
      board = board.filter(function(x) { return selIds.indexOf(x.id) === -1; });

      var newCards = [];
      if (board.length < 9 && deck.length > 0) {
        var fresh = deck.splice(0, 3);
        board = board.concat(fresh);
        newCards = fresh.map(function(c) { return c.id; });
      }

      selected.clear();
      locked = false;
      render(newCards);

      if (deck.length === 0 && !findSet()) { endGame(); return; }

      if (!findSet() && deck.length > 0) {
        msg.innerHTML = 'No SET on the board &mdash; dealing 3 more cards.';
        var extra = deck.splice(0, 3);
        board = board.concat(extra);
        render(extra.map(function(c) { return c.id; }));
        if (deck.length === 0 && !findSet()) { endGame(); return; }
      }
    }, 500);

  } else {
    // wrong guess — shake, break streak, brief lockout
    streak = 0;
    flashCards(selIds, "wrong-flash");
    msg.innerHTML = '\u274C Not a SET &mdash; check each feature again.';
    locked = true;
    setTimeout(function() {
      selected.clear();
      locked = false;
      render();
    }, 800);
  }
}

function getRating(secs, s) {
  // crude rating based on speed and score
  if (s >= 9 && secs < 120) return { label: "Genius", emoji: "\uD83E\uDD29" };
  if (s >= 7 && secs < 180) return { label: "Sharp",  emoji: "\u26A1"       };
  if (s >= 5)                return { label: "Good",   emoji: "\uD83D\uDC4D" };
  return                            { label: "Keep practising", emoji: "\uD83D\uDCDA" };
}

function endGame() {
  started = false;
  clearInterval(timer);

  var t    = Math.floor((performance.now() - startMs) / 1000);
  var best = getBest();
  saveBest(t);
  var newBest = (!best || t < best);

  var rating = getRating(t, score);

  document.getElementById("goScore").textContent = score;
  document.getElementById("goTime").textContent  = timeEl.textContent;
  document.getElementById("goStreak").textContent = streak;
  document.getElementById("goRating").textContent = rating.emoji + " " + rating.label;

  var bestEl = document.getElementById("goBest");
  if (bestEl) {
    var prevBest = newBest ? best : null;
    if (newBest && prevBest) {
      bestEl.textContent = "New best! Was " + Math.floor(prevBest/60).toString().padStart(2,"0") + ":" + (prevBest%60).toString().padStart(2,"0");
      bestEl.style.color = "var(--teal)";
    } else if (best) {
      bestEl.textContent = "Best: " + Math.floor(best/60).toString().padStart(2,"0") + ":" + (best%60).toString().padStart(2,"0");
      bestEl.style.color = "";
    } else {
      bestEl.textContent = "First game!";
      bestEl.style.color = "var(--teal)";
    }
  }

  document.getElementById("gameoverOverlay").classList.add("open");
}

document.getElementById("btnNew").onclick = start;
document.getElementById("btnEnd").onclick = function() {
  if (started) endGame();
  else msg.innerHTML = 'Start a <strong>New Game</strong> first!';
};
document.getElementById("goPlayAgain").onclick = function() {
  document.getElementById("gameoverOverlay").classList.remove("open");
  start();
};


// ---- hint button ----

var hintTimeouts = [];
document.getElementById("btnHint").onclick = function() {
  if (!started) return;
  hintTimeouts.forEach(clearTimeout);
  hintTimeouts = [];
  grid.querySelectorAll(".card").forEach(function(c) { c.classList.remove("hint-highlight"); });

  var set = findSet();
  if (set) {
    var cards = grid.querySelectorAll(".card");
    board.forEach(function(card, i) {
      if (set.indexOf(card.id) !== -1) {
        cards[i].classList.add("hint-highlight");
        var t = setTimeout(function() { cards[i].classList.remove("hint-highlight"); }, 3200);
        hintTimeouts.push(t);
      }
    });
    msg.innerHTML = '\uD83D\uDCA1 <strong>Hint:</strong> three cards are highlighted &mdash; that\'s a valid SET!';
  } else if (deck.length > 0) {
    msg.innerHTML = 'No SET on the board &mdash; dealing 3 more cards.';
    var extra = deck.splice(0, 3);
    board = board.concat(extra);
    render(extra.map(function(c) { return c.id; }));
    if (deck.length === 0 && !findSet()) setTimeout(endGame, 1000);
  } else {
    msg.innerHTML = 'No more SETs. Game over!';
    setTimeout(endGame, 1000);
  }
};


// ---- keyboard shortcuts ----

document.addEventListener("keydown", function(e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "h" || e.key === "H") document.getElementById("btnHint").click();
  if (e.key === "n" || e.key === "N") {
    if (!started) start();
  }
});

})();
