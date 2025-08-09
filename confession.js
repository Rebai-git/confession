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

const stage4   = document.getElementById('stage4');
const overlay4 = document.getElementById('overlay4');

const stage5   = document.getElementById('stage5');
const stage5Img = document.getElementById('stage5Img');
const overlay5 = document.getElementById('overlay5');

const stage6   = document.getElementById('stage6');
const stage6Img = document.getElementById('stage6Img');
const overlay6 = document.getElementById('overlay6');

// ---------- DIALOGUE ----------
const lines2 = [
  "Hi Sts!!",
  "I have something to tell you",
  "For a long time, I couldn't tell you this"
];
const lines3 = [
  "I really really like you!"
];
const lines4 = [
  "I want to do a lot of things for you"
];
const lines5 = [
  "I really want to listen to your yappings!!"
];
const lines6 = [
  "I really want to support your fangirling!!" 
];

// ---------- STATE ----------
let currentStage = 1;
let typing = false;
const speed = 80;

let playedStage1 = false;
let readyForStage2 = false;

let idx2 = 0;
let idx3 = 0;
let idx4 = 0;
let idx5 = 0;
let idx6 = 0;

// ---------- Viewport fix for iOS ----------
function setVHVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVHVar();
window.addEventListener('resize', setVHVar);
window.addEventListener('orientationchange', setVHVar);

// ---------- HELPERS ----------
function setActive(stageNum) {
  [stage1, stage2, stage3, stage4, stage5, stage6].forEach(s => s.classList.remove('active'));
  if (stageNum === 1) stage1.classList.add('active');
  if (stageNum === 2) stage2.classList.add('active');
  if (stageNum === 3) stage3.classList.add('active');
  if (stageNum === 4) stage4.classList.add('active');
  if (stageNum === 5) stage5.classList.add('active');
  if (stageNum === 6) stage6.classList.add('active');
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
function advanceStage4() {
  if (typing || idx4 >= lines4.length) return;
  typeLine(lines4[idx4], overlay4, () => { idx4++; });
}
function advanceStage5() {
  if (typing || idx5 >= lines5.length) return;
  stage5Img.src = stage5Img.dataset.anim; // loop GIF
  typeLine(lines5[idx5], overlay5, () => { idx5++; });
}
function advanceStage6() {
  if (typing || idx6 >= lines6.length) return;
  stage6Img.src = stage6Img.dataset.anim; // loop GIF
  typeLine(lines6[idx6], overlay6, () => { idx6++; });
}

// ---------- STARTERS ----------
function startStage2() {
  setActive(2);
  idx2 = 0; overlay.textContent = "";
  advanceStage2();
}
function startStage3() {
  setActive(3);
  idx3 = 0; overlay3.textContent = "";
  advanceStage3();
}
function fadeToStage4() {
  stage4.classList.add('active', 'fade-in');
  currentStage = 4;
  idx4 = 0; overlay4.textContent = "";
  setTimeout(() => advanceStage4(), 350);
  setTimeout(() => {
    stage4.classList.remove('fade-in');
    stage1.classList.remove('active');
    stage2.classList.remove('active');
    stage3.classList.remove('active');
  }, 650);
}
function startStage5() {
  setActive(5);
  idx5 = 0; overlay5.textContent = "";
  advanceStage5();
}
function startStage6() {
  setActive(6);
  idx6 = 0; overlay6.textContent = "";
  advanceStage6();
}

// ---------- TAP HANDLER ----------
document.addEventListener('pointerdown', () => {
  if (currentStage === 1) {
    if (!playedStage1 && !typing) {
      playedStage1 = true;
      initialText.textContent = "";
      initialImg.src = initialImg.dataset.anim;
      setTimeout(() => { typeLine("", initialText, () => { readyForStage2 = true; }); }, 3500);
      return;
    }
    if (readyForStage2 && !typing) { startStage2(); return; }
  }
  if (currentStage === 2 && !typing) {
    if (idx2 < lines2.length) advanceStage2();
    else startStage3();
    return;
  }
  if (currentStage === 3 && !typing) {
    if (idx3 < lines3.length) advanceStage3();
    else fadeToStage4();
    return;
  }
  if (currentStage === 4 && !typing) {
    if (idx4 < lines4.length) advanceStage4();
    else startStage5();
    return;
  }
  if (currentStage === 5 && !typing) {
    if (idx5 < lines5.length) advanceStage5();
    else startStage6();
    return;
  }
  if (currentStage === 6 && !typing) {
    if (idx6 < lines6.length) advanceStage6();
    // else: end
  }
}, { passive: true });

// ---------- INITIAL PROMPT ----------
window.addEventListener('load', () => {
  typeLine("Touch here", initialText);
});
