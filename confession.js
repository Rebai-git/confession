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

const stage5    = document.getElementById('stage5');
const stage5Img = document.getElementById('stage5Img');
const overlay5  = document.getElementById('overlay5');

const stage6    = document.getElementById('stage6');
const stage6Img = document.getElementById('stage6Img');
const overlay6  = document.getElementById('overlay6');

// NEW: 7–13
const stage7    = document.getElementById('stage7');
const stage7Img = document.getElementById('stage7Img');
const overlay7  = document.getElementById('overlay7');

const stage8    = document.getElementById('stage8');
const stage8Img = document.getElementById('stage8Img');
const overlay8  = document.getElementById('overlay8');

const stage9    = document.getElementById('stage9');
const stage9Img = document.getElementById('stage9Img');
const overlay9  = document.getElementById('overlay9');

const stage10    = document.getElementById('stage10');
const stage10Img = document.getElementById('stage10Img');
const overlay10  = document.getElementById('overlay10');

const stage11    = document.getElementById('stage11');
const stage11Img = document.getElementById('stage11Img');
const overlay11  = document.getElementById('overlay11');

const stage12    = document.getElementById('stage12');
const stage12Img = document.getElementById('stage12Img');
const overlay12  = document.getElementById('overlay12');

const stage13   = document.getElementById('stage13');
const overlay13 = document.getElementById('overlay13');

// ---------- DIALOGUE ----------
const lines2 = [
  "Hi Sts!!",
  "I want to tell you something",
];
const lines3 = [
  "I really really love you!"
];
const lines4 = [
  "I really want to do a lot of things for you..."
];
const lines5 = [
  "I really want to listen to your yappings!"
];
const lines6 = [
  "I really want to support your fangirling!"
];
const lines7  = [
  "I really want to treat you the best", "and I want to support you in every possible way"
];
const lines8  = [
  "I really want to heal you..." , "and make you the happiest person in the world"
];
const lines9  = [
  "but instead,because of my overthinking and my lack of social skills...", "I've made things awkward, annoying and put even more emotional burden on you",
  "I'm really sorry about that"
];
const lines10 = [
  "Now, I want to know how you feel about me and all of this. And..."
];
const lines11 = [
  "If you'd love to give me a chance, I would love to fix all my mistakes and...", "I will try my best to be the person you deserve"
];
const lines12 = [
  "Of course, it is obviously fine if you don't feel the same", " I’d still love to have a platonic relationship if you’re okay with it", " After all, it would be my loss to let go of someone as amazing as you!!"
];
const lines13 = [
  "Thanks for reading till the end."
];

// ---------- STATE ----------
let currentStage = 1;
let typing = false;
const speed = 80;

let playedStage1 = false;
let readyForStage2 = false;

let idx2 = 0, idx3 = 0, idx4 = 0, idx5 = 0, idx6 = 0;
let idx7 = 0, idx8 = 0, idx9 = 0, idx10 = 0, idx11 = 0, idx12 = 0, idx13 = 0;

// ---------- Viewport fix for iOS ----------
function setVHVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVHVar();
window.addEventListener('resize', setVHVar);
window.addEventListener('orientationchange', setVHVar);

// ---------- MAPPINGS / HELPERS ----------
const stageOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13];

function overlayFor(n){
  return ({
    1: initialText, 2: overlay, 3: overlay3, 4: overlay4, 5: overlay5, 6: overlay6,
    7: overlay7, 8: overlay8, 9: overlay9, 10: overlay10, 11: overlay11, 12: overlay12, 13: overlay13
  })[n];
}
function imgFor(n){
  return ({
    2: confessionImg, 3: nextImg, 5: stage5Img, 6: stage6Img, 7: stage7Img, 8: stage8Img, 9: stage9Img,
    10: stage10Img, 11: stage11Img, 12: stage12Img
  })[n] || null;
}
function linesFor(n){
  return ({
    2: lines2, 3: lines3, 4: lines4, 5: lines5, 6: lines6,
    7: lines7, 8: lines8, 9: lines9, 10: lines10, 11: lines11, 12: lines12, 13: lines13
  })[n] || [];
}
function stageType(n){
  if (n === 1) return 'intro';
  if (n === 4 || n === 13) return 'black';
  // animate during typing then revert to static:
  if ([2,3,10,11,12].includes(n)) return 'animStatic';
  // looping gif while typing:
  if ([5,6,7,8,9].includes(n)) return 'loop';
  return 'unknown';
}
function getIdx(n){
  switch(n){
    case 2: return idx2; case 3: return idx3; case 4: return idx4; case 5: return idx5; case 6: return idx6;
    case 7: return idx7; case 8: return idx8; case 9: return idx9; case 10: return idx10; case 11: return idx11;
    case 12: return idx12; case 13: return idx13; default: return 0;
  }
}
function setIdx(n, v){
  switch(n){
    case 2: idx2=v; break; case 3: idx3=v; break; case 4: idx4=v; break; case 5: idx5=v; break; case 6: idx6=v; break;
    case 7: idx7=v; break; case 8: idx8=v; break; case 9: idx9=v; break; case 10: idx10=v; break; case 11: idx11=v; break;
    case 12: idx12=v; break; case 13: idx13=v; break;
  }
}

function setActive(stageNum) {
  [stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13]
    .forEach(s => s.classList.remove('active'));
  const table = {1:stage1,2:stage2,3:stage3,4:stage4,5:stage5,6:stage6,7:stage7,8:stage8,9:stage9,10:stage10,11:stage11,12:stage12,13:stage13};
  table[stageNum].classList.add('active');
  currentStage = stageNum;
}

function nextStageOf(n){
  const i = stageOrder.indexOf(n);
  return i >= 0 && i < stageOrder.length-1 ? stageOrder[i+1] : n;
}
function prevStageOf(n){
  const i = stageOrder.indexOf(n);
  return i > 0 ? stageOrder[i-1] : n;
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

// Re-render a line when moving backwards or jumping
function renderLine(n, i){
  const arr = linesFor(n);
  const el  = overlayFor(n);
  const img = imgFor(n);

  if (!arr.length) { if (el) el.textContent = ""; return; }

  // Clamp i
  i = Math.max(0, Math.min(i, arr.length-1));
  el.textContent = arr[i];

  // Set appropriate image state
  const t = stageType(n);
  if (img) {
    if (t === 'animStatic') {
      // show static when not actively typing
      if (img.dataset && img.dataset.static) img.src = img.dataset.static;
    } else if (t === 'loop') {
      // keep looping gif
      if (img.dataset && img.dataset.anim) img.src = img.dataset.anim;
    }
  }
}

// ---------- ADVANCERS (forward) ----------
function advanceStage2() {
  const arr=lines2; if (typing || idx2 >= arr.length) return;
  if (confessionImg.dataset && confessionImg.dataset.anim) confessionImg.src = confessionImg.dataset.anim;
  typeLine(arr[idx2], overlay, () => {
    if (confessionImg.dataset && confessionImg.dataset.static) confessionImg.src = confessionImg.dataset.static;
    idx2++;
  });
}
function advanceStage3() {
  const arr=lines3; if (typing || idx3 >= arr.length) return;
  if (nextImg.dataset && nextImg.dataset.anim) nextImg.src = nextImg.dataset.anim;
  typeLine(arr[idx3], overlay3, () => {
    if (nextImg.dataset && nextImg.dataset.static) nextImg.src = nextImg.dataset.static;
    idx3++;
  });
}
function advanceStage4() {
  if (typing || idx4 >= lines4.length) return;
  typeLine(lines4[idx4], overlay4, () => { idx4++; });
}
function advanceStage5() {
  if (typing || idx5 >= lines5.length) return;
  if (stage5Img.dataset && stage5Img.dataset.anim) stage5Img.src = stage5Img.dataset.anim;
  typeLine(lines5[idx5], overlay5, () => { idx5++; });
}
function advanceStage6() {
  if (typing || idx6 >= lines6.length) return;
  if (stage6Img.dataset && stage6Img.dataset.anim) stage6Img.src = stage6Img.dataset.anim;
  typeLine(lines6[idx6], overlay6, () => { idx6++; });
}
function advanceStage7() {
  if (typing || idx7 >= lines7.length) return;
  if (stage7Img.dataset && stage7Img.dataset.anim) stage7Img.src = stage7Img.dataset.anim;
  typeLine(lines7[idx7], overlay7, () => { idx7++; });
}
function advanceStage8() {
  if (typing || idx8 >= lines8.length) return;
  if (stage8Img.dataset && stage8Img.dataset.anim) stage8Img.src = stage8Img.dataset.anim;
  typeLine(lines8[idx8], overlay8, () => { idx8++; });
}
function advanceStage9() {
  if (typing || idx9 >= lines9.length) return;
  if (stage9Img.dataset && stage9Img.dataset.anim) stage9Img.src = stage9Img.dataset.anim;
  typeLine(lines9[idx9], overlay9, () => { idx9++; });
}
function advanceStage10(){
  if (typing || idx10>=lines10.length) return;
  if (stage10Img.dataset && stage10Img.dataset.anim) stage10Img.src=stage10Img.dataset.anim;
  typeLine(lines10[idx10], overlay10, () => {
    if (stage10Img.dataset && stage10Img.dataset.static) stage10Img.src=stage10Img.dataset.static;
    idx10++;
  });
}
function advanceStage11(){
  if (typing || idx11>=lines11.length) return;
  if (stage11Img.dataset && stage11Img.dataset.anim) stage11Img.src=stage11Img.dataset.anim;
  typeLine(lines11[idx11], overlay11, () => {
    if (stage11Img.dataset && stage11Img.dataset.static) stage11Img.src=stage11Img.dataset.static;
    idx11++;
  });
}
function advanceStage12(){
  if (typing || idx12>=lines12.length) return;
  if (stage12Img.dataset && stage12Img.dataset.anim) stage12Img.src=stage12Img.dataset.anim;
  typeLine(lines12[idx12], overlay12, () => {
    if (stage12Img.dataset && stage12Img.dataset.static) stage12Img.src=stage12Img.dataset.static;
    idx12++;
  });
}
function advanceStage13(){
  if (typing || idx13>=lines13.length) return;
  typeLine(lines13[idx13], overlay13, ()=>{ idx13++; });
}

// ---------- STARTERS ----------
function startStage2(){ setActive(2); idx2=0; overlay.textContent=""; advanceStage2(); }
function startStage3(){ setActive(3); idx3=0; overlay3.textContent=""; advanceStage3(); }
function fadeToStage4() {
  stage4.classList.add('active', 'fade-in');
  currentStage = 4;
  idx4 = 0; overlay4.textContent = "";
  setTimeout(() => advanceStage4(), 350);
  setTimeout(() => {
    stage4.classList.remove('fade-in');
    stage1.classList.remove('active'); stage2.classList.remove('active'); stage3.classList.remove('active');
  }, 650);
}
function startStage5(){ setActive(5); idx5=0; overlay5.textContent=""; advanceStage5(); }
function startStage6(){ setActive(6); idx6=0; overlay6.textContent=""; advanceStage6(); }
function startStage7(){ setActive(7); idx7=0; overlay7.textContent=""; advanceStage7(); }
function startStage8(){ setActive(8); idx8=0; overlay8.textContent=""; advanceStage8(); }
function startStage9(){ setActive(9); idx9=0; overlay9.textContent=""; advanceStage9(); }
function startStage10(){ setActive(10); idx10=0; overlay10.textContent=""; advanceStage10(); }
function startStage11(){ setActive(11); idx11=0; overlay11.textContent=""; advanceStage11(); }
function startStage12(){ setActive(12); idx12=0; overlay12.textContent=""; advanceStage12(); }
function startStage13(){ setActive(13); idx13=0; overlay13.textContent=""; advanceStage13(); }

// ---------- FLOW HELPERS ----------
function startStage(n){
  switch(n){
    case 2: startStage2(); break; case 3: startStage3(); break; case 4: setActive(4); idx4=0; overlay4.textContent=""; advanceStage4(); break;
    case 5: startStage5(); break; case 6: startStage6(); break; case 7: startStage7(); break; case 8: startStage8(); break; case 9: startStage9(); break;
    case 10: startStage10(); break; case 11: startStage11(); break; case 12: startStage12(); break; case 13: startStage13(); break;
  }
}

function advanceForCurrent(){
  if (currentStage === 1) {
    if (!playedStage1) {
      playedStage1 = true;
      initialText.textContent = "Touch bottom-half to next and upper-half to previous";
      if (initialImg.dataset && initialImg.dataset.anim) initialImg.src = initialImg.dataset.anim;
      setTimeout(() => {
        // after a short beat, allow moving to stage 2
        readyForStage2 = true;
      }, 2500);
      return;
    }
    if (readyForStage2) { startStage2(); return; }
    return;
  }

  const n = currentStage;
  const arr = linesFor(n);
  const i = getIdx(n);

  const advMap = {
    2: advanceStage2, 3: advanceStage3, 4: advanceStage4, 5: advanceStage5, 6: advanceStage6,
    7: advanceStage7, 8: advanceStage8, 9: advanceStage9, 10: advanceStage10, 11: advanceStage11,
    12: advanceStage12, 13: advanceStage13
  };

  if (i < arr.length) { advMap[n](); return; }

  // move to next stage
  const next = nextStageOf(n);
  if (next !== n) startStage(next);
}

function goPrev(){
  if (currentStage === 1) return;

  const n = currentStage;
  const arr = linesFor(n);
  let i = getIdx(n);

  // If we have shown at least one line in this stage, go to previous line
  if (arr.length && i > 0) {
    i = i - 1; setIdx(n, i);
    renderLine(n, i);
    return;
  }

  // Otherwise go to previous stage (and show its last line fully)
  const prev = prevStageOf(n);
  setActive(prev);

  const prevArr = linesFor(prev);
  if (!prevArr.length) {
    if (prev === 1) {
      if (initialImg.dataset && initialImg.dataset.anim) initialImg.src = initialImg.dataset.anim;
      initialText.textContent = "Touch here";
      playedStage1 = true; // so a bottom-half tap goes forward
    }
    return;
  }

  const lastIdx = prevArr.length - 1;
  setIdx(prev, lastIdx + 1); // idx means "next to show"
  renderLine(prev, lastIdx);
}

function goNext(){
  advanceForCurrent();
}

// ---------- TAP HANDLER (position-aware) ----------
document.addEventListener('pointerdown', (e) => {
  // Block ALL input while a line is typing (no skipping)
  if (typing) return;

  const isBottomHalf = e.clientY >= (window.innerHeight / 2);
  if (isBottomHalf) {
    goNext();
  } else {
    goPrev();
  }
}, { passive: true });

// ---------- INITIAL PROMPT ----------
window.addEventListener('load', () => {
  typeLine("Touch here", initialText);
});
