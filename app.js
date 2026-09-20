/*
  TRĂNG RẰM TỎA SÁNG — NỐI ĐIỂM ĐÓN QUẺ
  ------------------------------------------------
  - No external libraries: Canvas API + plain JS.
  - Level point data lives in LEVELS below so it can be edited independently.
  - Fortune content is data-driven in FORTUNES.
*/

const LEVELS = [
  {
    id: 1,
    title: "Bánh Trung Thu",
    subtitle: "Nối nhẹ nhàng để mở cánh cửa trăng vàng.",
    difficulty: "DỄ",
    points: [
      [18,45],[23,31],[34,20],[50,16],[66,20],[77,31],[82,45],[78,61],
      [68,73],[50,80],[32,73],[22,61],[18,45],[28,45],[34,35],[50,31],
      [66,35],[72,45],[66,55],[50,60],[34,55],[28,45]
    ]
  },
  {
    id: 2,
    title: "Lồng Đèn Con Cá",
    subtitle: "Giữ nhịp tay đều, bám đúng thứ tự các điểm.",
    difficulty: "TRUNG BÌNH",
    points: [
      [11,50],[20,38],[33,29],[49,25],[64,28],[76,36],[87,48],[77,58],
      [67,71],[52,78],[35,74],[22,64],[15,55],[29,53],[41,59],[54,56],
      [66,62],[74,51],[66,43],[53,47],[40,42],[28,47],[20,38]
    ]
  },
  {
    id: 3,
    title: "Lồng Đèn Ngôi Sao",
    subtitle: "Một nét nối chính xác sẽ giữ cả ngôi sao sáng.",
    difficulty: "KHÓ",
    points: [
      [50,8],[60,31],[86,31],[66,47],[76,72],[50,57],[24,72],[34,47],
      [14,31],[40,31],[50,8],[44,23],[56,23],[50,42],[50,57],[44,46],
      [34,47],[42,38],[40,31]
    ]
  },
  {
    id: 4,
    title: "Đồ Hình Trăng Rằm",
    subtitle: "50 điểm — thử thách cuối trước khi nhận 1 lần Gieo Quẻ.",
    difficulty: "THỬ THÁCH",
    points: [
      [50,5],[58,12],[68,9],[78,16],[88,13],[94,22],[91,33],[96,43],[91,53],
      [95,64],[87,73],[89,84],[78,88],[69,95],[59,91],[50,97],[41,91],[31,95],
      [22,88],[11,84],[13,73],[5,64],[9,53],[4,43],[9,33],[6,22],[12,13],[22,16],
      [32,9],[42,12],[50,5],[43,21],[32,24],[24,33],[29,41],[19,51],[25,59],[35,57],
      [40,67],[50,61],[60,67],[65,57],[75,59],[81,51],[71,41],[76,33],[68,24],[57,21],
      [50,42]
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
  currentPoint: 0,
  connected: [],
  drawing: false,
  pointer: { x: 0, y: 0 },
  fortune: null,
  canDraw: true
};

const els = {
  screen: document.getElementById("screen"),
  progress: document.getElementById("progress"),
  toast: document.getElementById("toast"),
  confetti: document.getElementById("confetti-layer"),
  cursor: document.getElementById("cursor-star")
};

function renderProgress() {
  const step = state.screen === "welcome" ? 0 : state.screen === "fortune" ? 6 : state.level + 1;
  const total = 6;
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
        <div class="kicker">Một đêm trăng · một đường nét · một quẻ lành</div>
        <h1><span class="title-glow">Trăng Rằm<br/>Tỏa Sáng</span></h1>
        <p class="lead">Nối các chấm theo đúng thứ tự để vẽ nên những biểu tượng Trung Thu. Hoàn thành 4 level để mở khóa <strong>Gieo Quẻ Trung Thu</strong> và nhận một lời nhắn dành riêng cho bạn.</p>
        <div>
          <button class="btn" type="button" data-action="start">Bắt đầu ✦</button>
        </div>
        <div class="feature-row" aria-label="Thông tin trò chơi">
          <div class="feature"><b>01 — NỐI ĐIỂM</b><span>Chạm / kéo từ điểm 1 → 2 → 3…</span></div>
          <div class="feature"><b>02 — BẮT TRĂNG</b><span>Đi đúng thứ tự để đường nét liền mạch.</span></div>
          <div class="feature"><b>03 — GIEO QUẺ</b><span>Hoàn thành 4 level để mở khóa quẻ.</span></div>
        </div>
      </div>
      <div class="welcome-art" aria-hidden="true">
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
  els.screen.innerHTML = `
    <section class="panel game-shell">
      <div class="game-head">
        <div>
          <div class="kicker">LEVEL ${lvl.id} / 4</div>
          <h2>${lvl.title}</h2>
          <p>${lvl.subtitle}</p>
        </div>
        <span class="level-badge">${lvl.difficulty}</span>
      </div>
      <div class="canvas-wrap">
        <canvas id="game-canvas" width="900" height="900" aria-label="Bảng nối điểm Level ${lvl.id}" tabindex="0"></canvas>
      </div>
      <div class="canvas-help">
        <div class="dot-status"><span class="status-light"></span><span id="status-text">Hãy bắt đầu tại điểm 1.</span></div>
        <button class="btn secondary" type="button" data-action="reset-level">Chơi lại level</button>
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
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.width * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBoard();
  };

  const scale = () => canvas.getBoundingClientRect().width / 100;
  const toCanvasPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 };
  };
  const distance = (a,b) => Math.hypot(a.x-b.x, a.y-b.y);

  function screenPoint(p) { return { x: p[0] * scale(), y: p[1] * scale() }; }

  function drawBackground() {
    const w = canvas.getBoundingClientRect().width;
    const h = w;
    const grd = ctx.createRadialGradient(w*.5,h*.42,20,w*.5,h*.5,w*.62);
    grd.addColorStop(0,"rgba(255,228,135,.17)");
    grd.addColorStop(1,"rgba(66,11,5,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,w,h);
    ctx.save();
    ctx.strokeStyle = "rgba(255,218,117,.10)";
    ctx.lineWidth = 1;
    for (let r = w*.18; r < w*.55; r += w*.07) { ctx.beginPath(); ctx.arc(w*.5,h*.5,r,0,Math.PI*2); ctx.stroke(); }
    ctx.restore();
  }

  function drawBoard() {
    const w = canvas.getBoundingClientRect().width;
    ctx.clearRect(0,0,w,w); drawBackground();
    const pts = lvl.points;
    const ptsPx = pts.map(screenPoint);

    if (state.connected.length > 0) {
      ctx.save();
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(255,208,81,.95)"; ctx.lineWidth = Math.max(2.5, w*.006);
      ctx.shadowColor = "rgba(255,213,98,.55)"; ctx.shadowBlur = 14;
      ctx.beginPath();
      state.connected.forEach((index, i) => {
        const p = ptsPx[index];
        if (i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
      });
      if (state.currentPoint >= ptsPx.length && ptsPx.length > 1) {
        ctx.lineTo(ptsPx[0].x, ptsPx[0].y);
      }
      ctx.stroke(); ctx.restore();
    }

    if (state.drawing && state.currentPoint > 0 && state.currentPoint < pts.length) {
      const from = ptsPx[state.currentPoint-1];
      ctx.save(); ctx.setLineDash([7,8]); ctx.lineWidth=2; ctx.strokeStyle="rgba(255,236,172,.55)";
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(state.pointer.x,state.pointer.y); ctx.stroke(); ctx.restore();
    }

    ptsPx.forEach((p, i) => {
      const expected = i === state.currentPoint;
      const reached = i < state.currentPoint;
      ctx.save();
      ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(6,w*.012),0,Math.PI*2);
      ctx.fillStyle = reached ? "#ffd55e" : expected ? "#ff5f32" : "#b52f23";
      ctx.fill();
      ctx.lineWidth=2; ctx.strokeStyle = reached ? "#fff2bd" : "rgba(255,219,132,.74)"; ctx.stroke();
      if (expected) { ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(11,w*.022),0,Math.PI*2); ctx.strokeStyle="rgba(255,227,126,.56)"; ctx.stroke(); }
      ctx.fillStyle = "#fff5d5"; ctx.font = `700 ${Math.max(8,w*.017)}px system-ui`; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(String(i+1), p.x, p.y-1);
      ctx.restore();
    });
  }

  function setStatus(msg) { if (status) status.textContent = msg; }

  function nearestPoint(p) {
    let best = { index: -1, d: Infinity };
    lvl.points.forEach((pt, index) => {
      const q = screenPoint(pt); const d = Math.hypot(q.x-p.x, q.y-p.y);
      if (d < best.d) best = { index, d };
    });
    return best;
  }

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const p = toCanvasPoint(event); const nearest = nearestPoint({x:p.x*scale(), y:p.y*scale()});
    const expected = state.currentPoint;
    if (nearest.index === expected && nearest.d <= Math.max(20, canvas.getBoundingClientRect().width*.055)) {
      state.drawing = true; state.pointer = {x:p.x*scale(),y:p.y*scale()};
      if (expected === 0) { state.connected = [0]; state.currentPoint = 1; setStatus(`Đã bắt đầu. Tìm điểm ${state.currentPoint + 1}.`); }
      canvas.setPointerCapture?.(event.pointerId); drawBoard();
    } else if (nearest.d <= Math.max(28, canvas.getBoundingClientRect().width*.07)) {
      showToast(`Hãy nối đúng thứ tự: tìm điểm ${expected + 1}.`);
    }
  }, { passive:false });

  canvas.addEventListener("pointermove", (event) => {
    const p = toCanvasPoint(event); state.pointer = {x:p.x*scale(),y:p.y*scale()};
    if (state.drawing) {
      const nearest = nearestPoint(state.pointer);
      const expected = state.currentPoint;
      if (nearest.index === expected && nearest.d <= Math.max(20, canvas.getBoundingClientRect().width*.055)) {
        state.connected.push(expected); state.currentPoint += 1;
        if (state.currentPoint >= lvl.points.length) {
          finishLevel();
          return;
        }
        setStatus(`很好! Tiếp tục tới điểm ${state.currentPoint + 1}.`);
      }
    }
    drawBoard();
  }, { passive:false });

  function stopPointer() { state.drawing=false; drawBoard(); }
  canvas.addEventListener("pointerup", stopPointer);
  canvas.addEventListener("pointercancel", stopPointer);
  canvas.addEventListener("pointerleave", () => { if (state.drawing) { state.drawing=false; drawBoard(); } });
  window.addEventListener("resize", resize, { passive:true });
  resize();
}

function startGame() {
  state.screen = "level"; state.level = 0; resetLevelState(); render();
}
function resetLevelState() { state.currentPoint = 0; state.connected = []; state.drawing=false; state.pointer={x:0,y:0}; }
function finishLevel() {
  state.drawing=false;
  state.connected = LEVELS[state.level].points.map((_,i)=>i);
  launchConfetti();
  const isLast = state.level === LEVELS.length - 1;
  showModal({
    icon: isLast ? "☾" : "✦",
    title: isLast ? "Bạn đã mở khóa Gieo Quẻ!" : `Level ${state.level + 1} hoàn thành!`,
    text: isLast ? "Bốn đường nét đã khép lại thành một vòng trăng. Phần thưởng cuối cùng đang chờ bạn." : "Đường nét đã liền mạch. Giữ nhịp tay này để khám phá hình tiếp theo.",
    primary: isLast ? "Nhận 1 lần Gieo Quẻ" : "Chơi Level tiếp theo",
    secondary: "Chơi lại level",
    onPrimary: () => {
      closeModal();
      if (isLast) { state.screen="fortune"; state.fortune=null; render(); }
      else { state.level += 1; resetLevelState(); render(); }
    },
    onSecondary: () => { closeModal(); resetLevelState(); render(); }
  });
}

function showModal({icon,title,text,primary,secondary,onPrimary,onSecondary}) {
  const div = document.createElement("div"); div.className="modal-backdrop"; div.id="game-modal";
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

function showToast(text) { els.toast.textContent=text; els.toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>els.toast.classList.remove("show"),1800); }

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
  if (stage) {
    stage.innerHTML = `<div class="fortune-tube shake" aria-label="Đang gieo quẻ"></div>`;
  }
  const cards = [...document.querySelectorAll(".quest-card")]; cards.forEach(c=>c.disabled=true);
  setTimeout(() => {
    drawFortune(category); launchConfetti(); render();
  }, 1100);
}

function goHome() { closeModal(); state.screen="welcome"; state.level=0; resetLevelState(); state.fortune=null; render(); }

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
