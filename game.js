const SIZE = 8;
const DOG_TYPES = 4;
const GAME_SECONDS = 180;
const DRAG_THRESHOLD = 22;

const DOGS = [
  { name: "笑脸狗", src: "assets/dog_01_happy_shiba.png", alt: "笑脸狗头" },
  { name: "严肃狗", src: "assets/dog_02_calm_shiba.png", alt: "严肃狗头" },
  { name: "诗仙狗", src: "assets/dog_03_fluffy_worried.png", alt: "长毛狗头" },
  { name: "皱脸狗", src: "assets/dog_04_chow_droopy.png", alt: "皱脸狗头" }
];

const POEMS = [
  "两岸狗声啼不住",
  "春眠不觉晓，狗头处处消",
  "飞流直下三千尺，疑是狗头落九天",
  "举头望明月，低头消狗头",
  "床前明月光，疑是狗头霜",
  "白日依山尽，狗头入海流",
  "欲穷千里目，更消一层狗",
  "会当凌绝顶，一览众狗小",
  "大漠孤烟直，狗头落日圆",
  "孤帆远影碧空尽，唯见狗头天际流",
  "桃花潭水深千尺，不及狗头送我情",
  "黄河之水天上来，狗头奔流到海回",
  "不识庐山真面目，只因狗头在此盘",
  "山重水复疑无路，柳暗花明又一狗",
  "小荷才露尖尖角，早有狗头立上头",
  "接天莲叶无穷碧，映日狗头别样红",
  "千山鸟飞绝，万径狗头灭",
  "柴门闻犬吠，风雪夜消狗",
  "窗含西岭千秋雪，门泊东吴万狗船",
  "远望狗头挂前川",
  "天生我材必有用，千金散尽狗还来",
  "长风破浪会有时，直挂狗头济沧海",
  "人生得意须尽欢，莫使狗头空对月",
  "安得广厦千万间，大庇天下狗头欢",
  "洛阳亲友如相问，一片狗头在玉壶",
  "采菊东篱下，悠然见狗头",
  "停车坐爱枫林晚，霜叶红于狗头花",
  "莫愁前路无知己，天下谁人不识狗",
  "爆竹声中一岁除，春风送暖入狗头",
  "但愿人长久，千里共狗头",
  "明月几时有，把狗问青天",
  "海上生明月，天涯共狗头",
  "葡萄美酒夜光杯，欲饮狗头马上催",
  "醉卧沙场君莫笑，古来狗头几人回",
  "儿童相见不相识，笑问狗头哪里来",
  "问君能有几多愁，恰似一盘狗头流",
  "春风又绿江南岸，狗头何时照我还",
  "等闲识得东风面，万紫千红总是狗",
  "黑云翻墨未遮山，白雨跳珠乱入狗",
  "野火烧不尽，春风吹又狗",
  "离离原上草，一岁一狗头",
  "谁知盘中餐，粒粒皆狗头",
  "锄禾日当午，汗滴狗头土",
  "不敢高声语，恐惊天上狗",
  "危楼高百尺，手可摘狗头",
  "竹外桃花三两枝，春江水暖狗先知",
  "无边落木萧萧下，不尽狗头滚滚来",
  "沉舟侧畔千帆过，病树前头万狗春",
  "月落乌啼霜满天，江枫渔火对狗眠",
  "姑苏城外寒山寺，夜半狗声到客船"
];

const SHORT_POEMS = [
  "两岸狗声啼不住",
  "狗头处处消",
  "疑是狗头落九天",
  "低头消狗头",
  "更消一层狗",
  "一览众狗小",
  "春风吹又狗"
];

const SPECIAL_POEMS = {
  row: "诗爪一挥，整行狗头入诗",
  col: "诗爪直落，整列狗头飞起",
  bone: "诗骨一出，同款狗头全拜服",
  stamp: "狗头诗印盖下，九宫格皆成诗",
  toolClaw: "诗爪开卷，一行狗头齐飞",
  toolBone: "诗骨点名，同款狗头集合",
  toolStamp: "狗头诗印落下，周围全都押韵"
};

const RATINGS = [
  { min: 18000, title: "四狗齐飞上青天", poem: "飞流直下三千尺，疑是狗头落九天" },
  { min: 11000, title: "狗头诗仙降临", poem: "无边落木萧萧下，不尽狗头滚滚来" },
  { min: 5200, title: "狗头小有诗意", poem: "春眠不觉晓，狗头处处消" },
  { min: 0, title: "狗头初入诗坛", poem: "举头望明月，低头消狗头" }
];

const SPECIAL_LABEL = { row: "爪", col: "爪", bone: "骨", stamp: "印" };

const state = {
  board: [],
  nextId: 1,
  selected: null,
  pointerStart: null,
  busy: false,
  running: false,
  timerId: null,
  timeLeft: GAME_SECONDS,
  score: 0,
  combo: 1,
  maxCombo: 0,
  cleared: 0,
  tool: null,
  toolCounts: { claw: 2, bone: 1, stamp: 1 },
  toastTimer: null
};

const els = {
  app: document.getElementById("app"),
  board: document.getElementById("board"),
  fxLayer: document.getElementById("fxLayer"),
  timeText: document.getElementById("timeText"),
  scoreText: document.getElementById("scoreText"),
  comboText: document.getElementById("comboText"),
  poemToast: document.getElementById("poemToast"),
  startScreen: document.getElementById("startScreen"),
  resultScreen: document.getElementById("resultScreen"),
  startBtn: document.getElementById("startBtn"),
  restartBtn: document.getElementById("restartBtn"),
  startDogs: document.getElementById("startDogs"),
  resultDogs: document.getElementById("resultDogs"),
  startQuote: document.getElementById("startQuote"),
  finalScore: document.getElementById("finalScore"),
  finalCombo: document.getElementById("finalCombo"),
  finalCleared: document.getElementById("finalCleared"),
  ratingText: document.getElementById("ratingText"),
  resultPoem: document.getElementById("resultPoem"),
  clawCount: document.getElementById("clawCount"),
  boneCount: document.getElementById("boneCount"),
  stampCount: document.getElementById("stampCount")
};

init();

function init() {
  renderDogRows();
  els.startQuote.textContent = randomFrom(POEMS);
  createBoard();
  renderBoard();
  updateHud();
  bindEvents();
}

function bindEvents() {
  els.startBtn.addEventListener("click", startGame);
  els.restartBtn.addEventListener("click", startGame);

  els.board.addEventListener("pointerdown", (event) => {
    if (!state.running || state.busy) return;
    const cell = event.target.closest(".cell");
    if (!cell) return;
    state.pointerStart = {
      r: Number(cell.dataset.r),
      c: Number(cell.dataset.c),
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId
    };
    els.board.setPointerCapture?.(event.pointerId);
  });

  els.board.addEventListener("pointerup", (event) => {
    if (!state.running || state.busy || !state.pointerStart) return;
    const start = state.pointerStart;
    state.pointerStart = null;
    els.board.releasePointerCapture?.(start.pointerId);
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));
    if (dist >= DRAG_THRESHOLD && !state.tool) {
      const target = swipeTarget(start.r, start.c, dx, dy);
      if (target) trySwap({ r: start.r, c: start.c }, target);
      return;
    }
    handleTap({ r: start.r, c: start.c });
  });

  els.board.addEventListener("pointercancel", () => {
    state.pointerStart = null;
  });

  document.querySelectorAll(".tool-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.running || state.busy) return;
      const tool = button.dataset.tool;
      if (state.toolCounts[tool] <= 0) {
        button.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }],
          { duration: 230, easing: "ease-out" }
        );
        return;
      }
      state.tool = state.tool === tool ? null : tool;
      state.selected = null;
      updateTools();
      renderBoard();
    });
  });
}

function renderDogRows() {
  const html = DOGS.map((dog) => `<div class="dog-avatar"><img src="${dog.src}" alt="${dog.alt}" /></div>`).join("");
  els.startDogs.innerHTML = html;
  els.resultDogs.innerHTML = html;
}

function startGame() {
  clearInterval(state.timerId);
  Object.assign(state, {
    selected: null,
    pointerStart: null,
    busy: false,
    running: true,
    timeLeft: GAME_SECONDS,
    score: 0,
    combo: 1,
    maxCombo: 0,
    cleared: 0,
    tool: null,
    toolCounts: { claw: 2, bone: 1, stamp: 1 }
  });
  els.startScreen.classList.remove("is-active");
  els.resultScreen.classList.remove("is-active");
  els.app.classList.remove("urgent", "combo-flare");
  els.timeText.classList.remove("is-danger");
  createBoard();
  renderBoard({ bornAll: true });
  updateHud();
  updateTools();
  showPoem("狗头大考开卷，先消三只再说", true);
  state.timerId = setInterval(tick, 1000);
}

function tick() {
  if (!state.running) return;
  state.timeLeft -= 1;
  if (state.timeLeft <= 10) {
    els.app.classList.add("urgent");
    els.timeText.classList.add("is-danger");
  }
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    updateHud();
    finishGame();
    return;
  }
  updateHud();
}

function finishGame() {
  if (!state.running) return;
  state.running = false;
  state.busy = false;
  clearInterval(state.timerId);
  state.selected = null;
  state.tool = null;
  updateTools();
  const rating = RATINGS.find((item) => state.score >= item.min) || RATINGS[RATINGS.length - 1];
  els.finalScore.textContent = String(state.score);
  els.finalCombo.textContent = String(state.maxCombo);
  els.finalCleared.textContent = String(state.cleared);
  els.ratingText.textContent = rating.title;
  els.resultPoem.textContent = rating.poem;
  els.resultScreen.classList.add("is-active");
}

function createBoard() {
  let attempts = 0;
  do {
    state.board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    for (let r = 0; r < SIZE; r += 1) {
      for (let c = 0; c < SIZE; c += 1) {
        const choices = [0, 1, 2, 3].filter((type) => !wouldRun(r, c, type));
        state.board[r][c] = makeTile(randomFrom(choices.length ? choices : [0, 1, 2, 3]));
      }
    }
    attempts += 1;
  } while (!hasPossibleMove() && attempts < 300);

  if (!hasPossibleMove()) seedMove();
}

function makeTile(type = rand(DOG_TYPES), special = null, fresh = false) {
  return { id: state.nextId++, type, special, fresh };
}

function wouldRun(r, c, type) {
  const left1 = c > 0 ? state.board[r][c - 1] : null;
  const left2 = c > 1 ? state.board[r][c - 2] : null;
  const up1 = r > 0 ? state.board[r - 1][c] : null;
  const up2 = r > 1 ? state.board[r - 2][c] : null;
  return (left1 && left2 && left1.type === type && left2.type === type) || (up1 && up2 && up1.type === type && up2.type === type);
}

function seedMove() {
  state.board[0][0] = makeTile(0);
  state.board[0][1] = makeTile(1);
  state.board[0][2] = makeTile(0);
  state.board[1][1] = makeTile(0);
}

function renderBoard(options = {}) {
  const swapKeys = options.swapKeys || new Set();
  const html = [];
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const tile = state.board[r][c];
      const selected = state.selected && state.selected.r === r && state.selected.c === c;
      const cellClasses = ["cell"];
      if (selected) cellClasses.push("selected");
      if (state.tool) cellClasses.push("tool-target");
      html.push(`<div class="${cellClasses.join(" ")}" data-r="${r}" data-c="${c}">`);
      if (tile) {
        const tileClasses = ["tile"];
        if (selected) tileClasses.push("selected");
        if (swapKeys.has(key(r, c))) tileClasses.push("swap");
        if (tile.fresh || options.bornAll) tileClasses.push("born");
        const special = tile.special ? ` data-special="${tile.special}"` : "";
        html.push(`<div class="${tileClasses.join(" ")}"${special} data-r="${r}" data-c="${c}">
          <img src="${DOGS[tile.type].src}" alt="${DOGS[tile.type].alt}" draggable="false" />
          ${tile.special ? `<span class="badge">${SPECIAL_LABEL[tile.special]}</span>` : ""}
        </div>`);
      }
      html.push("</div>");
    }
  }
  els.board.innerHTML = html.join("");
  requestAnimationFrame(() => {
    for (const row of state.board) for (const tile of row) if (tile) tile.fresh = false;
  });
}

function updateHud() {
  els.timeText.textContent = formatTime(state.timeLeft);
  els.scoreText.textContent = String(state.score);
  els.comboText.textContent = `x${Math.max(1, state.combo)}`;
  els.clawCount.textContent = String(state.toolCounts.claw);
  els.boneCount.textContent = String(state.toolCounts.bone);
  els.stampCount.textContent = String(state.toolCounts.stamp);
}

function updateTools() {
  document.querySelectorAll(".tool-btn").forEach((button) => {
    const tool = button.dataset.tool;
    button.classList.toggle("active", state.tool === tool);
    button.classList.toggle("empty", state.toolCounts[tool] <= 0);
  });
  updateHud();
}

function handleTap(cell) {
  if (state.tool) {
    useTool(cell);
    return;
  }
  if (!state.selected) {
    state.selected = cell;
    renderBoard();
    return;
  }
  if (same(state.selected, cell)) {
    state.selected = null;
    renderBoard();
    return;
  }
  if (adjacent(state.selected, cell)) {
    const from = state.selected;
    state.selected = null;
    trySwap(from, cell);
    return;
  }
  state.selected = cell;
  renderBoard();
}

async function trySwap(a, b) {
  if (state.busy || !state.running || !adjacent(a, b)) return;
  state.busy = true;
  state.combo = 1;
  const tileA = at(a);
  const tileB = at(b);
  swap(a, b);
  renderBoard({ swapKeys: new Set([key(a.r, a.c), key(b.r, b.c)]) });
  await wait(170);

  if (tileA.special || tileB.special) {
    let clearSet = new Set([key(a.r, a.c), key(b.r, b.c)]);
    if (tileA.special) clearSet = union(clearSet, cellsForSpecial(b.r, b.c, tileA.special, tileB.type));
    if (tileB.special) clearSet = union(clearSet, cellsForSpecial(a.r, a.c, tileB.special, tileA.type));
    await clearCells(clearSet, 1, randomFrom([SPECIAL_POEMS[tileA.special], SPECIAL_POEMS[tileB.special], randomFrom(POEMS)].filter(Boolean)));
    await resolveCascade(2);
    endMove();
    return;
  }

  if (!findMatches().groups.length) {
    swap(a, b);
    renderBoard();
    showPoem("山重水复疑无路，换个狗头试试");
    state.busy = false;
    return;
  }

  await resolveCascade(1, [a, b]);
  endMove();
}

function endMove() {
  if (!findMatches().groups.length && !hasPossibleMove()) {
    createBoard();
    renderBoard({ bornAll: true });
    showPoem("棋盘重排，柳暗花明又一狗", true);
  }
  state.combo = 1;
  state.busy = false;
  updateHud();
}

async function useTool(cell) {
  if (state.busy || !state.running || !state.tool || state.toolCounts[state.tool] <= 0) return;
  const tile = at(cell);
  if (!tile) return;
  state.busy = true;
  const tool = state.tool;
  state.toolCounts[tool] -= 1;
  state.tool = null;
  state.selected = null;
  updateTools();
  let clearSet;
  let poem;
  if (tool === "claw") {
    clearSet = cellsInRow(cell.r);
    poem = SPECIAL_POEMS.toolClaw;
  } else if (tool === "bone") {
    clearSet = cellsOfType(tile.type);
    poem = SPECIAL_POEMS.toolBone;
  } else {
    clearSet = cellsAround(cell.r, cell.c, 1);
    poem = SPECIAL_POEMS.toolStamp;
  }
  await clearCells(clearSet, 1, poem);
  await resolveCascade(2);
  endMove();
}

async function resolveCascade(startCombo = 1, origin = []) {
  let combo = startCombo;
  while (state.running) {
    const matches = findMatches();
    if (!matches.groups.length) break;
    const plans = specialPlans(matches.groups, matches.map, origin);
    let clearSet = cellsFromGroups(matches.groups);
    for (const plan of plans) clearSet.delete(key(plan.r, plan.c));
    clearSet = expandSpecials(clearSet);
    for (const plan of plans) clearSet.delete(key(plan.r, plan.c));
    await animateClear(clearSet, combo);
    addScore(clearSet.size, combo, plans.length);
    removeCells(clearSet);
    placeSpecials(plans);
    showCascadePoem(combo, plans);
    await wait(90);
    collapse();
    renderBoard();
    await wait(220);
    combo += 1;
    origin = [];
  }
}

function specialPlans(groups, matchMap, origin) {
  const plans = [];
  const used = new Set();
  const occupied = new Set();

  for (const [cellKey, entry] of matchMap.entries()) {
    const dirs = new Set(entry.groups.map((group) => group.dir));
    if (dirs.has("h") && dirs.has("v")) {
      const cell = parseKey(cellKey);
      add({ ...cell, type: entry.type, special: "stamp" });
      entry.groups.forEach((group) => used.add(group.id));
    }
  }

  for (const group of groups) {
    if (used.has(group.id)) continue;
    if (group.cells.length >= 5) {
      const cell = pickPlanCell(group, origin);
      add({ ...cell, type: group.type, special: "bone" });
    } else if (group.cells.length === 4) {
      const cell = pickPlanCell(group, origin);
      add({ ...cell, type: group.type, special: group.dir === "h" ? "row" : "col" });
    }
  }
  return plans;

  function add(plan) {
    const id = key(plan.r, plan.c);
    if (!occupied.has(id)) {
      occupied.add(id);
      plans.push(plan);
    }
  }
}

function pickPlanCell(group, origin) {
  return origin.find((cell) => group.cells.some((item) => same(item, cell))) || group.cells[Math.floor(group.cells.length / 2)];
}

function placeSpecials(plans) {
  for (const plan of plans) {
    state.board[plan.r][plan.c] = makeTile(plan.type, plan.special, true);
  }
}

async function clearCells(clearSet, combo, poem) {
  const expanded = expandSpecials(clearSet);
  await animateClear(expanded, combo);
  addScore(expanded.size, combo, 0);
  removeCells(expanded);
  showPoem(poem || randomFrom(POEMS), true);
  await wait(90);
  collapse();
  renderBoard();
  await wait(220);
}

async function animateClear(clearSet, combo) {
  state.combo = combo;
  state.maxCombo = Math.max(state.maxCombo, combo);
  updateHud();
  if (combo >= 3) flare();
  for (const item of clearSet) {
    const cell = parseKey(item);
    const tile = els.board.querySelector(`.tile[data-r="${cell.r}"][data-c="${cell.c}"]`);
    if (tile) tile.classList.add("clear");
    burst(cell.r, cell.c, combo >= 3);
  }
  await wait(250);
}

function addScore(count, combo, bonusSpecials) {
  state.score += (count * 40 + bonusSpecials * 120) * Math.max(1, combo);
  state.cleared += count;
  updateHud();
}

function showCascadePoem(combo, plans) {
  if (plans.length) {
    showPoem(SPECIAL_POEMS[plans[0].special] || randomFrom(POEMS), true);
  } else if (combo >= 5) {
    showPoem(randomFrom(POEMS), true);
  } else if (combo >= 2 || Math.random() < 0.35) {
    showPoem(randomFrom(SHORT_POEMS), combo >= 3);
  }
}

function findMatches(board = state.board) {
  const groups = [];
  const map = new Map();
  let id = 1;

  for (let r = 0; r < SIZE; r += 1) {
    let c = 0;
    while (c < SIZE) {
      const tile = board[r][c];
      if (!tile) {
        c += 1;
        continue;
      }
      const start = c;
      const type = tile.type;
      while (c < SIZE && board[r][c] && board[r][c].type === type) c += 1;
      if (c - start >= 3) groups.push({ id: id++, dir: "h", type, cells: range(start, c).map((col) => ({ r, c: col })) });
    }
  }

  for (let c = 0; c < SIZE; c += 1) {
    let r = 0;
    while (r < SIZE) {
      const tile = board[r][c];
      if (!tile) {
        r += 1;
        continue;
      }
      const start = r;
      const type = tile.type;
      while (r < SIZE && board[r][c] && board[r][c].type === type) r += 1;
      if (r - start >= 3) groups.push({ id: id++, dir: "v", type, cells: range(start, r).map((row) => ({ r: row, c })) });
    }
  }

  for (const group of groups) {
    for (const cell of group.cells) {
      const cellKey = key(cell.r, cell.c);
      if (!map.has(cellKey)) map.set(cellKey, { type: group.type, groups: [] });
      map.get(cellKey).groups.push(group);
    }
  }
  return { groups, map };
}

function cellsFromGroups(groups) {
  const set = new Set();
  for (const group of groups) for (const cell of group.cells) set.add(key(cell.r, cell.c));
  return set;
}

function expandSpecials(clearSet) {
  const set = new Set(clearSet);
  const queue = [...set];
  const seen = new Set();
  while (queue.length) {
    const item = queue.shift();
    if (seen.has(item)) continue;
    seen.add(item);
    const cell = parseKey(item);
    const tile = at(cell);
    if (!tile || !tile.special) continue;
    for (const extra of cellsForSpecial(cell.r, cell.c, tile.special, tile.type)) {
      if (!set.has(extra)) {
        set.add(extra);
        queue.push(extra);
      }
    }
  }
  return set;
}

function cellsForSpecial(r, c, special, type) {
  if (special === "row") return cellsInRow(r);
  if (special === "col") return cellsInCol(c);
  if (special === "bone") return cellsOfType(type);
  return cellsAround(r, c, 1);
}

function removeCells(clearSet) {
  for (const item of clearSet) {
    const cell = parseKey(item);
    if (inBounds(cell.r, cell.c)) state.board[cell.r][cell.c] = null;
  }
}

function collapse() {
  for (let c = 0; c < SIZE; c += 1) {
    let write = SIZE - 1;
    for (let r = SIZE - 1; r >= 0; r -= 1) {
      const tile = state.board[r][c];
      if (tile) {
        state.board[write][c] = tile;
        if (write !== r) tile.fresh = true;
        write -= 1;
      }
    }
    for (let r = write; r >= 0; r -= 1) state.board[r][c] = makeTile(rand(DOG_TYPES), null, true);
  }
}

function hasPossibleMove() {
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const a = { r, c };
      const right = { r, c: c + 1 };
      const down = { r: r + 1, c };
      if (inBounds(right.r, right.c) && createsMatch(a, right)) return true;
      if (inBounds(down.r, down.c) && createsMatch(a, down)) return true;
    }
  }
  return false;
}

function createsMatch(a, b) {
  swap(a, b);
  const ok = findMatches().groups.length > 0;
  swap(a, b);
  return ok;
}

function cellsInRow(r) {
  return new Set(range(0, SIZE).map((c) => key(r, c)));
}

function cellsInCol(c) {
  return new Set(range(0, SIZE).map((r) => key(r, c)));
}

function cellsAround(r, c, radius) {
  const set = new Set();
  for (let row = r - radius; row <= r + radius; row += 1) {
    for (let col = c - radius; col <= c + radius; col += 1) {
      if (inBounds(row, col)) set.add(key(row, col));
    }
  }
  return set;
}

function cellsOfType(type) {
  const set = new Set();
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const tile = state.board[r][c];
      if (tile && tile.type === type) set.add(key(r, c));
    }
  }
  return set;
}

function showPoem(text, hot = false) {
  clearTimeout(state.toastTimer);
  els.poemToast.textContent = text;
  els.poemToast.classList.toggle("hot", hot);
  els.poemToast.classList.add("show");
  state.toastTimer = setTimeout(() => els.poemToast.classList.remove("show", "hot"), 1500);
}

function burst(r, c, hot) {
  const cell = els.board.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
  if (!cell) return;
  const boardRect = els.board.getBoundingClientRect();
  const rect = cell.getBoundingClientRect();
  const x = rect.left - boardRect.left + rect.width / 2;
  const y = rect.top - boardRect.top + rect.height / 2;
  const words = hot ? ["诗", "爪", "狗", "墨", "飞"] : ["消", "狗", "墨", "诗"];
  for (let i = 0; i < 4; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = randomFrom(words);
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${randBetween(-34, 34)}px`);
    particle.style.setProperty("--dy", `${randBetween(-42, -14)}px`);
    particle.style.setProperty("--rot", `${randBetween(-40, 40)}deg`);
    particle.style.setProperty("--size", `${randBetween(12, hot ? 22 : 18)}px`);
    particle.style.setProperty("--color", hot ? "#d69a24" : randomFrom(["#a72b22", "#2d5b4f", "#4d3a28"]));
    els.fxLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 720);
  }
}

function flare() {
  els.app.classList.add("combo-flare");
  setTimeout(() => els.app.classList.remove("combo-flare"), 240);
}

function swipeTarget(r, c, dx, dy) {
  if (Math.abs(dx) > Math.abs(dy)) {
    const next = { r, c: c + (dx > 0 ? 1 : -1) };
    return inBounds(next.r, next.c) ? next : null;
  }
  const next = { r: r + (dy > 0 ? 1 : -1), c };
  return inBounds(next.r, next.c) ? next : null;
}

function at(cell) {
  return inBounds(cell.r, cell.c) ? state.board[cell.r][cell.c] : null;
}

function swap(a, b) {
  const temp = state.board[a.r][a.c];
  state.board[a.r][a.c] = state.board[b.r][b.c];
  state.board[b.r][b.c] = temp;
}

function same(a, b) {
  return a && b && a.r === b.r && a.c === b.c;
}

function adjacent(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;
}

function inBounds(r, c) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function key(r, c) {
  return `${r},${c}`;
}

function parseKey(item) {
  const [r, c] = item.split(",").map(Number);
  return { r, c };
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function randomFrom(items) {
  return items[rand(items.length)];
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(start, end) {
  return Array.from({ length: end - start }, (_, index) => start + index);
}

function union(a, b) {
  const set = new Set(a);
  for (const item of b) set.add(item);
  return set;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
