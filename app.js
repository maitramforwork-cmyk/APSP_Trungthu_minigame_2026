/*
  HOẠ ĐÈN ĐÓN TRĂNG
  ------------------------------------------------
  One-line connect-the-dots:
  - Dots are intentionally NOT numbered.
  - Player may start from any dot.
  - One continuous pointer/touch stroke must visit every dot.
  - Releasing the pointer before all dots are visited ends the attempt.
  - Dot detection uses the full movement segment, so fast pointer moves do not skip dots.
  - Each level's points are stored as editable [x, y] percentages.
*/

const LEVELS = [
  {
    id: 1,
    title: "Mái Nhà Trăng Sáng",
    subtitle: "5 chấm tạo thành hình ngôi nhà. Hãy tìm một đường đi duy nhất và đi qua đủ cả 5 chấm.",
    difficulty: "DỄ",
    sourceImage: "assets/level-1-house.png",
    points: [
      [47.68, 6.42],
      [14.90, 36.40],
      [80.39, 36.42],
      [14.93, 86.63],
      [80.39, 86.60]
    ]
  },
  {
    id: 2,
    title: "Khối Đèn Lồng",
    subtitle: "7 chấm tạo thành một khối hình không gian. Chỉ một nét liên tục, không nhấc tay.",
    difficulty: "TRUNG BÌNH",
    sourceImage: "assets/level-2-cube.png",
    points: [
      [33.98, 13.45],
      [86.57, 13.52],
      [7.85, 38.82],
      [60.26, 38.83],
      [86.56, 64.01],
      [7.89, 89.40],
      [60.27, 89.42]
    ]
  },
  {
    id: 3,
    title: "Bậc Thềm Ánh Trăng",
    subtitle: "11 chấm theo hình bậc thang. Hệ thống tự căn đường thành các đoạn thẳng gọn và đẹp.",
    difficulty: "KHÓ",
    sourceImage: "assets/level-3-stairs.png",
    points: [
      [18.48, 12.21],
      [40.44, 12.20],
      [18.50, 40.43],
      [40.43, 40.45],
      [62.30, 40.47],
      [40.42, 68.78],
      [62.28, 68.76],
      [84.09, 68.78],
      [18.49, 87.57],
      [62.28, 87.57],
      [84.10, 87.53]
    ]
  }
];

const PRINCIPLES = [
  "Luôn tò mò, tư duy phản biện",
  "Khuyến khích và ghi nhận duy trì cải tiến",
  "Có 1% mới có 100%",
  "Làm gương",
  "Kỷ luật",
  "Bao dung, chia sẻ, hướng đến mục đích chung",
  "Ghi nhận tích cực",
  "Giải quyết vấn đề một cách xây dựng",
  "Giao tiếp rõ ràng và mạch lạc",
  "Giữ thái độ tích cực",
  "Nói đúng lời - giữ đúng hẹn",
  "Cam kết chia sẻ thông tin minh bạch",
  "Vấn đề đi kèm giải pháp",
  "Bảo vệ mục tiêu chung",
  "Minh bạch trong công việc",
  "Nghĩ đúng - nói đúng - làm đúng"
];

const FORTUNES = {
  "Sự nghiệp": [
    "Đường công danh của bạn đang mở ra nhiều cơ hội mới. Hãy giữ tinh thần «{principle}», để mỗi bước tiến đều có giá trị bền vững.",
    "Một dự định quan trọng có tín hiệu sáng. Khi gặp việc khó, hãy nhớ «{principle}» — biến điều cần xử lý thành cơ hội tạo giá trị.",
    "Quý nhân dễ xuất hiện qua một cuộc trò chuyện hoặc một dự án. Giữ «{principle}» trong cách làm việc để niềm tin được nuôi lớn."
  ],
  "Gia đình": [
    "Không khí gia đình thêm ấm áp khi mọi người cùng «{principle}». Một lời nói rõ ràng và chân thành hôm nay có thể hóa giải nhiều hiểu lầm.",
    "Nhà là nơi tích lũy phúc lành. Hãy thực hành «{principle}» bằng một hành động nhỏ và đều đặn — sự bền bỉ sẽ tạo thay đổi lớn.",
    "Năm nay dễ có dịp sum vầy đáng nhớ. Khi bất đồng xuất hiện, «{principle}» sẽ giúp mọi người trở về với mục đích chung."
  ],
  "Tình cảm": [
    "Duyên lành đến từ sự chân thành. Hãy «{principle}» trong cách lắng nghe và hồi đáp, để tình cảm có thêm không gian phát triển.",
    "Một mối quan hệ sẽ ấm hơn khi mỗi người biết «{principle}». Điều nhỏ được làm đúng lúc đôi khi quý hơn lời hứa lớn.",
    "Trăng sáng soi lòng, duyên cũng sáng hơn khi bạn «{principle}». Chậm lại một chút để hiểu nhau nhiều hơn."
  ],
  "Tiền bạc": [
    "Tài lộc có tín hiệu tích cực nếu bạn đi từng bước chắc chắn. Hãy «{principle}» trước mỗi quyết định tài chính để giảm rủi ro và tăng giá trị.",
    "Một cơ hội gia tăng nguồn thu có thể đến từ việc cải tiến cách làm. Nhớ rằng «{principle}» — tích lũy nhỏ tạo thành kết quả lớn.",
    "Giữ dòng tiền rõ ràng và minh bạch. «{principle}» sẽ là chiếc la bàn tốt khi bạn cân nhắc một khoản chi hay đầu tư."
  ]
};

const CATEGORIES = [
  { name: "Sự nghiệp", icon: "☼", desc: "Công việc · Cơ hội · Phát triển" },
  { name: "Gia đình", icon: "⌂", desc: "Gắn kết · Bình an · Sum vầy" },
  { name: "Tình cảm", icon: "♡", desc: "Duyên lành · Thấu hiểu · Ấm áp" },
  { name: "Tiền bạc", icon: "◈", desc: "Tài lộc · Tích lũy · Cân bằng" }
];

const state = {
  screen: "welcome",
  level: 0,
  visited: new Set(),
  trail: [],
  drawing: false,
  activePointerId: null,
  pointer: { x: 0, y: 0 },
  fortune: null,
  completed: false
};

const els = {
  screen: document.getElementById("screen"),
  progress: document.getElementById("progress"),
  toast: document.getElementById("toast"),
  confetti: document.getElementById("confetti-layer"),
  cursor: document.getElementById("cursor-star")
};

function renderProgress() {
  const step = state.screen === "welcome" ? 0 : state.screen === "fortune" ? 4 : state.level + 1;
  const total = 4;
  els.progress.innerHTML = Array.from({ length: total }, (_, i) => {
    const n = i + 1;
    const done = step > n;
    const active = step === n;
    return `<span class="progress-dot ${done ? "done" : ""} ${active ? "active" : ""}" title="Bước ${n}"></span>`;
  }).join("");
}

function render() {
  renderProgress();
  if (state.screen === "welcome") renderWelcome();
  else if (state.screen === "level") renderLevel();
  else renderFortune();
  els.screen.focus({ preventScroll: true });
}

function renderWelcome() {
  els.screen.innerHTML = `
    <section class="panel welcome">
      <div class="welcome-copy">
        <div class="kicker">TRUNG THU · MỘT NÉT VẼ · MỘT QUẺ LÀNH</div>
        <h1><span class="title-glow">HOẠ ĐÈN<br/>ĐÓN TRĂNG</span></h1>
        <p class="lead">Nhìn các chấm sáng, bắt đầu từ bất kỳ chấm nào và <strong>nối liên tục tới tất cả các chấm</strong>. Hệ thống sẽ tự căn mỗi đoạn thành một đường thẳng gọn, đẹp. Không được nhấc chuột hoặc ngón tay.</p>
        <div>
          <button class="btn" type="button" data-action="start">Bắt đầu ✦</button>
        </div>
        <div class="feature-row" aria-label="Thông tin trò chơi">
          <div class="feature"><b>01 — KHÔNG SỐ</b><span>Mọi chấm đều không đánh số.</span></div>
          <div class="feature"><b>02 — MỘT NÉT</b><span>Bắt đầu ở đâu cũng được, chỉ nối một lần.</span></div>
          <div class="feature"><b>03 — GIEO QUẺ</b><span>Hoàn thành 4 thử thách để mở quẻ.</span></div>
        </div>
      </div>
      <div class="welcome-art" aria-hidden="true">
        <div class="reference-hint"></div>
        <div class="moon"><div class="moon-ring"></div></div>
        <div class="lantern a"></div>
        <div class="lantern b"></div>
        <div class="crescent">☾</div>
      </div>
    </section>
  `;
}

function renderLevel() {
  const lvl = LEVELS[state.level];
  const visitedCount = state.visited.size;
  els.screen.innerHTML = `
    <section class="panel game-shell">
      <div class="game-head">
        <div>
          <div class="kicker">THỬ THÁCH ${lvl.id} / ${LEVELS.length}</div>
          <h2>${lvl.title}</h2>
          <p>${lvl.subtitle}</p>
        </div>
        <div class="level-meta">
          <span class="level-badge">${lvl.difficulty}</span>
          <span class="dot-counter" id="dot-counter">${visitedCount}/${lvl.points.length} chấm</span>
        </div>
      </div>
      <div class="canvas-wrap">
        <canvas id="game-canvas" width="900" height="900" aria-label="Bảng một nét ${lvl.title}" tabindex="0"></canvas>
        <div class="canvas-overlay-text">MỘT NÉT · CHẠM ĐỦ CÁC CHẤM</div>
      </div>
      <div class="canvas-help">
        <div class="dot-status"><span class="status-light"></span><span id="status-text">Bắt đầu trên bất kỳ chấm nào, rồi kéo liên tục qua các chấm tiếp theo.</span></div>
        <button class="btn secondary" type="button" data-action="reset-level">Vẽ lại</button>
      </div>
    </section>
  `;
  setupCanvas();
}

function renderFortune() {
  const hasResult = !!state.fortune;
  const result = state.fortune;
  els.screen.innerHTML = `
    <section class="panel fortunetelling-card">
      <div class="kicker">GIEO QUẺ TRUNG THU</div>
      <h2>Chọn một phương diện để mở quẻ</h2>
      <p>Chạm vào một danh mục. Ống quẻ sẽ rung và hé lộ một lời nhắn may lành, được kết hợp cùng một hành vi văn hóa.</p>
      ${hasResult ? `
        <div class="draw-stage" id="draw-stage">
          <div class="fortune-ticket">
            <div class="category">${result.category}</div>
            <div class="fortune">${result.text}</div>
            <div class="principle">${result.principle}</div>
          </div>
        </div>
      ` : `
        <div class="draw-stage" id="draw-stage"><div class="fortune-tube" aria-hidden="true"></div></div>
      `}
      <div class="quest-grid">
        ${CATEGORIES.map((c) => `<button type="button" class="quest-card" data-category="${c.name}"><div class="quest-icon">${c.icon}</div><strong>${c.name}</strong><small>${c.desc}</small></button>`).join("")}
      </div>
      <div style="margin-top:20px; display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
        <button class="btn secondary" type="button" data-action="home">Về màn hình đầu</button>
      </div>
    </section>
  `;
}

function setupCanvas() {
  const canvas = document.getElementById("game-canvas");
  const lvl = LEVELS[state.level];
  const ctx = canvas.getContext("2d");
  const status = document.getElementById("status-text");
  const counter = document.getElementById("dot-counter");
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let resizeObserver;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  canvas.style.webkitUserSelect = "none";
  canvas.style.webkitTouchCallout = "none";

  const boardSize = () => canvas.getBoundingClientRect().width;
  const scale = () => boardSize() / 100;
  const toPx = (p) => ({ x: p[0] * scale(), y: p[1] * scale() });
  const fromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const pointHitRadius = () => Math.max(18, Math.min(34, boardSize() * 0.036));

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(1, rect.width);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBoard();
  };

  function drawBackground() {
    const w = boardSize();
    const h = w;
    const grd = ctx.createRadialGradient(w*.5,h*.42,20,w*.5,h*.5,w*.64);
    grd.addColorStop(0,"rgba(255,228,135,.18)");
    grd.addColorStop(1,"rgba(66,11,5,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,w,h);
    ctx.save();
    ctx.strokeStyle = "rgba(255,218,117,.06)";
    ctx.lineWidth = 1;
    for (let r = w*.17; r < w*.58; r += w*.075) {
      ctx.beginPath();
      ctx.arc(w*.5,h*.5,r,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBoard() {
    const w = boardSize();
    ctx.clearRect(0,0,w,w);
    drawBackground();

    // Chỉ vẽ các đoạn đã được hệ thống snap từ chấm này sang chấm kia.
    if (state.trail.length > 1) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(255,213,88,.98)";
      ctx.lineWidth = Math.max(5, w*.009);
      ctx.shadowColor = "rgba(255,213,98,.72)";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      state.trail.forEach((p, i) => i === 0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
      ctx.stroke();
      ctx.restore();
    }

    // Preview luôn là một đoạn THẲNG từ chấm hiện tại tới con trỏ.
    if (state.drawing && state.trail.length > 0) {
      const from = state.trail[state.trail.length - 1];
      ctx.save();
      ctx.lineCap = "round";
      ctx.setLineDash([8,8]);
      ctx.lineWidth = Math.max(3, w*.006);
      ctx.strokeStyle = "rgba(255,245,203,.72)";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(state.pointer.x, state.pointer.y);
      ctx.stroke();
      ctx.restore();

      const target = nearestUnvisited(state.pointer);
      if (target && target.distance <= pointHitRadius() * 1.4) {
        const q = target.p;
        ctx.save();
        ctx.beginPath();
        ctx.arc(q.x,q.y,Math.max(13,w*.018),0,Math.PI*2);
        ctx.strokeStyle = "rgba(255,240,174,.95)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(255,235,145,.75)";
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.restore();
      }
    }

    lvl.points.forEach((rawPoint,index) => {
      const p = toPx(rawPoint);
      const visited = state.visited.has(index);
      const radius = Math.max(6,w*.012);
      ctx.save();
      if (!visited) {
        ctx.beginPath();
        ctx.arc(p.x,p.y,radius + 9,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,114,60,.08)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,radius,0,Math.PI*2);
      ctx.fillStyle = visited ? "#ffe27c" : "#ff6140";
      ctx.shadowColor = visited ? "rgba(255,220,110,.9)" : "rgba(255,91,52,.75)";
      ctx.shadowBlur = 13;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.7;
      ctx.strokeStyle = visited ? "#fff4c9" : "rgba(255,235,166,.92)";
      ctx.stroke();
      ctx.restore();
    });
  }

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  function updateCounter() {
    if (counter) counter.textContent = `${state.visited.size}/${lvl.points.length} chấm`;
  }

  function distPointToSegment(point, a, b) {
    const abx = b.x-a.x, aby = b.y-a.y;
    const apx = point.x-a.x, apy = point.y-a.y;
    const ab2 = abx*abx + aby*aby;
    const t = ab2 === 0 ? 0 : Math.max(0, Math.min(1, (apx*abx + apy*aby)/ab2));
    const qx = a.x + abx*t, qy = a.y + aby*t;
    return { distance: Math.hypot(point.x-qx, point.y-qy), t };
  }

  function nearestUnvisited(p) {
    let best = null;
    lvl.points.forEach((raw,index) => {
      if (state.visited.has(index)) return;
      const q = toPx(raw);
      const distance = Math.hypot(q.x-p.x, q.y-p.y);
      if (!best || distance < best.distance) best = {index, distance, p:q};
    });
    return best;
  }

  // Khi người chơi rê nhanh, tìm chấm đầu tiên mà đoạn di chuyển cắt qua.
  function firstDotAlongMovement(a,b) {
    let best = null;
    lvl.points.forEach((raw,index) => {
      if (state.visited.has(index)) return;
      const q = toPx(raw);
      const hit = distPointToSegment(q,a,b);
      if (hit.distance > pointHitRadius()) return;
      if (!best || hit.t < best.t) best = { index, p:q, t:hit.t };
    });
    return best;
  }

  function addDot(index) {
    if (state.visited.has(index)) return false;
    const q = toPx(lvl.points[index]);
    state.visited.add(index);
    state.trail.push(q);
    updateCounter();
    return true;
  }

  function beginStroke(p,event) {
    if (state.completed || state.drawing) return;
    const hit = nearestUnvisited(p);
    if (!hit || hit.distance > pointHitRadius()) {
      showToast("Hãy bắt đầu ngay trên một chấm sáng.");
      return;
    }

    state.drawing = true;
    state.activePointerId = event.pointerId;
    state.pointer = hit.p;
    state.trail = [];
    addDot(hit.index);
    document.body.classList.add("is-drawing");
    try { canvas.setPointerCapture(event.pointerId); } catch (_) {}
    setStatus(`Đã nối ${state.visited.size}/${lvl.points.length} chấm. Giữ và kéo liên tục.`);
    drawBoard();
  }

  function consumeMovement(p) {
    if (!state.drawing) return;
    const prevPointer = state.pointer;
    state.pointer = p;

    // Có thể chạm nhiều chấm trong một event pointermove.
    let from = prevPointer;
    let safety = 0;
    while (safety++ < lvl.points.length + 2) {
      const hit = firstDotAlongMovement(from,p);
      if (!hit) break;
      addDot(hit.index);
      from = hit.p;
      if (state.visited.size === lvl.points.length) {
        state.completed = true;
        state.drawing = false;
        state.activePointerId = null;
        document.body.classList.remove("is-drawing");
        finishLevel();
        return;
      }
      // Tiếp tục xét phần còn lại của cùng một chuyển động.
      if (Math.hypot(p.x-from.x,p.y-from.y) < 0.5) break;
    }

    setStatus(`Đã nối ${state.visited.size}/${lvl.points.length} chấm. Đường sẽ tự căn thẳng.`);
    drawBoard();
  }

  function endStroke() {
    if (!state.drawing) return;
    state.drawing = false;
    state.activePointerId = null;
    document.body.classList.remove("is-drawing");
    if (state.visited.size < lvl.points.length) {
      showToast(`Chưa hoàn thành (${state.visited.size}/${lvl.points.length}). Lượt vẽ phải liên tục từ đầu đến cuối.`);
      setStatus("Lượt vừa rồi bị ngắt. Bấm “Vẽ lại” để bắt đầu lại.");
      // Giữ lại kết quả trong vài trăm ms để người chơi nhìn thấy đường vừa đi, sau đó reset.
      setTimeout(() => {
        if (!state.completed) {
          resetLevelState();
          drawBoard();
          updateCounter();
        }
      }, 450);
    }
    drawBoard();
  }

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (event.pointerType === "mouse" && event.button !== 0) return;
    beginStroke(fromEvent(event), event);
  }, { passive:false });

  canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    if (!state.drawing || event.pointerId !== state.activePointerId) return;
    consumeMovement(fromEvent(event));
  }, { passive:false });

  canvas.addEventListener("pointerup", (event) => {
    if (event.pointerId !== state.activePointerId) return;
    try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
    // Nếu chưa chạm đủ, đây là một lượt bị ngắt.
    endStroke();
  }, { passive:false });

  canvas.addEventListener("pointercancel", (event) => {
    if (event.pointerId === state.activePointerId) endStroke();
  }, { passive:false });

  canvas.addEventListener("lostpointercapture", () => {
    if (state.drawing) endStroke();
  });

  // Fallback cho trình duyệt khi pointer capture không ổn định.
  window.addEventListener("pointermove", (event) => {
    if (!state.drawing || event.pointerId !== state.activePointerId) return;
    const p = fromEvent(event);
    if (p.x < -60 || p.y < -60 || p.x > boardSize()+60 || p.y > boardSize()+60) return;
    consumeMovement(p);
  }, { passive:false });

  window.addEventListener("pointerup", (event) => {
    if (event.pointerId === state.activePointerId) endStroke();
  }, { passive:false });

  // Touch fallback cũ cho Safari/iOS.
  canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (state.drawing || !event.touches[0]) return;
    const t = event.touches[0];
    beginStroke({x:t.clientX-canvas.getBoundingClientRect().left,y:t.clientY-canvas.getBoundingClientRect().top},{pointerId:"touch"});
  }, { passive:false });
  canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (!state.drawing || !event.touches[0]) return;
    const t = event.touches[0];
    consumeMovement({x:t.clientX-canvas.getBoundingClientRect().left,y:t.clientY-canvas.getBoundingClientRect().top});
  }, { passive:false });
  canvas.addEventListener("touchend", (event) => { event.preventDefault(); endStroke(); }, { passive:false });
  canvas.addEventListener("touchcancel", (event) => { event.preventDefault(); endStroke(); }, { passive:false });

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement || canvas);
  }
  window.addEventListener("resize", resize, { passive:true });
  resize();
  updateCounter();
}

function startGame() {
  state.screen = "level";
  state.level = 0;
  resetLevelState();
  render();
}

function resetLevelState() {
  state.visited = new Set();
  state.trail = [];
  state.drawing = false;
  state.activePointerId = null;
  state.pointer = {x:0,y:0};
  state.completed = false;
  document.body.classList.remove("is-drawing");
}

function finishLevel() {
  state.drawing=false;
  state.completed=true;
  document.body.classList.remove("is-drawing");
  launchConfetti();
  const isLast = state.level === LEVELS.length - 1;
  showModal({
    icon: isLast ? "☾" : "✦",
    title: isLast ? "Bạn đã mở khóa Gieo Quẻ!" : `Thử thách ${state.level + 1} hoàn thành!`,
    text: isLast ? "Một nét vẽ đã đi qua toàn bộ chấm sáng. Phần thưởng cuối cùng đang chờ bạn." : "Bạn đã nối toàn bộ chấm bằng đúng một nét liên tục. Hãy tiếp tục thử thách tiếp theo.",
    primary: isLast ? "Nhận 1 lần Gieo Quẻ" : "Chơi thử thách tiếp theo",
    secondary: "Chơi lại thử thách",
    onPrimary: () => {
      closeModal();
      if (isLast) { state.screen="fortune"; state.fortune=null; render(); }
      else { state.level += 1; resetLevelState(); render(); }
    },
    onSecondary: () => { closeModal(); resetLevelState(); render(); }
  });
}

function showModal({icon,title,text,primary,secondary,onPrimary,onSecondary}) {
  const div = document.createElement("div");
  div.className="modal-backdrop";
  div.id="game-modal";
  div.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-icon">${icon}</div><h3 id="modal-title">${title}</h3><p>${text}</p><div class="modal-actions"><button class="btn secondary" data-modal="secondary">${secondary}</button><button class="btn" data-modal="primary">${primary}</button></div></div>`;
  document.body.appendChild(div);
  div.querySelector('[data-modal="primary"]').addEventListener("click", onPrimary);
  div.querySelector('[data-modal="secondary"]').addEventListener("click", onSecondary);
  div.addEventListener("click", (e)=> { if(e.target===div) onSecondary(); });
}

function closeModal() { document.getElementById("game-modal")?.remove(); }

function launchConfetti() {
  els.confetti.innerHTML = "";
  const count = 72;
  for (let i=0;i<count;i++) {
    const el=document.createElement("span"); el.className="confetti";
    el.style.left = `${Math.random()*100}%`;
    el.style.setProperty("--x", `${(Math.random()-.5)*240}px`);
    el.style.setProperty("--r", `${(Math.random()-.5)*960}deg`);
    el.style.animationDuration = `${2.6+Math.random()*2.6}s`;
    el.style.animationDelay = `${Math.random()*.35}s`;
    el.style.background = ["#ffd452","#ff7a26","#fff0b2","#d94925"][Math.floor(Math.random()*4)];
    els.confetti.appendChild(el);
  }
  setTimeout(()=> els.confetti.innerHTML="", 5200);
}

function showToast(text) {
  els.toast.textContent=text;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>els.toast.classList.remove("show"),2300);
}

function drawFortune(category) {
  const templates = FORTUNES[category];
  const template = templates[Math.floor(Math.random()*templates.length)];
  const principle = PRINCIPLES[Math.floor(Math.random()*PRINCIPLES.length)];
  const rendered = template.replace("{principle}", `<span class="principle">${principle}</span>`);
  state.fortune = { category, principle, text: rendered };
}

function handleFortune(category) {
  if (!FORTUNES[category]) return;
  const stage = document.getElementById("draw-stage");
  if (stage) stage.innerHTML = `<div class="fortune-tube shake" aria-label="Đang gieo quẻ"></div>`;
  const cards = [...document.querySelectorAll(".quest-card")];
  cards.forEach(c=>c.disabled=true);
  setTimeout(() => {
    drawFortune(category);
    launchConfetti();
    render();
  }, 1100);
}

function goHome() {
  closeModal();
  state.screen="welcome";
  state.level=0;
  resetLevelState();
  state.fortune=null;
  render();
}

document.addEventListener("click", (event) => {
  const action = event.target.closest?.("[data-action]")?.dataset.action;
  if (action === "start") startGame();
  if (action === "home") goHome();
  if (action === "reset-level") { resetLevelState(); render(); }
  const category = event.target.closest?.("[data-category]")?.dataset.category;
  if (category) handleFortune(category);
});

document.addEventListener("mousemove", (event) => {
  els.cursor.style.transform = `translate(${event.clientX + 10}px, ${event.clientY + 10}px)`;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

render();
