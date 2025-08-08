// ---------- ELEMENTS ----------
const stage1       = document.getElementById('stage1');
const initialImg   = document.getElementById('initialImg');
const initialText  = document.getElementById('initialText');

const stage2        = document.getElementById('stage2');
const confessionImg = document.getElementById('confessionImg');
const overlay       = document.getElementById('overlay');

const stage3   = document.getElementById('stage3');
const nextImg  = document.getElementById('nextImg');
const overlay3 = document.getElementById('overlay3');

// ---------- DIALOGUE ----------
const lines2 = [
  "Hi Sts!!",
  "I wanted to tell you something",
  "For a long time, I couldn't tell you this"
];

const lines3 = [
  "I really really like you!"
];

// ---------- STATE ----------
let currentStage = 1;   // 1, 2, 3
let typing = false;
const speed = 80;       // ms per character

let playedStage1 = false;     // whether Stage 1 GIF has played
let readyForStage2 = false;   // after greeting typed

let idx2 = 0;
let idx3 = 0;

// ---------- MOBILE VIEWPORT FIX (older iOS) ----------
function setVHVar() {
  // Sets --vh to the actual innerHeight so calc(var(--vh)*100) = full visible height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVHVar();
window.addEventListener('resize', setVHVar);
window.addEventListener('orientationchange', setVHVar);

// ---------- HELPERS ----------
function setActive(stageNum) {
  [stage1, stage2, stage3].forEach(s => s.classList.remove('active'));
  if (stageNum === 1) stage1.classList.add('active');
  if (stageNum === 2) stage2.classList.add('active');
  if (stageNum === 3) stage3.classList.add('active');
  currentStage = stageNum;
}

function typeLine(text, el, done) {
  typing = true;
  el.textContent = "";
  let i = 0;
  (function step() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(step, speed);
    } else {
      typing = false;
      if (done) done();
    }
  })();
}

// ---------- STAGE 2 / 3 ADVANCE ----------
function advanceStage2() {
  if (typing || idx2 >= lines2.length) return;
  confessionImg.src = confessionImg.dataset.anim;  // play GIF
  typeLine(lines2[idx2], overlay, () => {
    confessionImg.src = confessionImg.dataset.static; // freeze to still
    idx2++;
  });
}

function advanceStage3() {
  if (typing || idx3 >= lines3.length) return;
  nextImg.src = nextImg.dataset.anim;  // play GIF
  typeLine(lines3[idx3], overlay3, () => {
    nextImg.src = nextImg.dataset.static; // freeze to still
    idx3++;
  });
}

// ---------- STAGE SWITCHERS ----------
function startStage2() {
  setActive(2);
  idx2 = 0;
  overlay.textContent = "";
  advanceStage2();
}

function startStage3() {
  setActive(3);
  idx3 = 0;
  overlay3.textContent = "";
  advanceStage3();
}

// ---------- GLOBAL TAP HANDLER ----------
document.addEventListener('pointerdown', () => {
  // Stage 1 flow
  if (currentStage === 1) {
    if (!playedStage1 && !typing) {
      playedStage1 = true;

      // Clear "Touch here" immediately, play GIF
      initialText.textContent = "";
      initialImg.src = initialImg.dataset.anim;

      // After ~3.5s, (optionally) type a greeting; then allow next tap to go to Stage 2
      setTimeout(() => {
        // If you want a greeting here, put text instead of "" below
        typeLine("", initialText, () => {
          readyForStage2 = true;
        });
      }, 3500);
      return;
    }
    if (readyForStage2 && !typing) {
      startStage2();
      return;
    }
  }

  // Stage 2 flow
  if (currentStage === 2 && !typing) {
    if (idx2 < lines2.length) {
      advanceStage2();
    } else {
      // Finished Stage 2 → next stage
      startStage3();
    }
    return;
  }

  // Stage 3 flow
  if (currentStage === 3 && !typing) {
    if (idx3 < lines3.length) {
      advanceStage3();
    }
    // else: end (add final screen or restart here)
  }
}, { passive: true });

// ---------- INITIAL PROMPT ----------
window.addEventListener('load', () => {
  // type "Touch here" inside Stage 1 frame
  typeLine("Touch here", initialText);
});
