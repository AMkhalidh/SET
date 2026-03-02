(() => {

/* Splash */
const splash = document.getElementById("splash");
document.getElementById("enterGame").onclick = () => {
  splash.classList.add("hide");
  setTimeout(() => splash.style.display = "none", 600);
};

/* Data */
const COLORS=[
 {key:"red",stroke:"#ff4d6d",fill:"rgba(255,77,109,.2)"},
 {key:"green",stroke:"#2ee59d",fill:"rgba(46,229,157,.2)"},
 {key:"purple",stroke:"#b36bff",fill:"rgba(179,107,255,.2)"}
];
const SHAPES=["oval","diamond","squiggle"];
const NUMBERS=[1,2,3];

let deck=[], board=[], selected=new Set(), score=0, started=false;
let startMs=0, timer=null;

/* DOM */
const grid=document.getElementById("grid");
const msg=document.getElementById("msg");
const timeEl=document.getElementById("time");
const scoreEl=document.getElementById("score");
const leftEl=document.getElementById("cardsLeft");

/* Utils */
function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function makeDeck(){
  let d=[],id=0;
  for(const c of COLORS)
    for(const s of SHAPES)
      for(const n of NUMBERS)
        d.push({id:id++,color:c.key,shape:s,number:n});
  return shuffle(d);
}

function allSame(v){ return v[0]===v[1]&&v[1]===v[2]; }
function allDiff(v){ return v[0]!==v[1]&&v[0]!==v[2]&&v[1]!==v[2]; }

function isSet(a,b,c){
  return (allSame([a.color,b.color,c.color])||allDiff([a.color,b.color,c.color])) &&
         (allSame([a.shape,b.shape,c.shape])||allDiff([a.shape,b.shape,c.shape])) &&
         (allSame([a.number,b.number,c.number])||allDiff([a.number,b.number,c.number]));
}

/* SVG */
function path(s){
  if(s==="oval")return"M30 30 C30 12 55 8 85 8 L115 8 C145 8 170 12 170 30 C170 48 145 52 115 52 L85 52 C55 52 30 48 30 30 Z";
  if(s==="diamond")return"M100 8 L170 30 L100 52 L30 30 Z";
  return"M35 40 C50 55 80 55 95 40 C110 25 140 25 165 40 C150 25 135 10 110 14 C85 18 75 30 55 26 C35 22 25 30 35 40 Z";
}

function cardSVG(c){
  const col=COLORS.find(x=>x.key===c.color);
  let out="";
  for(let i=0;i<c.number;i++){
    out+=`<svg class="shapeSvg" viewBox="0 0 200 60">
      <path d="${path(c.shape)}" fill="${col.fill}" stroke="${col.stroke}" stroke-width="6"/>
    </svg>`;
  }
  return `<div class="shapes">${out}</div>`;
}

/* Render */
function render(){
  grid.innerHTML="";
  board.forEach(card=>{
    const d=document.createElement("div");
    d.className="card";
    if(selected.has(card.id)) d.classList.add("selected");
    d.innerHTML=cardSVG(card);
    d.onclick=()=>pick(card.id);
    grid.appendChild(d);
  });
  scoreEl.textContent=score;
  leftEl.textContent=deck.length+board.length;
}

/* Game */
function start(){
  deck=makeDeck();
  board=deck.splice(0,9);
  selected.clear();
  score=0;
  started=true;
  startMs=performance.now();
  timer=setInterval(()=>{
    const t=Math.floor((performance.now()-startMs)/1000);
    timeEl.textContent=`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;
  },500);
  msg.innerHTML="Find a <strong>set</strong> by selecting 3 cards!";
  render();
}

function pick(id){
  if(!started) return;
  if(selected.has(id)) selected.delete(id);
  else if(selected.size<3) selected.add(id);
  render();

  if(selected.size===3){
    const [a,b,c]=[...selected].map(i=>board.find(x=>x.id===i));
    if(isSet(a,b,c)){
      score++;
      msg.innerHTML="🎉 Correct set!";
      board=board.filter(x=>!selected.has(x.id)).concat(deck.splice(0,3));
    }else{
      msg.innerHTML="⚠️ Nearly there! Check the last feature.";
    }
    selected.clear();
    render();
  }
}

/* Buttons */
document.getElementById("btnNew").onclick=start;
document.getElementById("btnEnd").onclick=()=>{ started=false; clearInterval(timer); msg.innerHTML="Game ended."; };
document.getElementById("btnHint").onclick=()=> msg.innerHTML="Tip: check colour → shape → number.";

/* ===== Tutorial Slideshow ===== */
const overlay = document.getElementById("overlay");
const slideEl = document.getElementById("slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const btnTutorial = document.getElementById("btnTutorial");
const btnCloseTutorial = document.getElementById("btnCloseTutorial");

let slideIndex = 0;

const slides = [
  `<h3>Welcome to SET (for beginners)</h3>
   <p>Select <strong>3 cards</strong> to form a set.</p>`,

  `<h3>The Rule</h3>
   <p>For <strong>each feature</strong>:</p>
   <ul>
     <li>All the same, OR</li>
     <li>All different</li>
   </ul>`,

  `<h3>Checking order</h3>
   <p>Colour → Shape → Number</p>`,

  `<h3>Controls</h3>
   <p>Use <strong>Hint</strong> if stuck.</p>`,

  `<h3>Ready?</h3>
   <p>Close this tutorial and try!</p>`
];

function renderSlide(){
  slideEl.innerHTML = slides[slideIndex];
  prevBtn.disabled = slideIndex === 0;
  nextBtn.textContent =
    slideIndex === slides.length - 1 ? "Done ✓" : "Next ▶";
}

function openTutorial(){
  overlay.classList.add("open");
  slideIndex = 0;
  renderSlide();
}

function closeTutorial(){
  overlay.classList.remove("open");
}

btnTutorial.addEventListener("click", openTutorial);
btnCloseTutorial.addEventListener("click", closeTutorial);

prevBtn.addEventListener("click", () => {
  slideIndex = Math.max(0, slideIndex - 1);
  renderSlide();
});

nextBtn.addEventListener("click", () => {
  if(slideIndex >= slides.length - 1){
    closeTutorial();
    return;
  }
  slideIndex++;
  renderSlide();
});

/* click outside closes modal */
overlay.addEventListener("click", e => {
  if(e.target === overlay) closeTutorial();
});

/* esc key closes modal */
window.addEventListener("keydown", e => {
  if(e.key === "Escape" && overlay.classList.contains("open")){
    closeTutorial();
  }
});

})();