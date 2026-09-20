/* global LEVELS, CULTURE_BEHAVIORS, FORTUNE_DATA */

(() => {
  'use strict';

  const els = {
    welcome: document.getElementById('welcomeScreen'),
    game: document.getElementById('gameScreen'),
    fortune: document.getElementById('fortuneScreen'),
    canvas: document.getElementById('gameCanvas'),
    board: document.getElementById('board'),
    ghostArt: document.getElementById('ghostArt'),
    startBtn: document.getElementById('startBtn'),
    backBtn: document.getElementById('backBtn'),
    hintBtn: document.getElementById('hintBtn'),
    resetBtn: document.getElementById('resetBtn'),
    nextBtn: document.getElementById('nextBtn'),
    closeErrorBtn: document.getElementById('closeErrorBtn'),
    successModal: document.getElementById('successModal'),
    errorModal: document.getElementById('errorModal'),
    successTitle: document.getElementById('successTitle'),
    successText: document.getElementById('successText'),
    successScore: document.getElementById('successScore'),
    successTime: document.getElementById('successTime'),
    expectedNumber: document.getElementById('expectedNumber'),
    levelPill: document.getElementById('levelPill'),
    timerPill: document.getElementById('timerPill'),
    mistakePill: document.getElementById('mistakePill'),
    progressSteps: document.getElementById('progressSteps'),
    progressLabel: document.getElementById('progressLabel'),
    progressBar: document.getElementById('progressBar'),
    levelKicker: document.getElementById('levelKicker'),
    levelTitle: document.getElementById('levelTitle'),
    levelDesc: document.getElementById('levelDesc'),
    boardTag: document.getElementById('boardTag'),
    hintCount: document.getElementById('hintCount'),
    scoreLabel: document.getElementById('scoreLabel'),
    sideScore: document.getElementById('sideScore'),
    sideMistakes: document.getElementById('sideMistakes'),
    sideProgress: document.getElementById('sideProgress'),
    toast: document.getElementById('toast'),
    confetti: document.getElementById('confetti'),
    cursorStar: document.getElementById('cursorStar'),
    categoryGrid: document.getElementById('categoryGrid'),
    fortuneResult: document.getElementById('fortuneResult'),
    fortuneShake: document.getElementById('fortuneShake'),
    reRollBtn: document.getElementById('reRollBtn'),
    playAgainBtn: document.getElementById('playAgainBtn')
  };

  const ctx = els.canvas.getContext('2d');
  const BASE_W = 1000;
  const BASE_H = 625;
  const SAVE_KEY = 'midautumn-connect-dots-v3';

  function validateLevelData() {
    const errors = [];
    if (!Array.isArray(LEVELS) || LEVELS.length !== 4) {
      errors.push(`Expected 4 levels, received ${Array.isArray(LEVELS) ? LEVELS.length : 0}.`);
    }
    (LEVELS || []).forEach(level => {
      if (!Number.isInteger(level.max) || !Array.isArray(level.points) || level.points.length !== level.max) {
        errors.push(`Level ${level.id}: max=${level.max}, points=${Array.isArray(level.points) ? level.points.length : 0}.`);
      }
      (level.points || []).forEach((point, idx) => {
        if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)) {
          errors.push(`Level ${level.id}: invalid coordinate at point ${idx + 1}.`);
        }
      });
    });
    if (errors.length) {
      console.error('[Game data validation]', errors.join(' | '));
      throw new Error('Dữ liệu level không hợp lệ: ' + errors.join(' | '));
    }
  }

  const state = {
    levelIndex: 0,
    progress: 0,
    path: [],
    isDragging: false,
    pointer: { x: 0, y: 0 },
    mistakes: 0,
    hints: 3,
    score: 0,
    levelScore: 0,
    startedAt: 0,
    timer: 0,
    timerId: null,
    levelSeconds: 0,
    completed: false,
    lastFortuneCategory: '',
    rafId: 0,
    dirty: true
  };

  function showScreen(screenEl) {
    [els.welcome, els.game, els.fortune].forEach(s => s.classList.remove('active'));
    screenEl.classList.add('active');
  }

  function formatTime(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function currentLevel() {
    return LEVELS[state.levelIndex];
  }

  function persist() {
    const payload = {
      levelIndex: state.levelIndex,
      score: state.score,
      completed: state.completed,
      levelSeconds: state.levelSeconds
    };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(payload)); } catch (_) {}
  }

  function loadPersisted() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Number.isInteger(saved.levelIndex)) state.levelIndex = Math.max(0, Math.min(3, saved.levelIndex));
      if (Number.isFinite(saved.score)) state.score = Math.max(0, saved.score);
      state.completed = Boolean(saved.completed);
      if (Number.isFinite(saved.levelSeconds)) state.levelSeconds = Math.max(0, saved.levelSeconds);
    } catch (_) {}
  }

  function buildProgressSteps() {
    els.progressSteps.innerHTML = LEVELS.map((level, i) => {
      const isCurrent = i === state.levelIndex;
      const isDone = i < state.levelIndex || (i === state.levelIndex && state.progress === level.max);
      return `
        <div class="progress-step ${isCurrent ? 'active' : ''} ${isDone ? 'done' : ''}">
          <span class="num">${isDone ? '✓' : i + 1}</span>
          <div><b>${level.short}</b><small>1 → ${level.max}</small></div>
        </div>`;
    }).join('');
  }

  function setLevelData() {
    const level = currentLevel();
    els.levelPill.textContent = `LEVEL ${state.levelIndex + 1}/4`;
    els.levelKicker.textContent = `LEVEL ${level.id} · ${level.difficulty.toUpperCase()}`;
    els.levelTitle.textContent = level.title;
    els.levelDesc.textContent = level.desc;
    els.boardTag.textContent = `${level.short} · 1 → ${level.max}`;
    els.ghostArt.src = level.art || '';
    els.ghostArt.style.display = level.art ? 'block' : 'none';
    els.progressLabel.textContent = `${state.progress} / ${level.max}`;
    els.progressBar.style.width = `${(state.progress / level.max) * 100}%`;
    els.hintCount.textContent = state.hints;
    els.sideScore.textContent = state.score;
    els.sideMistakes.textContent = state.mistakes;
    els.sideProgress.textContent = `${state.progress}/${level.max}`;
    els.scoreLabel.textContent = `${state.score} điểm`;
    buildProgressSteps();
  }

  function resetLevel() {
    state.progress = 0;
    state.path = [];
    state.isDragging = false;
    state.mistakes = 0;
    state.hints = 3;
    state.levelSeconds = 0;
    state.levelScore = 0;
    state.startedAt = performance.now();
    setLevelData();
    draw();
  }

  function startTimer() {
    clearInterval(state.timerId);
    state.timerId = setInterval(() => {
      if (!state.startedAt) return;
      state.levelSeconds = Math.floor((performance.now() - state.startedAt) / 1000);
      els.timerPill.textContent = `⏱ ${formatTime(state.levelSeconds)}`;
    }, 250);
  }

  function stopTimer() {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  function startGame() {
    showScreen(els.game);
    resetLevel();
    startTimer();
    resizeCanvas();
  }

  function boardRect() {
    return els.canvas.getBoundingClientRect();
  }

  function resizeCanvas() {
    const rect = boardRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.canvas.width = Math.round(rect.width * dpr);
    els.canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr * rect.width / BASE_W, 0, 0, dpr * rect.height / BASE_H, 0, 0);
    draw();
  }

  function clientToBase(clientX, clientY) {
    const rect = boardRect();
    return {
      x: (clientX - rect.left) / rect.width * BASE_W,
      y: (clientY - rect.top) / rect.height * BASE_H
    };
  }

  function distance(a, b) { return Math.hypot(a[0] - b.x, a[1] - b.y); }

  function pointByNumber(number) {
    return currentLevel().points[number - 1];
  }

  function drawBackgroundDecor(level) {
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#b76d35';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 10]);
    ctx.beginPath();
    ctx.arc(500, 312, 210, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (level.id === 1) {
      // Hoa văn trung tâm: chỉ mang tính trang trí, không phải điểm phải nối.
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = '#bc6930';
      ctx.lineWidth = 7;
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
        const x = 500 + 50 * Math.cos(a);
        const y = 315 + 50 * Math.sin(a);
        ctx.beginPath();
        ctx.arc(x, y, 23, a - 0.9, a + 0.9);
        ctx.stroke();
      }
    }

    if (level.id === 3) {
      // Dây treo đèn sao.
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#bd7738';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(500, 18); ctx.lineTo(500, 64); ctx.stroke();
      ctx.beginPath(); ctx.arc(500, 82, 18, 0, Math.PI * 2); ctx.stroke();
    }

    if (level.id === 4) {
      // Mặt trăng nền + vài dải lụa trang trí.
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#c47434';
      ctx.beginPath(); ctx.arc(770, 200, 150, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#cb7b3e'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(120,520); ctx.quadraticCurveTo(430,440,690,520); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(100,548); ctx.quadraticCurveTo(420,470,760,545); ctx.stroke();
    }
    ctx.restore();
  }

  function drawNode(x, y, number, stateClass) {
    // Numbers are hidden on the dots; `number` is used only for internal order/logic.
    const r = number === stateClass ? 14 : 11;
    const isNext = number === state.progress + 1 && state.progress < currentLevel().max;
    const isDone = number <= state.progress;

    ctx.save();
    if (isDone) {
      ctx.shadowColor = 'rgba(91,126,71,.35)';
      ctx.shadowBlur = 14;
    } else if (isNext) {
      ctx.shadowColor = 'rgba(232,91,41,.55)';
      ctx.shadowBlur = 24;
    } else {
      ctx.shadowColor = 'rgba(168,78,40,.16)';
      ctx.shadowBlur = 10;
    }

    ctx.fillStyle = isDone ? '#628456' : isNext ? '#cf512d' : '#c53f2c';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // No text/number is rendered inside the point.
    // The active target is identified only by a soft pulsing ring.
    if (isNext) {
      ctx.strokeStyle = 'rgba(255,215,104,.95)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 19 + Math.sin(Date.now() / 180) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCompletedPath() {
    const points = currentLevel().points;
    if (state.path.length < 2) return;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const grad = ctx.createLinearGradient(0, 0, BASE_W, BASE_H);
    grad.addColorStop(0, '#d65a2a'); grad.addColorStop(.52, '#f0a243'); grad.addColorStop(1, '#bb432c');
    ctx.strokeStyle = grad; ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(211,91,35,.24)'; ctx.shadowBlur = 10;
    ctx.beginPath();
    state.path.forEach((p, idx) => idx === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
    if (state.progress === points.length) ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();
    ctx.restore();
  }

  function drawLiveLine() {
    if (!state.isDragging || state.progress >= currentLevel().max) return;
    const start = pointByNumber(state.progress);
    const p = state.pointer;
    ctx.save();
    ctx.strokeStyle = 'rgba(204,81,44,.48)';
    ctx.lineWidth = 3;
    ctx.setLineDash([7, 7]);
    ctx.beginPath(); ctx.moveTo(start[0], start[1]); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.restore();
  }

  function paint() {
    ctx.clearRect(0, 0, BASE_W, BASE_H);
    const level = currentLevel();
    drawBackgroundDecor(level);
    drawCompletedPath();
    drawLiveLine();
    level.points.forEach((p, i) => drawNode(p[0], p[1], i + 1));
  }

  function draw() {
    state.dirty = true;
    if (state.rafId) return;
    state.rafId = requestAnimationFrame(() => {
      state.rafId = 0;
      if (state.dirty) {
        state.dirty = false;
        paint();
      }
    });
  }

  function pointerDown(event) {
    const p = clientToBase(event.clientX, event.clientY);
    if (state.progress >= currentLevel().max) return;
    const target = pointByNumber(state.progress + 1);
    if (!target) {
      showToast('Dữ liệu điểm của level chưa đủ.');
      return;
    }
    if (Math.hypot(target[0] - p.x, target[1] - p.y) <= 32) {
      state.isDragging = true;
      state.pointer = p;
      try { els.canvas.setPointerCapture(event.pointerId); } catch (_) {}
      draw();
    } else {
      registerMistake();
    }
  }

  function pointerMove(event) {
    if (!state.isDragging) return;
    state.pointer = clientToBase(event.clientX, event.clientY);
    draw();
  }

  function pointerUp(event) {
    if (!state.isDragging) return;
    state.pointer = clientToBase(event.clientX, event.clientY);
    const targetNumber = state.progress + 1;
    const target = pointByNumber(targetNumber);
    if (!target) {
      state.isDragging = false;
      showToast('Dữ liệu điểm của level chưa đủ.');
      return;
    }
    const d = Math.hypot(target[0] - state.pointer.x, target[1] - state.pointer.y);
    state.isDragging = false;
    if (d <= 34) {
      state.progress = targetNumber;
      state.path.push([...target]);
      const timeBonus = Math.max(1, 12 - Math.floor(state.levelSeconds / 15));
      state.levelScore += 6 + timeBonus;
      state.score += 6 + timeBonus;
      updateStats();
      if (state.progress === currentLevel().max) finishLevel();
    } else {
      registerMistake();
    }
    draw();
  }

  function registerMistake() {
    state.mistakes += 1;
    state.levelScore = Math.max(0, state.levelScore - 5);
    state.score = Math.max(0, state.score - 5);
    els.expectedNumber.textContent = state.progress + 1;
    els.errorModal.classList.add('open');
    els.errorModal.setAttribute('aria-hidden', 'false');
    updateStats();
  }

  function updateStats() {
    const level = currentLevel();
    els.levelPill.textContent = `LEVEL ${level.id}/4`;
    els.timerPill.textContent = `⏱ ${formatTime(state.levelSeconds)}`;
    els.mistakePill.textContent = `✦ ${state.mistakes} lỗi`;
    els.progressLabel.textContent = `${state.progress} / ${level.max}`;
    els.progressBar.style.width = `${(state.progress / level.max) * 100}%`;
    els.hintCount.textContent = state.hints;
    els.sideScore.textContent = state.score;
    els.sideMistakes.textContent = state.mistakes;
    els.sideProgress.textContent = `${state.progress}/${level.max}`;
    els.scoreLabel.textContent = `${state.score} điểm`;
    buildProgressSteps();
  }

  function finishLevel() {
    stopTimer();
    state.score += 50;
    state.levelScore += 50;
    els.successTitle.textContent = state.levelIndex < LEVELS.length - 1 ? 'Bạn làm được!' : 'Phá đảo thành công!';
    els.successText.textContent = `Đã nối đủ ${currentLevel().max} điểm của “${currentLevel().title}”.`;
    els.successScore.textContent = `+${state.levelScore} điểm`;
    els.successTime.textContent = formatTime(state.levelSeconds);
    els.nextBtn.textContent = state.levelIndex < LEVELS.length - 1 ? 'Chơi Level tiếp theo →' : 'Nhận 1 lần Gieo Quẻ ✦';
    els.successModal.classList.add('open');
    els.successModal.setAttribute('aria-hidden', 'false');
    burstConfetti();
    persist();
  }

  function nextLevel() {
    els.successModal.classList.remove('open');
    els.successModal.setAttribute('aria-hidden', 'true');
    if (state.levelIndex < LEVELS.length - 1) {
      state.levelIndex += 1;
      resetLevel();
      startTimer();
    } else {
      state.completed = true;
      persist();
      state.lastFortuneCategory = '';
      renderFortuneEmpty();
      showScreen(els.fortune);
    }
  }

  function useHint() {
    if (state.hints <= 0) {
      showToast('Bạn đã dùng hết 3 gợi ý của màn này.');
      return;
    }
    state.hints -= 1;
    const target = pointByNumber(state.progress + 1);
    const start = performance.now();
    const duration = 900;
    function pulse(now) {
      const t = (now - start) / duration;
      draw();
      if (t < 1) requestAnimationFrame(pulse);
      else updateStats();
    }
    requestAnimationFrame(pulse);
    showToast(`Gợi ý: số ${state.progress + 1} đang phát sáng.`);
    // A subtle manual pulse is painted by drawNode; this call ensures a visual refresh.
    void target;
  }

  function resetCurrent() {
    resetLevel();
    startTimer();
    showToast('Đã trộn lại toàn bộ điểm của màn này.');
  }

  function renderFortuneEmpty() {
    els.fortuneResult.className = 'fortune-result empty-state';
    els.fortuneResult.innerHTML = '<span class="result-seal">月</span><h3>Chọn một danh mục</h3><p>Quẻ sẽ xuất hiện tại đây.</p>';
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('selected'));
  }

  function chooseFortune(category) {
    state.lastFortuneCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.toggle('selected', btn.dataset.category === category));
    els.fortuneShake.classList.remove('shaking-now');
    void els.fortuneShake.offsetWidth;
    els.fortuneShake.classList.add('shaking-now');

    els.fortuneResult.className = 'fortune-result empty-state';
    els.fortuneResult.innerHTML = '<span class="result-seal">✦</span><h3>Đang gieo quẻ…</h3><p>Ống quẻ đang rung. Chờ một chút nhé.</p>';

    window.setTimeout(() => {
      const lines = FORTUNE_DATA[category] || [];
      const message = lines[Math.floor(Math.random() * lines.length)] || '';
      const behavior = CULTURE_BEHAVIORS[Math.floor(Math.random() * CULTURE_BEHAVIORS.length)];
      const finalText = message.replace('{behavior}', `<strong>${behavior}</strong>`);
      els.fortuneResult.className = 'fortune-result';
      els.fortuneResult.innerHTML = `
        <span class="result-seal">月</span>
        <div class="section-label">QUẺ ${category.toUpperCase()}</div>
        <div class="fortune-quote">${finalText}</div>
        <span class="fortune-tag">Một lời chúc · Một hành vi văn hóa · Một khởi đầu đẹp</span>`;
      burstConfetti(22);
    }, 950);
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => els.toast.classList.remove('show'), 1800);
  }

  function burstConfetti(count = 38) {
    els.confetti.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('i');
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${-10 - Math.random() * 15}%`;
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.animationDelay = `${Math.random() * .25}s`;
      el.style.animationDuration = `${1.25 + Math.random() * 1.05}s`;
      els.confetti.appendChild(el);
    }
    setTimeout(() => { els.confetti.innerHTML = ''; }, 2600);
  }

  function playAgain() {
    try { localStorage.removeItem(SAVE_KEY); } catch (_) {}
    stopTimer();
    state.levelIndex = 0;
    state.progress = 0;
    state.path = [];
    state.score = 0;
    state.mistakes = 0;
    state.hints = 3;
    state.completed = false;
    showScreen(els.welcome);
  }

  function bindEvents() {
    els.startBtn.addEventListener('click', startGame);
    els.nextBtn.addEventListener('click', nextLevel);
    els.closeErrorBtn.addEventListener('click', () => {
      els.errorModal.classList.remove('open');
      els.errorModal.setAttribute('aria-hidden', 'true');
    });
    els.hintBtn.addEventListener('click', useHint);
    els.resetBtn.addEventListener('click', resetCurrent);
    els.backBtn.addEventListener('click', () => {
      stopTimer();
      showScreen(els.welcome);
    });
    els.playAgainBtn.addEventListener('click', playAgain);
    els.reRollBtn.addEventListener('click', () => {
      chooseFortune(state.lastFortuneCategory || 'Sự nghiệp');
    });
    els.categoryGrid.addEventListener('click', event => {
      const button = event.target.closest('.category-btn');
      if (!button) return;
      chooseFortune(button.dataset.category);
    });

    els.canvas.addEventListener('pointerdown', pointerDown);
    els.canvas.addEventListener('pointermove', pointerMove);
    els.canvas.addEventListener('pointerup', pointerUp);
    els.canvas.addEventListener('pointercancel', () => { state.isDragging = false; draw(); });
    els.canvas.addEventListener('pointerleave', () => { if (state.isDragging) draw(); });

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        els.successModal.classList.remove('open');
        els.errorModal.classList.remove('open');
      }
    });

    window.addEventListener('mousemove', event => {
      els.cursorStar.classList.remove('hidden');
      els.cursorStar.style.left = `${event.clientX}px`;
      els.cursorStar.style.top = `${event.clientY}px`;
    });
    window.addEventListener('mouseleave', () => els.cursorStar.classList.add('hidden'));
  }

  // Override a small class so the shake animation can be re-triggered.
  const style = document.createElement('style');
  style.textContent = '.fortune-shake.shaking-now .fortune-tube{animation:shake .95s ease-in-out infinite}.fortune-shake.shaking-now .tube-cap{animation:shake .95s ease-in-out infinite}';
  document.head.appendChild(style);

  validateLevelData();
  loadPersisted();
  bindEvents();
  setLevelData();
  renderFortuneEmpty();

  // Keep the initial pointer cursor effect only on pointing devices.
  if (matchMedia('(pointer: coarse)').matches) els.cursorStar.classList.add('hidden');
})();
