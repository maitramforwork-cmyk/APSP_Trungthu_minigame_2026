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
    title: "Mặt Trăng Rằm",
    subtitle: "Các chấm lấy cảm hứng từ vầng trăng tròn và họa tiết rồng trong ảnh Trung Thu.",
    difficulty: "DỄ",
    crop: { x: 0.05, y: 0.00, w: 0.72, h: 0.80 },
    points: [
      [50,10],[66,13],[79,22],[88,35],[91,51],[87,66],[77,78],[63,87],[48,91],[33,87],[21,78],[12,65],[9,50],[12,35],[22,22],[35,13],
      [28,48],[36,41],[47,37],[59,38],[69,45],[74,53],[67,60],[58,66],[48,72],[39,67],[31,60],[25,53],
      [37,48],[46,44],[55,48],[62,54],[54,58],[46,55],[40,57]
    ]
  },
  {
    id: 2,
    title: "Đèn Lồng Sum Vầy",
    subtitle: "Hai chiếc đèn lồng nổi bật trong ảnh trở thành một thử thách nối chấm bằng một nét.",
    difficulty: "TRUNG BÌNH",
    crop: { x: 0.50, y: 0.20, w: 0.50, h: 0.65 },
    points: [
      [17,20],[17,30],[12,42],[14,55],[20,66],[30,72],[40,67],[44,55],[42,42],[36,31],[28,25],[22,38],[22,54],[28,61],[35,55],[35,42],[28,35],
      [55,20],[55,30],[50,42],[52,55],[58,66],[68,72],[78,67],[82,55],[80,42],[74,31],[66,25],[60,38],[60,54],[66,61],[73,55],[73,42],[66,35],
      [44,13],[50,8],[56,13],[55,20],[44,20]
    ]
  },
  {
    id: 3,
    title: "Đôi Bạn Đón Trăng",
    subtitle: "Bám theo dáng hai bạn nhỏ và dải chuyển động mềm mại trong tranh để tìm đường đi.",
    difficulty: "KHÓ",
    crop: { x: 0.52, y: 0.24, w: 0.48, h: 0.58 },
    points: [
      [23,16],[29,13],[36,15],[40,21],[39,28],[34,33],[28,31],[23,27],[19,22],
      [18,39],[22,44],[20,52],[17,59],[20,66],[25,70],[31,69],[34,62],[33,55],[30,48],[28,41],
      [57,14],[63,11],[70,13],[75,19],[74,27],[69,32],[63,31],[58,27],[54,22],
      [53,38],[57,44],[55,52],[52,59],[55,66],[60,70],[66,69],[69,62],[68,55],[65,48],[63,41],
      [36,39],[44,36],[52,39],[60,36],[68,40],[75,46],[82,49],[76,54],[68,58],[60,55],[52,58],[44,55],[36,57],[28,54]
    ]
  },
  {
    id: 4,
    title: "Rồng Trăng Rằm",
    subtitle: "50 chấm lấy cảm hứng từ mặt trăng, rồng và những dải lụa chuyển động trong ảnh.",
    difficulty: "THỬ THÁCH",
    crop: { x: 0.00, y: 0.00, w: 1.00, h: 1.00 },
    points: [
      [50,6],[59,8],[68,7],[77,11],[87,16],[94,24],[91,33],[96,43],[93,53],[95,64],[88,72],[90,82],[80,88],[69,94],[60,91],[50,96],[41,91],[30,94],[20,87],[11,83],[13,73],[5,64],[9,54],[4,44],[8,34],[6,23],[13,15],[22,11],[32,7],[41,9],
      [42,19],[33,22],[25,29],[30,36],[20,43],[29,49],[17,56],[28,61],[36,57],[41,67],[50,61],[58,67],[64,57],[72,61],[82,56],[71,49],[80,43],[70,36],[75,29],[67,22]
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
  const step = state.screen === "welcome" ? 0 : state.screen === "fortune" ? 5 : state.level + 1;
  const total = 5;
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
        <p class="lead">Nhìn những chấm sáng và tự tìm đường đi để chạm qua <strong>tất cả các chấm bằng một nét liên tục</strong>. Không có số thứ tự, không được nhấc chuột hoặc ngón tay.</p>
        <div>
          <button class="btn" type="button" data-action="start">Bắt đầu ✦</button>
        </div>
        <div class="feature-row" aria-label="Thông tin trò chơi">
          <div class="feature"><b>01 — KHÔNG SỐ</b><span>Mọi chấm đều không đánh số.</span></div>
          <div class="feature"><b>02 — MỘT NÉT</b><span>Bắt đầu ở đâu cũng được, chỉ vẽ một lần.</span></div>
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
          <div class="kicker">THỬ THÁCH ${lvl.id} / 4</div>
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
        <div class="dot-status"><span class="status-light"></span><span id="status-text">Đặt chuột/ngón tay lên một chấm rồi bắt đầu kéo.</span></div>
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
  let referenceImage = null;
  let imageReady = false;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  canvas.style.webkitUserSelect = "none";

  referenceImage = new Image();
  referenceImage.onload = () => { imageReady = true; drawBoard(); };
  referenceImage.src = "assets/reference.jpg";

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(1, rect.width);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBoard();
  };

  const boardSize = () => canvas.getBoundingClientRect().width;
  const scale = () => boardSize() / 100;
  const toPx = (p) => ({ x: p[0] * scale(), y: p[1] * scale() });
  const fromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const pointHitRadius = () => Math.max(15, Math.min(30, boardSize() * 0.031));

  function drawReferenceHint() {
    if (!imageReady || !referenceImage) return;
    const w = boardSize();
    const h = w;
    const c = lvl.crop;
    const sx = referenceImage.naturalWidth * c.x;
    const sy = referenceImage.naturalHeight * c.y;
    const sw = referenceImage.naturalWidth * c.w;
    const sh = referenceImage.naturalHeight * c.h;

    ctx.save();
    ctx.globalAlpha = 0.105;
    ctx.drawImage(referenceImage, sx, sy, sw, sh, 0, 0, w, h);
    const veil = ctx.createLinearGradient(0,0,w,h);
    veil.addColorStop(0,"rgba(38,5,3,.72)");
    veil.addColorStop(.55,"rgba(63,9,4,.38)");
    veil.addColorStop(1,"rgba(18,3,2,.80)");
    ctx.fillStyle = veil;
    ctx.fillRect(0,0,w,h);
    ctx.restore();
  }

  function drawBackground() {
    const w = boardSize();
    const h = w;
    const grd = ctx.createRadialGradient(w*.5,h*.42,20,w*.5,h*.5,w*.64);
    grd.addColorStop(0,"rgba(255,228,135,.18)");
    grd.addColorStop(1,"rgba(66,11,5,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,w,h);
    ctx.save();
    ctx.strokeStyle = "rgba(255,218,117,.09)";
    ctx.lineWidth = 1;
    for (let r = w*.18; r < w*.55; r += w*.07) {
      ctx.beginPath(); ctx.arc(w*.5,h*.5,r,0,Math.PI*2); ctx.stroke();
    }
    ctx.restore();
  }

  function drawBoard() {
    const w = boardSize();
    ctx.clearRect(0,0,w,w);
    drawBackground();
    drawReferenceHint();

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

    lvl.points.forEach((rawPoint, index) => {
      const p = toPx(rawPoint);
      const visited = state.visited.has(index);
      const radius = Math.max(5.5,w*.011);
      ctx.save();
      if (!visited) {
        ctx.beginPath();
        ctx.arc(p.x,p.y,radius + 8,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,114,60,.10)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,radius,0,Math.PI*2);
      ctx.fillStyle = visited ? "#ffe27c" : "#ff6140";
      ctx.shadowColor = visited ? "rgba(255,220,110,.8)" : "rgba(255,91,52,.75)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.7;
      ctx.strokeStyle = visited ? "#fff1bd" : "rgba(255,235,166,.9)";
      ctx.stroke();
      ctx.restore();
    });

    if (state.drawing && state.trail.length > 0) {
      const from = state.trail[state.trail.length - 1];
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(3.5,w*.006);
      ctx.strokeStyle = "rgba(255,246,206,.72)";
      ctx.beginPath();
      ctx.moveTo(from.x,from.y);
      ctx.lineTo(state.pointer.x,state.pointer.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  function updateCounter() {
    if (counter) counter.textContent = `${state.visited.size}/${lvl.points.length} chấm`;
  }

  function pointNearSegment(point, a, b, radius) {
    const abx = b.x-a.x;
    const aby = b.y-a.y;
    const apx = point.x-a.x;
    const apy = point.y-a.y;
    const ab2 = abx*abx + aby*aby;
    const t = ab2 === 0 ? 0 : Math.max(0, Math.min(1, (apx*abx + apy*aby) / ab2));
    const qx = a.x + abx*t;
    const qy = a.y + aby*t;
    return Math.hypot(point.x-qx, point.y-qy) <= radius;
  }

  function nearestPoint(p) {
    let bestIndex = -1;
    let bestDistance = Infinity;
    lvl.points.forEach((pt,index) => {
      if (state.visited.has(index)) return;
      const q = toPx(pt);
      const d = Math.hypot(q.x-p.x,q.y-p.y);
      if (d < bestDistance) { bestDistance = d; bestIndex = index; }
    });
    return { index: bestIndex, distance: bestDistance };
  }

  function markDotsOnSegment(a,b) {
    const radius = pointHitRadius();
    lvl.points.forEach((rawPoint,index) => {
      if (state.visited.has(index)) return;
      const p = toPx(rawPoint);
      if (pointNearSegment(p,a,b,radius)) state.visited.add(index);
    });
    updateCounter();
  }

  function markStartPoint(p) {
    const closest = nearestPoint(p);
    if (closest.index !== -1 && closest.distance <= pointHitRadius()) {
      state.visited.add(closest.index);
      updateCounter();
      return true;
    }
    return false;
  }

  function beginStroke(p,event) {
    if (state.completed || state.drawing) return;
    if (!markStartPoint(p)) {
      showToast("Hãy bắt đầu ngay trên một chấm sáng.");
      return;
    }
    state.drawing = true;
    state.activePointerId = event.pointerId;
    state.trail = [p];
    state.pointer = p;
    document.body.classList.add("is-drawing");
    try { canvas.setPointerCapture(event.pointerId); } catch (_) {}
    setStatus(`Đã chạm ${state.visited.size}/${lvl.points.length} chấm. Giữ và kéo tiếp — đừng nhấc tay.`);
    drawBoard();
  }

  function continueStroke(p) {
    if (!state.drawing) return;
    const previous = state.trail[state.trail.length-1];
    markDotsOnSegment(previous,p);
    state.trail.push(p);
    state.pointer = p;

    if (state.visited.size === lvl.points.length) {
      state.completed = true;
      state.drawing = false;
      state.activePointerId = null;
      document.body.classList.remove("is-drawing");
      finishLevel();
      return;
    }

    setStatus(`Đã chạm ${state.visited.size}/${lvl.points.length} chấm. Vẫn giữ nguyên một nét.`);
    drawBoard();
  }

  function endStroke() {
    if (!state.drawing) return;
    state.drawing = false;
    state.activePointerId = null;
    document.body.classList.remove("is-drawing");
    if (state.visited.size < lvl.points.length) {
      showToast(`Chưa đủ chấm (${state.visited.size}/${lvl.points.length}). Bạn đã nhấc tay quá sớm.`);
      setStatus("Lượt vừa rồi chưa hoàn thành. Bấm “Vẽ lại” để bắt đầu lại từ đầu.");
      drawBoard();
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (event.pointerType === "mouse" && event.button !== 0) return;
    beginStroke(fromEvent(event),event);
  }, { passive:false });

  canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    if (!state.drawing || event.pointerId !== state.activePointerId) return;
    continueStroke(fromEvent(event));
  }, { passive:false });

  canvas.addEventListener("pointerup", (event) => {
    if (event.pointerId === state.activePointerId) {
      try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
      endStroke();
    }
  }, { passive:false });

  canvas.addEventListener("pointercancel", endStroke, { passive:false });
  canvas.addEventListener("lostpointercapture", () => {
    if (state.drawing) endStroke();
  });

  // Safety net for browsers that do not keep pointer capture reliably.
  window.addEventListener("pointermove", (event) => {
    if (!state.drawing || event.pointerId !== state.activePointerId) return;
    const p = fromEvent(event);
    if (p.x < -40 || p.y < -40 || p.x > boardSize()+40 || p.y > boardSize()+40) return;
    continueStroke(p);
  }, { passive:false });
  window.addEventListener("pointerup", (event) => {
    if (event.pointerId === state.activePointerId) endStroke();
  }, { passive:false });

  // Direct touch fallback for older iOS/Safari builds.
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
    continueStroke({x:t.clientX-canvas.getBoundingClientRect().left,y:t.clientY-canvas.getBoundingClientRect().top});
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
    text: isLast ? "Một nét vẽ đã đi qua toàn bộ chấm sáng. Phần thưởng cuối cùng đang chờ bạn." : "Bạn đã đi qua toàn bộ chấm bằng đúng một nét. Hãy tiếp tục thử thách tiếp theo.",
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
