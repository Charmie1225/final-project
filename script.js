/****************************************************
 * - Takes from Open Trivia DB (https://opentdb.com/)
 * - Falls back to a small local bank if offline
 ****************************************************/

/* CATEGORY MAP (our names -> OpenTDB category ids) */
const CATEGORIES = [
  { key:"all",       label:"All",               otdb:null },
  { key:"general",   label:"General",           otdb:9  }, // General Knowledge
  { key:"literature",label:"Literature",        otdb:10 }, // Books
  { key:"movies",    label:"Movies",            otdb:11 }, // Film
  { key:"sports",    label:"Sports",            otdb:21 },
  { key:"geography", label:"Geography",         otdb:22 },
  { key:"history",   label:"History",           otdb:23 },
  { key:"science",   label:"Science & Nature",  otdb:17 },
  { key:"computer",  label:"Computers",         otdb:18 },
  { key:"math",      label:"Mathematics",       otdb:19 },
  // Biology doesn’t have its own bucket—use Science & Nature (17)
  { key:"biology",   label:"Biology (Science)", otdb:17 },
];

/* Fallback local questions (short; used only if fetch fails) */
const FALLBACK = [
  {cat:"science",   q:"Symbol for water?", a:["H2O","O2","CO2","H2"], correct:0},
  {cat:"science",   q:"Largest organ?", a:["Skin","Brain","Liver","Heart"], correct:0},
  {cat:"computer",  q:"HTML stands for…", a:["Hyper Text Markup Language","Hyperlink Text ML","High Text ML","Hyper Transfer ML"], correct:0},
  {cat:"computer",  q:"API stands for…", a:["Application Programming Interface","Advanced Programming Integration","Artificial Programming Intelligence","Application Processing Integration"], correct:0},
  {cat:"biology",   q:"Basic unit of life?", a:["Cell","Tissue","Organ","Molecule"], correct:0},
  {cat:"math",      q:"7 × 8 =", a:["54","56","58","60"], correct:1},
  {cat:"history",   q:"First U.S. President?", a:["Lincoln","Washington","Jefferson","Adams"], correct:1},
  {cat:"geography", q:"Largest ocean?", a:["Atlantic","Indian","Pacific","Arctic"], correct:2},
  {cat:"literature",q:"Author of '1984'?", a:["George Orwell","Aldous Huxley","Ray Bradbury","J.D. Salinger"], correct:0},
  {cat:"sports",    q:"Players per soccer team on field?", a:["9","10","11","12"], correct:2},
  {cat:"movies",    q:"First MCU movie?", a:["Iron Man","The Avengers","Captain America","Thor"], correct:0},
  {cat:"general",   q:"How many continents?", a:["5","6","7","8"], correct:2},
];

let state = {
  items: [],
  i: 0,
  answers: new Map(), // index -> choice
  startAt: 0,
  deadline: 0,
  timerId: null,
  settings: { cat:"all", diff:"any", count:20, minutes:5, shuffle:true },
};

const elSetup = document.getElementById('setup');
const elSetupForm = document.getElementById('setupForm');
const elQuiz = document.getElementById('quiz');
const elResults = document.getElementById('results');

const elQuestion = document.getElementById('questionText');
const elAnswers = document.getElementById('answers');
const elCounter = document.getElementById('counter');
const elProgress = document.getElementById('progressBar');
const elTimer = document.getElementById('timer');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

const reviewList = document.getElementById('reviewList');
const scorePct = document.getElementById('scorePct');
const scoreRaw = document.getElementById('scoreRaw');
const timeUsed = document.getElementById('timeUsed');


const pad2 = n => String(n).padStart(2,'0');
const fmt = ms => {
  const s = Math.max(0, Math.floor(ms/1000));
  return `${pad2(Math.floor(s/60))}:${pad2(s%60)}`;
};
const decodeHTML = str => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};
const shuffle = arr => arr.sort(()=>Math.random()-0.5);


(function fillCategorySelect(){
  const sel = document.getElementById('category');
  sel.innerHTML = '';
  CATEGORIES.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.key; opt.textContent = c.label;
    sel.appendChild(opt);
  });
})();


async function fetchOpenTDB({catKey, diff, count}) {
  // If "all", we can omit the category filter
  const cat = CATEGORIES.find(c=>c.key===catKey);
  const params = new URLSearchParams({ amount: String(count), type: 'multiple' });
  if (cat && cat.otdb) params.set('category', String(cat.otdb));
  if (diff && diff !== 'any') params.set('difficulty', diff);

  const url = `https://opentdb.com/api.php?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch questions.');
  const data = await res.json();
  if (!data || !Array.isArray(data.results) || data.results.length === 0) throw new Error('No questions returned.');


  return data.results.map(r => {
    const all = [...r.incorrect_answers, r.correct_answer].map(decodeHTML);
    const shuffled = shuffle(all);
    const correctIndex = shuffled.indexOf(decodeHTML(r.correct_answer));
    // Try to infer category key back to our set
    const inferred = (catKey==='all')
      ? (CATEGORIES.find(c=>c.otdb && r.category.toLowerCase().includes(c.label.toLowerCase()))?.key || 'general')
      : catKey;
    return {
      cat: inferred,
      q: decodeHTML(r.question),
      a: shuffled,
      correct: correctIndex
    };
  });
}


function buildFromFallback({catKey, count}) {
  let items;
  if (catKey === 'all') items = [...FALLBACK];
  else items = FALLBACK.filter(q => q.cat === catKey);
  const pool = items.length ? items : FALLBACK;
  const times = Math.ceil(count / pool.length);
  const expanded = [];
  for (let i=0;i<times;i++) expanded.push(...pool);
  return shuffle(expanded).slice(0, count);
}


elSetupForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const cat = document.getElementById('category').value;
  const diff = document.getElementById('difficulty').value;
  const count = Math.max(5, Math.min(50, Number(document.getElementById('count').value) || 20));
  const minutes = Math.max(0, Math.min(60, Number(document.getElementById('minutes').value) || 0));
  const doShuffle = document.getElementById('shuffle').checked;

  state.settings = { cat, diff, count, minutes, shuffle: doShuffle };

  try {
    let items = await fetchOpenTDB({catKey: cat, diff, count});
    if (doShuffle) shuffle(items);
    state.items = items.slice(0, count);
  } catch (err) {
    console.warn('Falling back to local bank:', err?.message || err);
    state.items = buildFromFallback({catKey: cat, count});
  }

  startQuiz();
});


function startQuiz(){
  state.i = 0;
  state.answers.clear();
  elSetup.classList.add('hidden');
  elQuiz.classList.remove('hidden');
  elResults.classList.add('hidden');

  state.startAt = Date.now();
  state.deadline = state.settings.minutes > 0 ? Date.now() + state.settings.minutes*60000 : 0;
  if (state.deadline){
    elTimer.textContent = fmt(state.deadline - Date.now());
    clearInterval(state.timerId);
    state.timerId = setInterval(()=>{
      const left = state.deadline - Date.now();
      elTimer.textContent = fmt(left);
      if (left <= 0){
        clearInterval(state.timerId);
        finish();
      }
    }, 250);
  } else {
    elTimer.textContent = '—';
  }

  render();
}

function render(){
  const total = state.items.length || 1;
  const i = state.i;
  elCounter.textContent = `Q ${Math.min(i+1,total)}/${total}`;
  elProgress.style.width = (total <= 1 ? 0 : (i/(total-1))*100) + '%';

  const item = state.items[i] || {q:'No questions found', a:[]};
  elQuestion.textContent = item.q;

  // answers
  elAnswers.innerHTML = '';
  item.a.forEach((text, idx)=>{
    const id = `q${i}_${idx}`;
    const label = document.createElement('label');
    label.className = 'answer';
    label.innerHTML = `<input type="radio" name="q${i}" id="${id}" value="${idx}"> <span>${text}</span>`;
    elAnswers.appendChild(label);
  });

  // restore selection
  const choice = state.answers.get(i);
  if (choice != null){
    const input = elAnswers.querySelector(`input[value="${choice}"]`);
    if (input) input.checked = true;
  }

  prevBtn.disabled = i === 0;
  nextBtn.disabled = i >= total-1;
}

elAnswers.addEventListener('change', e=>{
  const pick = Number(e.target.value);
  if (!Number.isNaN(pick)){
    state.answers.set(state.i, pick);
  }
});

prevBtn.addEventListener('click', ()=>{
  if (state.i > 0){ state.i--; render(); }
});
nextBtn.addEventListener('click', ()=>{
  if (state.i < state.items.length - 1){ state.i++; render(); }
});
submitBtn.addEventListener('click', finish);


function finish(){
  clearInterval(state.timerId);
  elQuiz.classList.add('hidden');
  elResults.classList.remove('hidden');

  let correct = 0;
  const frag = document.createDocumentFragment();

  state.items.forEach((q, idx)=>{
    const li = document.createElement('li');
    const pick = state.answers.get(idx);
    if (pick === q.correct) correct++;

    const your = pick != null ? q.a[pick] : '(no answer)';
    const right = q.a[q.correct];

    li.innerHTML = `<strong>Q${idx+1}:</strong> ${q.q}<br>
      <em>Your answer:</em> ${your}<br>
      <em>Correct:</em> ${right}`;
    frag.appendChild(li);
  });

  reviewList.innerHTML = '';
  reviewList.appendChild(frag);

  scoreRaw.textContent = `${correct}/${state.items.length || 0}`;
  scorePct.textContent = state.items.length ? Math.round((correct/state.items.length)*100) + '%' : '0%';

  const used = Date.now() - state.startAt;
  timeUsed.textContent = `${Math.floor(used/60000)}:${pad2(Math.floor((used%60000)/1000))}`;
}

document.getElementById('retryBtn').addEventListener('click', ()=>{
  // restart with same settings and refetch to keep 20+ available
  elResults.classList.add('hidden');
  elSetup.classList.remove('hidden');
});

document.getElementById('newQuizBtn').addEventListener('click', ()=>{
  clearInterval(state.timerId);
  elResults.classList.add('hidden');
  elSetup.classList.remove('hidden');
});


document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.getElementById(btn.dataset.open)?.showModal();
  });
});

window.addEventListener('keydown', (e)=>{
  if (elQuiz.classList.contains('hidden')) return;
  if (e.key >= '1' && e.key <= '4'){
    const idx = Number(e.key) - 1;
    const input = elAnswers.querySelector(`input[value="${idx}"]`);
    if (input){ input.checked = true; elAnswers.dispatchEvent(new Event('change')); }
  } else if (e.key.toLowerCase() === 'n'){ nextBtn.click(); }
  else if (e.key.toLowerCase() === 'p'){ prevBtn.click(); }
  else if (e.key === 'Enter'){ submitBtn.click(); }
});

