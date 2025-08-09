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

const stage4   = document.getElementById('stage4');   // NEW
const finalImg = document.getElementById('finalImg'); // NEW
const overlay4 = document.getElementById('overlay4'); // NEW

// ---------- DIALOGUE ----------
const lines2 = [
  "Hi Sts!!",
  "I wanted to tell you something",
  "For a long time, I couldn't tell you this"
];

const lines3 = [
  "I really really like you!"
];

// NEW: lines for stage 4 (edit as you like)
const lines4 = [
  "I want to listen to your yappings"
];

// ---------- STATE ----------
let currentStage = 1;   // 1, 2, 3, 4
let typing = false;
const speed = 80;       // ms per character

let playedStage1 = false;
let readyForStage2 = false;

let idx2 = 0;
let idx3 = 0;
let idx4 = 0;

// ---------- iOS viewport fallback ----------
function setVHVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVHVar();
window.addEventListener('resize', setVHVar);
window.addEventListener('orientationchange', setVHVar);

// ---------- HELPERS ----------
function setActive(stageNum) {
  [stage1, stage2, stage3, stage4].forEach(s => s.classList.remove('active'));
  if (stageNum === 1) stage1.classList.add('active');
  if (stageNum === 2) stage2.classList.add('active');
  if (stageNum === 3) stage3.classList.add('active');
  if (stageNum === 4) stage4.classList.add('active');
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

// ---------- ADVANCERS ----------
function advanceStage2() {
  if (typing || idx2 >= lines2.length) return;
  confessionImg.src = confessionImg.dataset.anim;
  typeLine(lines2[idx2], overlay, () => {
    confessionImg.src = confessionImg.dataset.static;
    idx2++;
  });
}

function advanceStage3() {
  if (typing || idx3 >= lines3.length) return;
  nextImg.src = nextImg.dataset.anim;
  typeLine(lines3[idx3], overlay3, () => {
    nextImg.src = nextImg.dataset.static;
    idx3++;
  });
}

// NEW
function advanceStage4() {
  if (typing || idx4 >= lines4.length) return;
  finalImg.src = finalImg.dataset.anim;
  typeLine(lines4[idx4], overlay4, () => {
    idx4++;
  });
}

// ---------- STARTERS ----------
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

// NEW
function startStage4() {
  setActive(4);
  idx4 = 0;
  overlay4.textContent = "";
  advanceStage4();
}

// ---------- GLOBAL TAP HANDLER ----------
document.addEventListener('pointerdown', () => {
  // Stage 1
  if (currentStage === 1) {
    if (!playedStage1 && !typing) {
      playedStage1 = true;
      initialText.textContent = "";
      initialImg.src = initialImg.dataset.anim;
      setTimeout(() => {
        typeLine("", initialText, () => { readyForStage2 = true; });
      }, 3500);
      return;
    }
    if (readyForStage2 && !typing) { startStage2(); return; }
  }

  // Stage 2
  if (currentStage === 2 && !typing) {
    if (idx2 < lines2.length) advanceStage2();
    else startStage3();
    return;
  }

  // Stage 3
  if (currentStage === 3 && !typing) {
    if (idx3 < lines3.length) advanceStage3();
    else startStage4(); // when done, go to Stage 4
    return;
  }

  // Stage 4
  if (currentStage === 4 && !typing) {
    if (idx4 < lines4.length) {
      advanceStage4();
    }
    // else: end. Add restart logic here if you want.
  }
}, { passive: true });

// ---------- INITIAL PROMPT ----------
window.addEventListener('load', () => {
  typeLine("Touch here", initialText);
});
