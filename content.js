const isInsideIframe = window !== window.top;
let videoref ;
let subtitlename = "" ;
let lastVideoId;
let SHORTCUT_KEY =  "KeyB"
// Injecting Search Board with shortcut
if(!isInsideIframe){
  let cardSub;
  let card;
  let tempcatg ;
  let tempall ;
  let temptvshows ;
  let tempmovies;
  let CachedSession;
  let CachedEp;
  let query;
  let state;
  let subtitlesC = [];
  let timer;
  let secTimer;
  let epTimer;
  let fetchOn = false;
 
    const css = `
  #notificationCont-sub.Subexclose{
    opacity:0;
  }
  #btn{
    background-color: #5863F8;
    color:  #efe9f4;
    border: black 2px solid;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  #btn:hover{
    color: black;
    border: black 2px solid;
    background-color: white;
  }
  #Deattachbtn{
    background-color: #171d1c;
    color: white;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
    border: black 1px solid;
  }
  #Deattachbtn:hover{
    background-color: white;
    color: #171d1c;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  #support{
    background-color: #efe9f4;
    color: black;
    border: black .5px solid;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  #support:hover{
    background-color: white;
    color:  #171d1c;
    border: black 1px solid;
  }
  .Subexopen #subExResults{
    overflow-x:hidden
  }
  .buttn,.buttn1,.buttn2{
    position: relative;
    transition: all 1200ms ease-in-out;
  }
  .after{
    left: 1%;
    margin-top: 0.5px;
    transform-origin: center;
    position: absolute;
    display: inline-block;
    background: linear-gradient(107deg,rgba(46, 46, 58, 1) 0%, rgba(88, 99, 248, 1) 62%);
    width: 30px;
    height: 31px;
    z-index: -20;
    animation-duration: 1200ms;
    animation-timing-function: ease-in-out;
  }
  .after.phase{
    animation-name: animation2!important;
    animation-fill-mode: forwards;
  }
  .after.phase2{
    animation-name: animation3!important;
    animation-fill-mode: forwards;
  }
  .after.Phasereverse{
    animation-name: animation2rev!important;
  }
  .after.Phase2reverse{
    animation-name: animation3rev!important;
  }
  .focus{
    opacity: 1!important;
  }
  .unfocus{
    opacity: 0!important;
  }
  #subarrow-back{
    display: none;
    position: absolute;
    left: 0;
    z-index: 600;
    margin: 50px 0 0 20px;
    padding: 5px;
    color: #272d2d;
    cursor: pointer;
  }
  #searchcont::after {
    content: "";
    position: absolute;
    right: -100%;
    display: inline-block;
    background-color: #f4f7f5;
    width: 100%;
    height: 39px;
    z-index: 20;
  }      
  #searchcont::before {
    content: "";
    position: absolute;
    left: -95%;
    display: inline-block;
    background-color: #f4f7f5;
    width: 100%;
    height: 47px;
    z-index: 20;
  }
  #subInplace {
    animation: Lftright 8s linear infinite ; 
    font-size: 14px; 
  }
  .subtitle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: #ffffff;
    color: #000000;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 8px;
    font-family: sans-serif;
    transition: 0.2s;
  }
  .download-btn:hover {
    transform: scale(1.02);
    background: #b3b3ff;
  }
  /* LEFT */
  .left .lang {
    background: #4caf50;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
  }
  .middle {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-size: 14px;
    margin: 0;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  .release {
    font-size: 12px;
    color: #000000;
    margin: 2px 0;
    word-break: break-word;
  }
  .right {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .download-btn{
    outline: none;
    border: none;
    padding: 6px 3px;
    border-radius: 6px;
    margin: 0;
    text-align: center;
    align-items: center;
    font-family:cursive;
    font-size: 12px;
    background-color: transparent;
    cursor: cell;
     color: #000000;
  }
  .meta {
    display: flex;
    gap: 8px;
    font-size: 11px;
    margin-top: 4px;
  }
  .tag {
    background: #ff9800;
    padding: 2px 5px;
    border-radius: 5px;
  }
  .subPanel{
    display:none;     
    direction: ltr!important;
    transition: all 0.25s ease;
  }
  .subPanel.Subexclose{
    opacity:0;
  }
  .subPanel.Subexopen{
      display: flex;
      animation: .45s ease-out 0s 1 normal none running FadeIn;
  }
  .Card.fade{
        animation: 0.85s ease-out 0s 1 normal none running CardFadeIn;

  }
  /* RIGHT */
  .redirect-btn {
    text-decoration: none;
    transition: 0.2s;
  }
  .redirect-btn:hover {
    opacity: .7;
  }
  @keyframes animation2rev {
    0%{ transform: translateY(0) translateX(160%); border-radius: 2px; }
    20%{ transform: translateY(0) translateX(100%); }
    50%{ border-radius: 30px; }
    100%{ transform: translateY(0) translateX(0); border-radius: 2px; }
  }
  @keyframes animation2 {
    0%{ transform: translateY(0) translateX(0); border-radius: 2px; }
    50%{ border-radius: 30px; }
    80%{ transform: translateY(0) translateX(100%); }
    100%{ transform: translateY(0) translateX(160%); border-radius: 2px; }
  }
  @keyframes animation3rev {
    0%{ transform: translateY(0) translateX(420%); border-radius: 2px; }
    20%{ transform: translateY(0) translateX(320%); }
    50%{ border-radius: 30px; }
    100%{ transform: translateY(0) translateX(200%); border-radius: 2px; }
  }
  @keyframes animation3 {
    0%{ transform: translateY(0) translateX(270%); border-radius: 2px; }
    50%{ border-radius: 30px; }
    100%{ transform: translateY(0) translateX(445%); border-radius: 2px; }
  }
  @keyframes Lftright { to{ transform: translateY(-50%) translateX(110%); } }
  @keyframes FadeIn { 0%{
    opacity:0
  }
  ,
  100%{
      opacity:1
  } }
  @keyframes CardFadeIn { 0%{
    opacity:0;
    transform: scale(0.8);
  }
  ,
  100%{
      opacity:1;
    transform: scale(1);

  } }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  let notify;
  let listenForclicks;
 chrome.storage.local.get("APPEND_NOTIFICATION",(res)=>{
    if (chrome.runtime.lastError) return;
      if (!res.APPEND_NOTIFICATION) {
        notify = document.createElement("div")
    notify.id = "notificationCont-sub"
    notify.style.cssText = `    
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      direction: ltr;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      transition: all 0.25s ease;
      backdrop-filter: blur(4px);
      `
      notify.innerHTML = `<div id="notification-sub" style="
      font-family: cursive;
      font-size: 14px;
      width: 60%;
      padding: 10px 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: rgba(255,255,255,0.85);
      color: #333;
      border-radius: 10px;
      border: 1px solid rgba(0,0,0,0.1);
      backdrop-filter: blur(6px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: all 0.25s ease;
    ">
      Press 
      <span style="
        display:inline-block;
        padding:2px 6px;
        margin:0 3px;
        font-size:11px;
        user-select:none;
        font-weight:600;
        background:#5863F8;
        color:white;
        border-radius:5px;
        box-shadow: inset 0 -2px 0 rgba(0,0,0,0.94);
      ">Ctrl</span> 
      + 
      <span style="
        display:inline-block;
        padding:2px 6px;
        margin:0 3px;
        user-select:none;
        font-size:11px;
        font-weight:600;
        background:#5863F8;
        color:white;
        border-radius:5px;
        box-shadow: inset 0 -2px 0 rgba(0,0,0,0.94);
      ">B</span> 
      to open the search panel for a better experience
    </div>`
    listenForclicks = function (){
      
      document.removeEventListener("click",listenForclicks)
      notify.classList.add('Subexclose')
      chrome.storage.local.set({ APPEND_NOTIFICATION: true });
      setTimeout(() => {
        notify.remove()
        let pan = document.getElementsByClassName('subPanel')[0] 
        if(pan){
          pan.classList.add("Subexopen")
          setTimeout(() => {
            pan.classList.add("Subexclose")
            setTimeout(()=>{
              pan.classList.remove("Subexopen")
              pan.classList.remove("Subexclose")
            },700)
          }, 1200);
        }
      }, 600);
    }
    document.addEventListener("click",listenForclicks)
    document.body.appendChild(notify)
    }}
  )

  let Panel = document.createElement('div')
  document.addEventListener("keydown",(e)=>{
    if(e?.key?.toLowerCase() == "escape"){
        if(Panel.classList.contains('Subexopen')){
          Panel.classList.remove('Subexopen')
          CacheData()

        }
    }
    if(e.ctrlKey && e?.code == SHORTCUT_KEY){
        e.preventDefault();
        e.stopPropagation();
        if(notify){
          if(listenForclicks){
            document.removeEventListener("click",listenForclicks)
          }
          notify.classList.add('Subexclose')
          chrome.storage.local.set({ APPEND_NOTIFICATION: true });
          setTimeout(() => {
            notify.remove()
          }, 600);
        }
        if(Panel.classList.contains('Subexopen')){
          Panel.classList.remove('Subexopen')
          CacheData()

        }else{
          Panel.classList.add('Subexopen')
          searchinput?.focus()
          function CheckIfClickedOutsideOfThePanel(Ce){
            if(!document.getElementById('subExResults').contains(Ce.target)){
              Panel.classList.remove('Subexopen')
              CacheData()
              document.removeEventListener("click",CheckIfClickedOutsideOfThePanel)
            }
          }
          document.addEventListener("click",CheckIfClickedOutsideOfThePanel)
        }
    }

  })

  Panel.style.cssText =`position: fixed;
  justify-content: center;    
  align-items: flex-start;backdrop-filter: blur(4px);
    z-index: 99999;    
    inset: 0px;
    background: rgba(0, 0, 0, 0.5);padding-top:15vh;`
  Panel.className = "subPanel"
  Panel.innerHTML =  `
  <div id="subExResults" style="border-radius: 30px;position: fixed;padding:7px 12px;background: #f4f7f5;    backdrop-filter: blur(4px);
width: 100%;height: 100%;max-height: 67vh;left: 50%;top: 40%;transform: translate(-50%,-50%);z-index: 9999;max-width: 931px;">

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" id="subarrow-back" viewBox="0 0 24 24" style="display: none;">
      <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"></path>
    </svg>
    <ul id="subex-list" style="display: flex; gap: 20px; flex-flow: wrap; list-style: none; margin: 0px; padding: 10px 16px;">
    <div id="MenuNav" style="position: relative; display: flex; padding: 10px 0px 0px; width: 100%; gap: 9px;">
      <div class="after"></div>
      <button class="buttn" style="z-index: 30;padding: 5px 10px; background-color: rgb(88, 99, 248); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px;">
      All
  <span class=".wrapper0 focus" style="display: inline-flex; justify-content: center; align-items: center; padding: 5px 10px; opacity: 0; width: max-content; pointer-events: none; z-index: 50; top: 50%; left: 0px; background-color: rgb(46, 46, 58); transform: translate(0px, -50%); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px; transition: 1200ms ease-in-out; position: absolute;">All</span>
      
      </button>
      <button class="buttn1" style="z-index: 30;padding: 5px 10px; background-color: rgb(88, 99, 248); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px;">Tv shows
      <span class=".wrapper1" style="display: inline-flex; justify-content: center; align-items: center; padding: 5px 10px; opacity: 0; width: max-content; pointer-events: none; z-index: 50; top: 50%; left: 0px; background-color: rgb(46, 46, 58); transform: translate(0px, -50%); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px; transition: 1200ms ease-in-out; position: absolute;">Tv shows
      </span>
      </button>
      <button class="buttn2" style="z-index: 30;padding: 5px 10px; background-color: rgb(88, 99, 248); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px;">Movies<span class=".wrapper2" style="display: inline-flex; justify-content: center; align-items: center; padding: 5px 10px; opacity: 0; width: max-content; pointer-events: none; z-index: 50; top: 50%; left: 0px; background-color: rgb(46, 46, 58); transform: translate(0px, -50%); color: white; font-family: cursive; border-top: 2px solid black; border-bottom: 2px solid black; border-right: none; border-left: none; border-radius: 8px; transition: 1200ms ease-in-out; position: absolute;">Movies
      </span>
      </button>
      <div id="searchcont" style="margin-top:6px; 
        width: 50%;
        display: flex;
        justify-content: center; 
        position: relative;  
        align-items: center;
        gap: 4px;
        border-bottom: 2px solid #adacb5;">
        <label id="subcomment" style="position: absolute;top: 50%;right: 10%;transform: translate(-50%,-50%);width: 100%;text-align: center;color: #ff000073;pointer-events: none;margin-top: -0.05rem;font-size: 10px;font-weight: bold;opacity: 0;">Nothing Found</label>
        <label id="subInplace" style="position: absolute; top: 50%; left: -30%; transform: translate(-50%, -50%); width: 100%; text-align: center; color: rgb(169, 169, 169); pointer-events: none; margin-top: -0.05rem; opacity: 1;">Search movies and TV shows</label>
        <svg style="z-index: 30;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="subexSearch" style="outline: none;border: none;padding: 5px 20px 5px 5px;background-color: transparent;width: 100%;position: relative;color: black;">
      </div>
    </div>
    </ul>
  </div>
  `
  document.body.appendChild(Panel)
  let searchinput = document.getElementById('subexSearch');
  const ul = document.getElementById('subex-list');
  document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("download-btn") && !fetchOn){
    let fileid = e.target.dataset.id
    let release = e.target.dataset.release
    fetchOn = true
    chrome.runtime.sendMessage({action:'FetchAndinject',data:{fileid,release}},(respnose)=>{
        e.target.innerHTML = 'Injected'
        document.getElementById("remaining-cont").style.display = "flex"
        document.getElementById("remaining-down").innerHTML = `Remaining Downloads:<span style="color:green">${respnose.remaining}</span>`
        setTimeout(() => {
          e.target.innerHTML = 'Inject Subtitles'
          fetchOn = false
        }, 4000);

    })
  }
})
  let comment = document.getElementById('subcomment');
  const arrow = document.getElementById('subarrow-back');

  function Checkstorage(){
    chrome.runtime.sendMessage({ type: 'CACHED_VALUES'},
      (result) => {
            if (chrome.runtime.lastError) return; 
            if(result.state && !state){
                state = result.state
              }else{
                state = "All"
              }
              if(state == "All"){
                query = result.searchtitle || null
                ul.innerHTML = ''
                tempcatg = result.catg
                temptvshows = result.tvshows 
                tempmovies = result.movies
                tempall = result.searchdata

                if(!result.catg){
                  tempcatg = "All"
                  CreateNav(0)
                  appenData(result.searchdata)
                }
                else if(result.catg == "All"&&
                  Array.isArray(result?.searchdata) &&
                  result.searchdata.length > 0
                ){
                  CreateNav(0)
                  comment.style.opacity = 0  
                  appenData(result.searchdata)
                }
                else if(result.catg == "Tv shows" && Array.isArray(result?.tvshows.results) &&result.tvshows.results?.length > 0){
                  CreateNav(1)
                  comment.style.opacity = 0
                  appenData(result.tvshows.results)
                }
                else if(result.catg == "Movies" &&Array.isArray(result?.movies?.results) &&result.movies.results?.length > 0){
                  CreateNav(2)
                  comment.style.opacity = 0
                  appenData(result.movies.results)
                }
                searchinput.value = result.searchtitle || null
                document.getElementById('subInplace').style.animation = "none"
                document.getElementById('subInplace').style.opacity = 0

              }
              else{
                if(result.card){
                  ul.innerHTML = ''
                  let isTv = result.card.media_type == "tv"
                  let [li,card] = CreateCard(result.card,isTv)
                  cardSub = result.cardSub
                  CachedSession = +result.CachedSession
                  CachedEp = +result.CachedEp
                  cardSelect(result.card,li,isTv,result.cardSub)
                  ul.parentElement.style.display = 'block'
                }

          
          }
      }
    );
  }
  Checkstorage()
  searchinput.addEventListener(('input'), (e)=>{
      query = e.target.value
      fetchTvshowMv()
    })
  arrow.addEventListener("click",()=>{
    state = "All"
    CachedEp = null
    CachedSession = null
    CacheData(Checkstorage)
  })
  function fetchTvshowMv() {
      clearTimeout(timer)
      if(query?.length < 1){
        comment.style.opacity = 0
         document.getElementById('subInplace').style.animation = "Lftright 8s linear infinite"
         document.getElementById('subInplace').style.opacity = 1
        return
    }
       document.getElementById('subInplace').style.animation = "none"
       document.getElementById('subInplace').style.opacity = 0
      comment.style.opacity = 0

      if(query?.length < 2)return
      timer = setTimeout(async()=> {
        // Fetching the data
        const res = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
              "Content-Type": "application/json"
            }
          }
        );
        const movies = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
              "Content-Type": "application/json"
            }
          }
        );
        const tvData = await res.json();
        tvData.results = tvData.results.map((e)=>{
          return {...e, media_type:"tv"}
        })
        const moviesData = await movies.json();
        moviesData.results = moviesData.results.map((e)=>{
          return {...e, media_type:"movie"}
        })
        let Data = [...tvData.results,...moviesData.results]
        // removing the old search values
        ul.querySelectorAll('li').forEach((item)=>item.remove())

        // console.log(Data)
        // console.log(tempcatg)
        
        if(Data?.length < 1){
          comment = document.getElementById('subcomment');
          // ul.innerHTML = `<h2>No Search results</h2>`
          comment.style.opacity = 1 
        }else{
          if(!document.getElementById('MenuNav')){
            CreateNav(0)
          }
          if(tempcatg){
            if(tempcatg == "All"){
              appenData(Data)
            }else if(tempcatg == "Tv shows"){
              appenData(tvData.results)
            }else{
              appenData(moviesData.results)
            }
          }else{
            tempcatg = "All"
            appenData(Data)
          }

        }
        // Storing the data
        tempmovies = moviesData
        temptvshows = tvData
        tempall = Data
    },700)
  }
  function CacheData(fn){
  chrome.runtime.sendMessage(
    { type: 'CACHE_VALUES', state, card,cardSub, tempcatg, CachedSession, CachedEp,tempmovies,temptvshows,tempall,query},(response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
          if(fn){
            fn()                 
          }
        }
    });
  }
  function CreateNav(focusIndex){
    const catg = document.createElement("div");
    const line = document.createElement("div");
    const after = document.createElement("div");
    const searchcoun = document.createElement("div");
    searchcoun.id = "searchcont"
    searchcoun.style.cssText = `margin-top:6px; 
        width: 50%;
        display: flex;
        justify-content: center; 
        position: relative;  
        align-items: center;
        gap: 4px;
        border-bottom: 2px solid #adacb5;`
    searchcoun.innerHTML = `<label id="subcomment" style="position: absolute;top: 50%;right: 10%;transform: translate(-50%,-50%);width: 100%;text-align: center;color: #ff000073;pointer-events: none;margin-top: -0.05rem;font-size: 10px;font-weight: bold;opacity: 0;">Nothing Found</label>
        <label id="subInplace" style="position: absolute; top: 50%; left: -30%; transform: translate(-50%, -50%); width: 100%; text-align: center; color: rgb(169, 169, 169); pointer-events: none; margin-top: -0.05rem; opacity: 1;">Search movies and TV shows</label>
        <svg style="z-index: 30;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="subexSearch" style="outline: none;border: none;padding: 5px 20px 5px 5px;background-color: transparent;width: 100%;position: relative;color: black;">` 
    let anim= ["phase","phase2"]
    line.style.cssText = "margin-top:-7px;width:100%;height:2px;background-color:grey;"
    after.className = "after"
    catg.id = "MenuNav"
    catg.appendChild(after)
    catg.style.position = "relative";
    let text = ["All","Tv shows","Movies"]
    let classes = ["buttn","buttn1","buttn2"]
    let wrappers = []
    let buttons = []
    catg.style.display = 'flex'
    catg.style.padding = '10px 0px 0px 0px'
    catg.style.width = "100%"
    catg.style.gap = '9px'
    text.forEach((text,i)=>{
      let buttn = document.createElement("button")
      buttn.style.cssText =`z-index: 30; padding: 5px 10px;background-color:#5863F8;color:white;font-family: cursive;  border-top: 2px solid black;
      border-bottom: 2px solid black;
      border-right: none;
      border-left: none;
      border-radius: 8px`
      buttn.innerText = text
      buttn.className = classes[i]
      const wrapper = document.createElement("span");
      wrapper.style.cssText =`display: inline-flex;justify-content: center;align-items: center;padding: 5px 10px;opacity:0;width:max-content;pointer-events: none;z-index:50;top:50%;left:0;background-color:#2e2e3a;transform: translate(0, -50%);color:white;font-family: cursive;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      border-right: none;
      border-left: none;
      border-radius: 8px;transition: all 1200ms ease-in-out;`
      wrapper.innerText = text
      wrapper.className = `.wrapper${i}`
      wrapper.style.position = "absolute"
      function playAnimation(el, className) {
          el.classList.remove(
            'phase',
            'phase2',
            'Phasereverse',
            'Phase2reverse'
          );
          requestAnimationFrame(() => {
            el.classList.add(className);
          });
      }
      buttn.addEventListener("click",(b)=>{

        wrapper.classList.remove('unfocus')
        wrapper.classList.add('focus')
        if(i ==0){
          if(tempcatg != "All"){
            // chrome.storage.local.set({catg:"All"})
            tempcatg = "All"
            ul.querySelectorAll('li').forEach((item)=>item.remove())
            if(temptvshows?.results || tempmovies?.results){
             appenData([...temptvshows?.results,...tempmovies?.results])
            }}
            after.style.background = "linear-gradient(107deg,rgba(46, 46, 58, 0.91) 0%, rgba(88, 99, 248, 1) 62%)"
          if(after.classList.contains('phase2')){
            after.classList.remove("phase2");
            playAnimation(after,'Phase2reverse')
            setTimeout(()=>{
              playAnimation(after,'Phasereverse')
            },1200)
          }
          if(after.classList.contains('phase') || after.classList.contains('Phase2reverse')){
            after.classList.remove("phase","Phase2reverse");
            playAnimation(after,'Phasereverse')
          }
        }
        if(i ==1){
          if(tempcatg != "Tv shows"){
            // chrome.storage.local.set({catg:"Tv shows"})
            tempcatg = "Tv shows"
            ul.querySelectorAll('li').forEach((item)=>item.remove())
            if(temptvshows?.results){
              appenData(temptvshows.results)
            }
          }
          if(after.classList.contains('phase2')){
            after.style.background = "linear-gradient(107deg,rgba(46, 46, 58, 0.91) 0%, rgba(88, 99, 248, 1) 62%)"
            after.classList.remove("phase2");
            playAnimation(after,'Phase2reverse')
          }
          else if(!after.classList.contains('phase')){
            after.style.background = "linear-gradient(107deg,rgba(88, 99, 248, 1) 0%, rgba(46, 46, 58, 0.91) 62%)"
            playAnimation(after,'phase')
          }
        }
        if(i ==2){
          if(tempcatg != "Movies"){
            // chrome.storage.local.set({catg:"Movies"})

            tempcatg = "Movies"
            ul.querySelectorAll('li').forEach((item)=>item.remove())
            if(tempmovies?.results){
              appenData(tempmovies.results)
          }
          }
          after.style.background = "linear-gradient(107deg,rgba(88, 99, 248, 1) 0%, rgba(46, 46, 58, 0.91) 62%)"
          if(after.classList.contains('phase') ||  after.classList.contains('Phase2reverse')){
            after.classList.remove("phase","phase2");
            playAnimation(after,'phase2')
          }
          else if(!after.classList.contains('phase')){
            playAnimation(after,'phase')
            setTimeout(()=>{
              playAnimation(after,'phase2')
            },1200)
          }
        }
        wrappers.forEach((v,g)=>{
          if(v.classList.contains('focus') && i != g){
            v.classList.remove('focus')
            v.classList.add('unfocus')
          }
        })

      })
      buttn.appendChild(wrapper)
      wrappers.push(wrapper)
      buttons.push(buttn)
      catg.appendChild(buttn)
    })
    focusIndex != 0 && after.classList.add(anim[focusIndex - 1])
    wrappers[focusIndex].classList.add('focus')
    catg.appendChild(searchcoun)
    ul.appendChild(catg)
    ul.appendChild(line)
    searchinput = document.getElementById('subexSearch')
    searchinput.addEventListener(('input'), (e)=>{
        query = e.target.value
        fetchTvshowMv()
    })
}
  function appenData(data){
    if(data?.length > 0){
      // Discarding data with vote count less that 1
      data.forEach((show,i)=>{if(show.vote_count > 0){appendresult(show,i)}})
    }
  }
  function appendresult(show,i){
    state = "All"
    // chrome.storage.local.set({state:"All"})
    arrow.style.display = 'none';
    comment.style.opacity = 0
    let isTv = show?.media_type == "tv"
    let [li,card] = CreateCard(show,isTv)    
    ul.style.flexDirection = "row";
    ul.parentElement.style.display = 'block'
    card.addEventListener("click",(e)=>cardSelect(show,li,isTv,cardSub))
    ul.appendChild(li)
  }
  async function cardSelect(show,li,isTv,cardSub){
    // Vars    
    state = "Single";
    card = show
    let imdbjson;
    let tvDetails ;
    let MovieDetails ;

    // chrome.storage.local.set({state:"Single",card:show})
    arrow.style.display = 'block';
    li.style.display = 'block';
    let results = document.createElement('div')
    let controlbar = document.createElement('div')
    let selectContainer = document.createElement('div')

    // labels
    let Sessionlabel;
    let Eplabel;
    let Sessionselect ;
    let Epselect;
    let Languagelabel = document.createElement('label')

    // select
    let langselect = document.createElement('select')
    let All = document.createElement('option')
    let dict = new Set()
    let fetchsubdiv = document.createElement('div')
    let fetchSubButton = document.createElement('button')
    let Remaining = document.createElement('div')

    ul.innerHTML = ''
    ul.style.display = 'flex'
    ul.style.alignItems = 'center'
    ul.style.flexDirection = "column";
    ul.appendChild(li)
    langselect.appendChild(All)
    selectContainer.appendChild(Languagelabel)
    selectContainer.appendChild(langselect)


  if(isTv){
    Sessionlabel  = document.createElement('label')
    Eplabel = document.createElement('label')
    Sessionselect = document.createElement('select')
    Epselect= document.createElement('select')

    Sessionselect.id = 'Session'
    Epselect.id = 'Episode'
    Sessionlabel.innerHTML = 'Session:'
    Eplabel.innerHTML = 'Episode:'
    Sessionlabel.setAttribute("for",'Session')
    Eplabel.setAttribute("for",'Episode')


    function addEps(change) {
        const value = Sessionselect.value;
        let object = tvDetails.seasons.filter((session)=>session.season_number == value)[0]
        Epselect.innerHTML = ''
        for(let i =1;i <= object.episode_count;i++){
          let option = document.createElement('option')
          option.value = i
          option.innerText = i
          Epselect.appendChild(option)
        }
        fetchOnChange(change)
    }



    Epselect.addEventListener("change",()=>{
      clearTimeout(epTimer)
      epTimer = setTimeout(()=>{
        CachedEp = Epselect.value
        fetchOnChange(true)
      }
  , 1600);
    });  
    Sessionselect.addEventListener("change",()=>{
      CachedSession = Sessionselect.value
      CachedEp = 1
      addEps(true)
    });
    selectContainer.appendChild(Sessionlabel)
    selectContainer.appendChild(Sessionselect)
    selectContainer.appendChild(Eplabel)
    selectContainer.appendChild(Epselect)
    controlbar.appendChild(selectContainer)
    results.appendChild(controlbar)

    let req = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/external_ids`,{
      headers:{
      Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
      "Content-Type": "application/json"
    }})

    imdbjson = await req.json()

    const tvDetailsRes = await fetch(
      `https://api.themoviedb.org/3/tv/${show.id}`,
      { headers: {          
        Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
      }});
    tvDetails = await tvDetailsRes.json();
    if(tvDetails.seasons){
      tvDetails.seasons.forEach((session)=>{
        let seNumber = session.season_number
        if(seNumber == 0 || isNaN(seNumber))return
        let option = document.createElement('option')
        option.value = seNumber
        option.innerText = seNumber
        Sessionselect.appendChild(option)
      })
      addEps()
      // Sessionselect.value = CachedSession || 1
      Sessionselect.value = 1
      // Epselect.value = CachedEp || 1
      Epselect.value = 1
  }

  }else{
    controlbar.appendChild(selectContainer)
    results.appendChild(controlbar)
    const movieDetailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${show.id}`,
      { headers: {          
        Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
      }});
    MovieDetails = await movieDetailsRes.json();

    fetchOnChange()
  }
  All.value = "all"
  All.innerHTML = "all"
  Remaining.style.cssText = `font-size: 14px;`
  Remaining.id = "remaining-down"
  fetchSubButton.style.border = 'none'
  fetchSubButton.style.outline = 'none'
  fetchSubButton.style.padding = 'none'
  fetchSubButton.style.backgroundColor = 'black'
  fetchSubButton.style.color = 'white'
  fetchsubdiv.id= "remaining-cont";
  fetchsubdiv.style.alignItems = "center";
  fetchsubdiv.style.display = "block";
  fetchSubButton.style.padding = '5px 10px'
  fetchSubButton.innerText = "Fetch"
  function subDisplay(langfilter){
    document.querySelectorAll('.subCard').forEach((item)=>item.remove())
    subtitlesC.forEach((sub)=>{
        let resultcard = document.createElement('div')
        resultcard.className = 'subCard'
        resultcard.style.width= '100%'
      if(!dict.has(sub.attributes.language) && sub.attributes.language){
        dict.add(sub.attributes.language)
        let option = document.createElement('option')
        option.value = sub.attributes.language
        option.innerText = sub.attributes.language
        langselect.appendChild(option)
      }
      let cardElement = `<div class="subtitle-row">
          <div class="left">
            <span class="lang">${ sub.attributes?.language?.toUpperCase()}</span>
          </div>

          <div class="middle">
            <h3 class="title">${ sub.attributes.release}</h3>
            <p class="release">${ sub.attributes.release.match(/\((.*?)\)/)?.[1] || ""}</p>

            <div class="meta">
              <span> ${ sub.attributes.download_count} Downloads</span>

              ${ sub.attributes.foreign_parts_only ? `<span class="tag">Foreign</span>` : ""}
            </div>
          </div>

          <div class="right">
            <a href="${sub.attributes.url}" title="Go to subtitles file page" target="_blank" class="redirect-btn">
            <svg style="display:flex;" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_15_200)">
              <rect width="24" height="24" fill="none"/>
              <circle cx="12" cy="13" r="2" stroke="#000000" stroke-linejoin="round"/>
              <path d="M12 7.5C7.69517 7.5 4.47617 11.0833 3.39473 12.4653C3.14595 12.7832 3.14595 13.2168 3.39473 13.5347C4.47617 14.9167 7.69517 18.5 12 18.5C16.3048 18.5 19.5238 14.9167 20.6053 13.5347C20.8541 13.2168 20.8541 12.7832 20.6053 12.4653C19.5238 11.0833 16.3048 7.5 12 7.5Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_15_200">
              <rect width="24" height="24" fill="none"/>
              </clipPath>
              </defs>
              </svg>
            </a>
            <button title="Fetch and inject subtitles" id="download-btn" data-id=${sub.attributes.files[0].file_id} target="_blank" class="download-btn">Inject Subtitles</button>
          </div>
        </div>`
      if(langfilter != "all" && langfilter){
        if(langfilter == sub.attributes.language){
          resultcard.innerHTML = cardElement
          results.appendChild(resultcard)
      }
      }else{
        resultcard.innerHTML = cardElement
        results.appendChild(resultcard)
      }
      

      })   
    }

  controlbar.style.display = "flex";
  controlbar.style.flexDirection = "row";
  controlbar.style.justifyContent = "space-between";
  controlbar.style.alignItems = "center";
  controlbar.style.gap = "10px";
  controlbar.style.padding = "10px";
  selectContainer.style.color = "#272d2d" ;
  selectContainer.style.display = "flex";
  selectContainer.style.flexDirection = "row";
  selectContainer.style.gap = "10px";
  selectContainer.style.padding = "10px";
  controlbar.style.width = "100%";
  results.style.display = "flex";
  results.style.flexDirection = "column";
  results.style.gap = "10px";
  results.style.width= "100%";
  results.style.alignItems = "center";
  results.style.fontFamily= "cursive"

  langselect.id = 'Language'
  
  
  Languagelabel.innerHTML = 'Language:'
  let manualsearch = document.createElement('input')
  manualsearch.type = "text"
  manualsearch.style.cssText = `outline: none;border: 1px solid black;padding: 5px 10px 5px 5px ;background-color: transparent;position: relative;width:40%;height:50%;`
  manualsearch.placeholder = "Search Manually";
  
  Languagelabel.setAttribute("for",'Language')
  fetchsubdiv.appendChild(Remaining)
  controlbar.appendChild(fetchsubdiv)
  // fetchsubdiv.appendChild(fetchSubButton)
  ul.appendChild(results)

  async function fetchOnChange(change){
    if(isTv){
      if(cardSub && cardSub.id == imdbjson.imdb_id && !change){
        subtitlesC = cardSub.subtitlesCards
        subDisplay(langselect.value)
      }else{
        subtitlesC = await fetchTvSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
        subDisplay(langselect.value)
      }
    }else{
      // Movie subtitles fetch
      subtitlesC = await fetchMovieSub(MovieDetails.original_title,MovieDetails.imdb_id,show.id,show.release_date.split("-")[0])
      subDisplay(langselect.value)
    }
  }

  fetchSubButton.addEventListener('click',async ()=>{
    await fetchTvSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
    subDisplay(langselect.value)
  })
    langselect.addEventListener('change',async ()=>{
      if(subtitlesC?.length > 0){
        subDisplay(langselect.value)
      }
    })
    manualsearch.addEventListener("input",(e)=>{
      clearTimeout(secTimer)
      secTimer = setTimeout(async () => {
          subtitlesC = await fetchTvSub(e.target.value,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
          subDisplay(langselect.value)
        }, 3000);
    })


  // controlbar.appendChild(manualsearch)

  

      
}
  async function fetchTvSub(name,imdb_id,tmdb_id,year,session,episode){
      return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
              { type: 'SUB_FETCH', name, imdb_id, tmdb_id, year, session, episode,isTv:true },
              (response) => {
                  if (chrome.runtime.lastError) {
                      reject(chrome.runtime.lastError);
                  } else {
                      cardSub = {subtitlesCards:response.sub,id:imdb_id}
                      resolve(response.sub);
                  }
              }
          );
      });
  }
  async function fetchMovieSub(name,imdb_id,tmdb_id,year){
      return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
              { type: 'SUB_FETCH', name, imdb_id, tmdb_id,year,isTv:false},
              (response) => {
                  if (chrome.runtime.lastError) {
                      reject(chrome.runtime.lastError);
                  } else {
                      cardSub = {subtitlesCards:response.sub,id:imdb_id}
                      resolve(response.sub);
                  }
              }
          );
      });
    
  }
  function CreateCard(show,isTv){
      const li = document.createElement("li");
      const card = document.createElement("button");

      li.className = "Card"
      card.style.display = "flex";
      card.style.flexDirection = "row";
      card.style.gap = "10px";
      card.style.padding = "10px";
      card.style.border = "1px solid #ccc";
      card.style.borderRadius = "6px";
      card.style.backgroundColor = "#fff";
      card.style.alignItems = "center";
      card.style.width = "200px";
      card.style.cursor = "pointer"
      const img = document.createElement("img");
      show.poster_path && (img.src = `https://image.tmdb.org/t/p/w92${show.poster_path}`)
      img.alt = isTv ?show.name :show.original_title;
      img.style.width = "60px";
      img.style.height = "90px";
      img.style.borderRadius = "4px";
      card.appendChild(img)
      const info = document.createElement("div");
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.gap = "4px"
      const title = document.createElement("div");
      title.textContent = isTv ?show.name :show.original_title;
      title.style.fontWeight = "bold";
      title.style.color = "#272d2d"
      info.appendChild(title)
      const year = document.createElement("div");
      isTv ? (year.textContent = show.first_air_date.split("-")[0]) :  (year.textContent = show?.release_date && show?.release_date.split("-")[0])
      year.style.fontSize = "12px";
      year.style.color = "#717171";
      info.appendChild(year)
      const rating = document.createElement("div");
      show.vote_average && (rating.textContent = `⭐ ${show.vote_average.toFixed(1)}`)
      rating.style.fontSize = "12px";
      rating.style.color = "#555";
      info.appendChild(rating)
      card.appendChild(info);
      li.style.margin = "0";
      li.style.padding = "0";
      li.appendChild(card)
      return [li,card]
  }

}


// Waiting for DOM
function whenReady(fn) {

  if (document.body) return fn();
  const observer = new MutationObserver(() => {
    if (document.body) {
       observer.disconnect(); fn(); 
       const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;300;400;600;700;900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
  });
  observer.observe(document.documentElement, { childList: true });
}

// Video element
function waitForVideo(fn) {
  const v = document.querySelector('video');
  if (v) return fn(v);
    const observer = new MutationObserver(() => {
    const v = document.querySelector('video');
    if (v) {observer.disconnect();fn(v);}
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

let LocationId = window.location.href
let subtitles = []
let overlay; 
let newov;
let shouldload = true;
let subtitleDelay = 0; 
let timeout;
let hover = false;

// Overlay
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'my-subtitle-overlay';
  Object.assign(overlay.style, {
    position:        'absolute',
    pointerEvents: 'none',

  });
  return overlay;
}

function debug(msg) {
  if (newov) newov.innerHTML = `${msg}`;
}
function SubtitlesInit(video,delayControl) {
    debug('VIDEO FOUND — injecting overlay into container...');
    function showControl() {
    delayControl.style.opacity = '1';
    delayControl.style.visibility = 'visible';
    delayControl.style.pointerEvents = 'auto';
  }

  function hideControl() {
    delayControl.style.opacity = '0';
    delayControl.style.visibility = 'hidden';
    delayControl.style.pointerEvents = 'none';
  }
    const container = video.parentElement;
    const containerPos = getComputedStyle(container).position;
    if (containerPos === 'static') {
      container.style.position = 'relative';
      debug(`container was static — fixed. tag: ${container.tagName}`);
    }
    document.body.removeChild(overlay);
    document.body.removeChild(delayControl);

    container.appendChild(overlay);
    overlay.appendChild(delayControl);
    showControl()

    
    if(window.localStorage.getItem("delay")){
      delayControl.textContent = `Subtitle Delay: ${(window.localStorage.getItem('delay'))}s` 
      subtitleDelay = +window.localStorage.getItem('delay')
    }
    else{ 
      window.localStorage.setItem("delay",0)
      subtitleDelay = 0;
      delayControl.textContent = `Subtitle Delay: ${(window.localStorage.getItem('delay'))}s` 
    }

    function updateButton() {
      delayControl.textContent = `Subtitle Delay: ${subtitleDelay.toFixed(1)}s`;
    }
    
    // left click listener
    delayControl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      subtitleDelay += 0.5;
      window.localStorage.setItem("delay",+subtitleDelay)
      updateButton();
    });

    // Right click listener
    delayControl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();

      subtitleDelay -= 0.5;
      window.localStorage.setItem("delay",+subtitleDelay)
      updateButton();
    });
    function syncOverlay() {
      const rect = video.getBoundingClientRect();
      overlay.style.position = 'fixed';
      overlay.style.top = rect.top + 'px';
      overlay.style.left = rect.left + 'px';
      overlay.style.width = rect.width + 'px';
      overlay.style.height = rect.height + 'px';
      overlay.style.zIndex = '9999';
    }

    const ro = new ResizeObserver(syncOverlay);
    ro.observe(video);

    window.addEventListener('scroll', syncOverlay);
    window.addEventListener('resize', syncOverlay);

    newov = document.createElement('div')
      Object.assign(newov.style, {
        position:        'absolute',
        left:            '50%',
        bottom: "10%",
        translate:       '-50% 0',
        "white-space":   'nowrap',
        display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          // whiteSpace: 'pre-wrap', 
          color: 'white',
          fontSize: '1.4em',
          pointerEvents: 'none',
          fontFamily: 'Roboto',
          fontWeight: '400',
          zIndex: '2147483647',
          padding: '0 30px',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
  });

    overlay.appendChild(newov)
    syncOverlay()
    debug(`OVERLAY INJECTED — container: ${container.tagName}.${container.className.slice(0, 30)}`);
    video.addEventListener('timeupdate', () => {
      const ct = video.currentTime;
      const cue = getActiveCue(ct);
      if (cue) {
        newov.innerHTML = `${cue.text}`;
        } else if (subtitles.length === 0) {
        newov.innerHTML = `<span style="background:rgba(255,140,0,0.6);padding:2px 8px;bottom:10;position:absolute;border-radius:4px;">
          no subtitles loaded — t=${ct.toFixed(2)}s delay=${subtitleDelay}
        </span>`;
      } else {        
        newov.innerHTML = ``;
      }     
    });

    video.addEventListener("playing", () => {
        hideControl();
    });

    video.addEventListener("pause", () => {
        showControl()
        subtitlename && debug(`SUBTITLES LOADED — ${subtitlename}`);

    });

    document.addEventListener("mousemove", () => {
        showControl()
        clearTimeout(timeout);
        if(!hover){
          timeout = setTimeout(hideControl, 2000);
        }
    });

  if( window.location.hostname.includes("youtube.com")){
    if(shouldload){
      shouldload = false
      chrome.runtime.sendMessage({type:'SUB_GET',LocationId},(respnose)=>{
        subtitlename = respnose.name
        debug(`SUBTITLES LOADED — ${respnose.name}`);
        if(respnose?.sub?.length > 0){
          subtitles = respnose.sub
          debug(`SUBTITLES LOADED — ${respnose.name}`);
        }
    })
        // Listening for sub upload
        chrome.runtime.onMessage.addListener((msg,callback,sendResponse) => {
          if (msg?.action === 'srtuploaded' && subtitles !== msg?.data) {
            let location = window.location.href
            subtitles = msg.data;
            chrome.runtime.sendMessage({type:"SUB_SAVE" ,LocationId:location,arrofobj:msg.data,name:msg.name})
            subtitlename = msg.name
            debug(`SUBTITLES LOADED — ${msg.name}`);
          }

          if(msg?.action == 'custom'){

            if(msg?.spec == "delay"){
                if(msg?.type == 'Reset'){
                  subtitleDelay = 0;
                  window.localStorage.setItem("delay",0)
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                  if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }
                else if(msg?.type == 'Input'){
                  subtitleDelay = +(+msg.payload).toFixed(1);
                  window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                  if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }
                else if(msg?.type == "GET"){
                  if(sendResponse){
                    sendResponse({ delay: subtitleDelay });
                    return true
                  }
                }
                else{  
                  subtitleDelay = +((+subtitleDelay + +msg.payload).toFixed(1));
                  window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                  if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }

                if(sendResponse){
                  sendResponse({ delay: subtitleDelay });
                  return true
                }
            }
            else if (msg?.spec == "subtitles"){

                if(msg?.type == 'Fontsize'){
                  newov.style.fontSize = msg?.payload
                }else if(msg?.type == "Color"){
                  newov.style.color = msg?.payload
                }else if(msg?.type == "Position"){
                    newov.style.bottom = msg?.payload
                }else if(msg?.type == "Weight"){
                    newov.style.fontWeight = +msg?.payload
                }
            }
            sendResponse({ statue: "ok" });
          }
        });
  }
  }else{
        chrome.runtime.sendMessage({type:'SUB_GET',LocationId},(respnose)=>{
            subtitlename = respnose?.name
            debug(`SUBTITLES LOADED — ${respnose.name}`);
            if(respnose?.sub?.length > 0){
              subtitles = respnose.sub
              debug(`SUBTITLES LOADED — ${respnose.name}`);
            }
        })
        // Listening for sub upload
        chrome.runtime.onMessage.addListener((msg,callback,sendResponse) => {
          if (msg?.action === 'srtuploaded' && subtitles !== msg?.data) {
            subtitles = msg.data;
            chrome.runtime.sendMessage({type:"SUB_SAVE" ,LocationId,arrofobj:msg.data,name:msg.name})
            subtitlename = msg.name
            debug(`SUBTITLES LOADED — ${msg.name}`);
          }

          if(msg?.action == 'custom'){

            if(msg?.spec == "delay"){
                if(msg?.type == 'Reset'){
                  subtitleDelay = 0;
                  window.localStorage.setItem("delay",0)
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                                    if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }
                else if(msg?.type == 'Input'){
                  subtitleDelay = +(+msg.payload).toFixed(1);
                  window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                                    if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }else{  
                  subtitleDelay = +((+subtitleDelay + +msg.payload).toFixed(1));
                  window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
                  updateButton();
                  showControl()
                  clearTimeout(timeout);
                                    if(!hover){
                    timeout = setTimeout(hideControl, 2000);
                  }
                }

                if(sendResponse){
                  sendResponse({ delay: subtitleDelay });
                  return true
                }
            }
            else if (msg?.spec == "subtitles"){

                if(msg?.type == 'Fontsize'){
                  newov.style.fontSize = msg?.payload
                }else if(msg?.type == "Color"){
                  newov.style.color = msg?.payload
                }else if(msg?.type == "Position"){
                    newov.style.bottom = msg?.payload
                }else if(msg?.type == "Weight"){
                    newov.style.fontWeight = +msg?.payload
                }
            }
            sendResponse({ statue: "ok" });
          }
        });
  }
  }
function getActiveCue(time) {
  return subtitles.find(s => (time + +subtitleDelay) >= s.start && (time + +subtitleDelay) <= s.end);
}

whenReady(() => {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  overlay = createOverlay();
  document.body.appendChild(overlay);
  const delayControl = document.createElement('div');
  delayControl.style.position = 'absolute';
  delayControl.style.top = '2%';
  delayControl.style.right = '2%';
  delayControl.style.minWidth = '40px';
  delayControl.style.background = 'rgba(255, 0, 0, 0.7)';
  delayControl.style.color = 'white';
  delayControl.style.padding = '8px 12px';
  delayControl.style.borderRadius = '6px';
  delayControl.style.fontSize = '16px';
  delayControl.style.cursor = 'pointer';
  delayControl.style.zIndex = 99999;
  delayControl.style.opacity = '0';
  delayControl.style.visibility = 'hidden';
  delayControl.style.userSelect = 'none';
  delayControl.style.pointerEvents = 'none';
  document.body.appendChild(delayControl);
  delayControl.addEventListener('mouseenter',()=>{
    hover = true
    clearTimeout(timeout)
      delayControl.style.opacity = '1';
      delayControl.style.visibility = 'visible';
      delayControl.style.pointerEvents = 'auto';
    })
    delayControl.addEventListener("mouseleave",()=>{
      hover = false
      clearTimeout(timeout)

      delayControl.style.opacity = '0';
      delayControl.style.visibility = 'hidden';
      delayControl.style.pointerEvents = 'none';
  })
  if (isInsideIframe) {
      debug('INSIDE IFRAME — looking for video...');

      waitForVideo((video)=>SubtitlesInit(video,delayControl))
}
else{
  waitForVideo((video)=>SubtitlesInit(video,delayControl))
}}
);
if( window.location.hostname.includes("youtube.com")){
  lastVideoId = new URL(location.href).searchParams.get("v");
  setInterval(() => {
    const videoId = new URL(location.href).searchParams.get("v");
    if (videoId && videoId !== lastVideoId) {
      lastVideoId = videoId;
       if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      overlay = createOverlay();
      document.body.appendChild(overlay);
      const delayControl = document.createElement('div');
      delayControl.style.position = 'absolute';
      delayControl.style.top = '2%';
      delayControl.style.right = '2%';
      delayControl.style.minWidth = '40px';
      delayControl.style.background = 'rgba(255, 0, 0, 0.7)';
      delayControl.style.color = 'white';
      delayControl.style.padding = '8px 12px';
      delayControl.style.borderRadius = '6px';
      delayControl.style.fontSize = '16px';
      delayControl.style.cursor = 'pointer';
      delayControl.style.zIndex = 99999;
      delayControl.style.opacity = '0';
      delayControl.style.visibility = 'hidden';
      delayControl.style.pointerEvents = 'none';
      document.body.appendChild(delayControl);
      let nvideo = document.querySelector('video')
      waitForVideo(video => SubtitlesInit(nvideo, delayControl));
    }
  }, 500);
}