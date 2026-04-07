const isInsideIframe = window !== window.top;
let videoref ;
let subtitlename = "" ;
let lastVideoId;

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

  const css = `
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
  #subExResults{
    padding: 2px;
    background-color: white;
    z-index: 300;
    overflow-x:hidden
  }
  .container{
    display: flex;
    background-color: transparent;
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
    left: -176px;
    display: inline-block;
    background-color: #f4f7f5;
    width: 196px;
    height: 39px;
    z-index: 20;
  }
  #subInplace {
    animation: Lftright 8s linear infinite ; 
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
  }
  .subPanel.open{
      display: flex;
      animation: 1.15s ease-out 0s 1 normal none running FadeIn;
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
  let Panel = document.createElement('div')
  document.addEventListener("keydown",(e)=>{
    if(e?.key?.toLowerCase() == "escape"){
        if(Panel.classList.contains('open')){
          Panel.classList.remove('open')
        }
    }
    if(e.ctrlKey && e?.key?.toLowerCase() == "b"){
        e.preventDefault();
        e.stopPropagation();
        if(Panel.classList.contains('open')){
          Panel.classList.remove('open')
        }else{
          Panel.classList.add('open')
          searchinput?.focus()
          function CheckIfClickedOutsideOfThePanel(Ce){
            if(!document.getElementById('subExResults').contains(Ce.target)){
              Panel.classList.remove('open')
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
width: 100%;height: 100%;max-height: 67vh;left: 50%;top: 40%;transform: translate(-50%,-50%);z-index: 9999;max-width: 910px;">

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
        <label id="subcomment" style="position: absolute;top: 50%;left: 73%;transform: translate(-50%,-50%);width: 100%;text-align: center;color: #ff000073;pointer-events: none;margin-top: -0.05rem;font-size: 10px;font-weight: bold;opacity: 0;">Nothing Found</label>
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
  const comment = document.getElementById('subcomment');
  const arrow = document.getElementById('subarrow-back');
  const inPlace = document.getElementById('subInplace');
  function Checkstorage(){
    chrome.runtime.sendMessage({ type: 'CACHED_VALUES'},
      (result) => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
          } else {
            console.log(result)
            console.log(state)
            console.log(result.searchtitle || null)
            if(result.state && !state){
                state = result.state
              }else{
                state == "All"
              }
              if(state == "All"){
                searchinput.value = result.searchtitle || null
                query = result.searchtitle || null
                ul.innerHTML = ''
                tempcatg = result.catg
                temptvshows = result.tvshows 
                tempmovies = result.movies
                tempall = result.searchdata

                if(!result.catg){
                  tempcatg = "All"
                  // chrome.storage.local.set({catg:"All",state:state})
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
                inPlace.animation = "none"
                inPlace.opacity = 0
              }
              else{
                if(result.card){
                  ul.innerHTML = ''
                  let isTv = result.card.media_type == "tv"
                  let [li,card] = CreateCard(result.card,isTv)
                  console.log("hereeree")
                  cardSub = result.cardSub
                  CachedSession = +result.CachedSession
                  CachedEp = +result.CachedEp
                  cardSelect(result.card,li,isTv,result.cardSub)
                  ul.parentElement.style.display = 'block'
                }
                // let card;
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
              chrome.runtime.sendMessage(
              { type: 'CACHE_VALUES', state, card,cardSub, tempcatg, CachedSession, CachedEp,tempmovies,temptvshows,tempall,query},
              (response) => {
                  if (chrome.runtime.lastError) {
                      console.error(chrome.runtime.lastError);
                  } else {
                      Checkstorage()                 
                  }
              }
          );
  })
  function fetchTvshowMv() {
      clearTimeout(timer)
      if(query?.length < 1){
        comment.style.opacity = 0
        inPlace.style.animation = "Lftright 8s linear infinite"
        inPlace.style.opacity = 1
        return
    }
      inPlace.style.animation = "none"
      inPlace.style.opacity = 0
      comment.style.opacity = 0

      if(query?.length < 2)return
      timer = setTimeout(async()=> {
        // Fetching the data
        console.log(query)
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

        console.log(Data)
        console.log(tempcatg)
        
        if(Data?.length < 1){
          console.log('here1')
          comment.style.opacity = 1 
        }else{
          if(!document.getElementById('MenuNav')){
            console.log('here2')
            CreateNav(0)
          }
          if(tempcatg){
            if(tempcatg == "All"){
              console.log('here3')
              appenData(Data)
            }else if(tempcatg == "Tv shows"){
              console.log('here4')
              appenData(tvData.results)
            }else{
              console.log('here5')
              appenData(moviesData.results)
            }
          }else{
            console.log('here6')
            tempcatg = "All"
            appenData(Data)
          }

        }
        // Storing the data
        tempmovies = moviesData
        temptvshows = tvData
        tempall = Data
        // chrome.storage.local.set({searchtitle:query,searchdata:Data,movies:moviesData,tvshows:tvData})

    },700)
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
    searchcoun.innerHTML = `<label id="subcomment" style="position: absolute;top: 50%;left: 73%;transform: translate(-50%,-50%);width: 100%;text-align: center;color: #ff000073;pointer-events: none;margin-top: -0.05rem;font-size: 10px;font-weight: bold;opacity: 0;">Nothing Found</label>
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
            appenData([...temptvshows.results,...tempmovies.results])
          }
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
            appenData(temptvshows.results)
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
            appenData(tempmovies.results)
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
    console.log(searchinput)
    searchinput.addEventListener(('input'), (e)=>{
        query = e.target.value
        console.log("sec")
        console.log(query)
        fetchTvshowMv()

    })
}
  function appenData(data){
  if(data?.length > 0){
    // Discarding data with vote count less that 1

    data.forEach((show,i)=>{if(show.vote_count > 0){appendresult(show,i)}})
  }else{
    // No Search results
  }
  }
//     appenData([
//     {
//         "adult": false,
//         "backdrop_path": "/qrTAc0ZtQ859Qu5O8cixJzNJpQs.jpg",
//         "genre_ids": [
//             18,
//             10759,
//             80
//         ],
//         "id": 202555,
//         "origin_country": [
//             "US"
//         ],
//         "original_language": "en",
//         "original_name": "Daredevil: Born Again",
//         "overview": "Matt Murdock, a blind lawyer with heightened abilities, is fighting for justice through his bustling law firm, while former mob boss Wilson Fisk pursues his own political endeavors in New York. When their past identities begin to emerge, both men find themselves on an inevitable collision course.",
//         "popularity": 127.4828,
//         "poster_path": "/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
//         "first_air_date": "2025-03-04",
//         "name": "Daredevil: Born Again",
//         "vote_average": 8.011,
//         "vote_count": 717,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/qsnXwGS7KBbX4JLqHvICngtR8qg.jpg",
//         "genre_ids": [
//             80,
//             18,
//             10759
//         ],
//         "id": 61889,
//         "origin_country": [
//             "US"
//         ],
//         "original_language": "en",
//         "original_name": "Marvel's Daredevil",
//         "overview": "Lawyer-by-day Matt Murdock uses his heightened senses from being blinded as a young boy to fight crime at night on the streets of Hell’s Kitchen as Daredevil.",
//         "popularity": 43.4124,
//         "poster_path": "/QWbPaDxiB6LW2LjASknzYBvjMj.jpg",
//         "first_air_date": "2015-04-10",
//         "name": "Marvel's Daredevil",
//         "vote_average": 8.2,
//         "vote_count": 5071,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/gzoDeOxJ1mvtoBQdk94l5HzVil2.jpg",
//         "genre_ids": [
//             16,
//             10759,
//             35,
//             10762
//         ],
//         "id": 17572,
//         "origin_country": [
//             "US"
//         ],
//         "original_language": "en",
//         "original_name": "Kick Buttowski: Suburban Daredevil",
//         "overview": "Clarence Buttowski, a young boy, aspires to become the world's greatest daredevil, as he gets help from Gunther, his loyal friend and partner-in-crime.",
//         "popularity": 11.7206,
//         "poster_path": "/fkkpMA6EBCxwVP7niDeJVlRACp3.jpg",
//         "first_air_date": "2010-02-13",
//         "name": "Kick Buttowski: Suburban Daredevil",
//         "vote_average": 8.126,
//         "vote_count": 655,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/myJLWz2Rk0e8YHSSw3caCrOEETT.jpg",
//         "genre_ids": [
//             18,
//             9648,
//             35
//         ],
//         "id": 280632,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "成何体统",
//         "overview": "Rookie office worker Wang Cuihua is suddenly pulled into the world of a novel, where she meets Xiahou Dan, a powerful king hiding his true identity. Both outsiders to this world, they join forces to survive a twisted fate, facing political intrigue, ancient prophecies, and life-or-death choices. As they fight to change their destiny, a powerful bond forms, one that could reshape the future of the kingdom.",
//         "popularity": 13.5678,
//         "poster_path": "/dLRQI1TikEQ92BKlfPLJOoOceXC.jpg",
//         "first_air_date": "2026-02-06",
//         "name": "How Dare You!?",
//         "vote_average": 8.333,
//         "vote_count": 15,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/oHSks2Fj3fZgnYkrhDRflmswYFr.jpg",
//         "genre_ids": [
//             16,
//             35
//         ],
//         "id": 256783,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "成何体统",
//         "overview": "Yu Wanyin is teleported into a novel about palace struggles. The female protagonist of the novel is also teleported into it. To reverse her fate as a villain, Yu Wanyin chooses to join forces with a tyrant, who also turns out to be a modern man teleported in. Yu Wanyin hopes for the three modern people to put aside the palace struggles and just play cards and eat hotpot together peacefully. However, the female protagonist believes she is the chosen one, and still chooses to go against Yu Wanyin and the male protagonist King Duan’s team. Thus, Yu Wanyin has to carry out a series of actions in order to survive and help Xia dynasty prevent the drought crisis…",
//         "popularity": 8.1789,
//         "poster_path": "/69nIimY3mqJrr0Sy4JBBq39uVJ0.jpg",
//         "first_air_date": "2024-06-14",
//         "name": "How Dare You!?",
//         "vote_average": 8.9,
//         "vote_count": 8,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/6ILhhXvH6qFF4yca7wLX7aUCzze.jpg",
//         "genre_ids": [
//             9648,
//             80,
//             18
//         ],
//         "id": 278146,
//         "origin_country": [
//             "TH"
//         ],
//         "original_language": "th",
//         "original_name": "ไขคดีเป็น เห็นคดีตาย",
//         "overview": "When seven college students find themselves trapped in a deadly game, two detectives compete to find the killer — even as their attraction grows.",
//         "popularity": 7.3733,
//         "poster_path": "/dSKoGFRwbAbplM9XIEcI7S5SaBw.jpg",
//         "first_air_date": "2025-12-18",
//         "name": "Dare You to Death",
//         "vote_average": 8.389,
//         "vote_count": 18,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/fDkhbrvqSPquRGNCmURUo0WQcTn.jpg",
//         "genre_ids": [
//             9648,
//             35,
//             80,
//             18
//         ],
//         "id": 64174,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "他来了, 请闭眼",
//         "overview": "Getting inside the head of a violent criminal is not easy. But Simon Bo, a brilliant criminal psychologist, has the ability to get into the minds of even the most mysterious and violent criminals. He’s a professor at The University of Maryland and works as an analyst and advisor on the police department’s most violent or difficult cases. With the help of his young assistant, Jenny Jian, Simon delves into the thoughts and intentions of the criminal mind. As the daughter of a veteran police investigator with a deep sense of justice, can Jenny help Simon open up emotionally as they work together to solve crimes?",
//         "popularity": 5.775,
//         "poster_path": "/xfHBGNSTDxIfW7XaOpWkbzml8Ql.jpg",
//         "first_air_date": "2015-10-15",
//         "name": "Love Me If You Dare",
//         "vote_average": 7.8,
//         "vote_count": 16,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/84yiU2Pt03y7V3PMA57e3wy0CMh.jpg",
//         "genre_ids": [
//             18,
//             80
//         ],
//         "id": 244197,
//         "origin_country": [
//             "RU"
//         ],
//         "original_language": "ru",
//         "original_name": "Лихие",
//         "overview": "Khabarovsk region. Taiga. Pavel Likhovtsev, a senior ranger and bear hunter, keeps an apiary in the taiga and brings up his eldest son Zhenya as a real peasant. However, with the advent of the nineties, the apiary is ruined. Pavel and his family are forced to go to Khabarovsk in search of a better life. At this time, in Khabarovsk, there is a redistribution of spheres of influence - all power and all resources are transferred to the OCG \"Obshchak\" - a gang that will soon become the largest criminal group in the world.",
//         "popularity": 3.7333,
//         "poster_path": "/otiquk8nNWkSyTsrrl7sHMnw68U.jpg",
//         "first_air_date": "2024-10-24",
//         "name": "Daring",
//         "vote_average": 8,
//         "vote_count": 12,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/ihSskdOZebfa1BQTnHjapW9gFzy.jpg",
//         "genre_ids": [
//             18,
//             35
//         ],
//         "id": 32857,
//         "origin_country": [
//             "HK"
//         ],
//         "original_language": "cn",
//         "original_name": "俠客行",
//         "overview": "Hap Hak Hang is a Hong Kong television series adapted from Louis Cha's novel Ode to Gallantry. The series was first broadcast on TVB in Hong Kong in 1989.",
//         "popularity": 3.8016,
//         "poster_path": "/bRdadBjFvUrchZS9PI5VEUno7j5.jpg",
//         "first_air_date": "1989-12-25",
//         "name": "Where Heroes Dare",
//         "vote_average": 7.5,
//         "vote_count": 2,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             18,
//             35
//         ],
//         "id": 156420,
//         "origin_country": [
//             "JP"
//         ],
//         "original_language": "ja",
//         "original_name": "このこ誰の子?",
//         "overview": "A unique school drama about a girl who was raped by another man and became pregnant despite having a boyfriend.\n\nAfter transferring, Takuya joined the judo club. Takuya had a crush on Aoi, and joined the club desperately in the hopes of becoming closer to her. Takuya knew that Aoi had a boyfriend but he still wanted Aoi to be his. After failing at the judo club, Takuya suddenly changes his attitude and forcefully pushes Aoi causing her to lose consciousness. Seeing her unconscious, Takuya's romantic feelings for Aoi exploded, and he rapes her. After being raped by Takuya, Aoi becomes pregnant with Takuya's child.\n\nAoi decides to give birth alone and runs away from home. Shindo Sojiro searches for Aoi, intensely hating Takuya, who ruined their romance and raped his girlfriend. Takuya takes responsibility for the rape and voluntarily drops out of high school. He attempt to forget Aoi but then changes his mind and sets out to find her. And the story reaches a shocking conclusion....",
//         "popularity": 1.8211,
//         "poster_path": "/pFqNzRNO5z8KkXefin7XChPYFSQ.jpg",
//         "first_air_date": "1986-10-22",
//         "name": "Kono Ko Dare no Ko?",
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/5IYzhO2OwWhpdRntUsjTRhSAcX4.jpg",
//         "genre_ids": [
//             16,
//             10762
//         ],
//         "id": 14062,
//         "origin_country": [
//             "US"
//         ],
//         "original_language": "en",
//         "original_name": "Super Dave: Daredevil for Hire",
//         "overview": "Super Dave: Daredevil for Hire starred and was based on the comedy of Bob Einstein and his Super Dave Osborne persona. Both Bob Einstein and Art Irizawa provided the voices for Super Dave and his assistant, Fuji Hakahito, and also appeared as their characters in live-action skits which ended each episode.",
//         "popularity": 2.6309,
//         "poster_path": "/51ZTGiBAOkRPjqcGwRxcgRDjZYM.jpg",
//         "first_air_date": "1992-09-12",
//         "name": "Super Dave: Daredevil for Hire",
//         "vote_average": 6.5,
//         "vote_count": 4,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/bprooiRzhTOWDqXig98b9atYBMO.jpg",
//         "genre_ids": [
//             35
//         ],
//         "id": 127138,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "花好月又圆",
//         "overview": "A story that follows two couples who mistakenly find themselves in a marriage they never expected and gradually grow in love and trust over time.",
//         "popularity": 2.8315,
//         "poster_path": "/10JQjyCSTL2YxgkYuCWxYhSfPrr.jpg",
//         "first_air_date": "2021-06-08",
//         "name": "Truth or Dare",
//         "vote_average": 7.8,
//         "vote_count": 6,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/9X0x6ayH5GgsavWDxdXFVt3b0YU.jpg",
//         "genre_ids": [
//             18
//         ],
//         "id": 63441,
//         "origin_country": [
//             "MX"
//         ],
//         "original_language": "es",
//         "original_name": "A que no me dejas",
//         "overview": "A heartbreaking story in which power, obsession, and desire will tragically mark the love between Paulina and Adrián who will fight for their love against all odds, even if it takes their life. ",
//         "popularity": 3.2895,
//         "poster_path": "/4OodlZVeOnydmMK0MTYsSLuHINq.jpg",
//         "first_air_date": "2015-07-27",
//         "name": "I Dare You to Leave",
//         "vote_average": 7.6,
//         "vote_count": 220,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/4JQ3X9Ru5mHBT2BFe9iJ8eMHDEp.jpg",
//         "genre_ids": [
//             18
//         ],
//         "id": 291021,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "成何体统",
//         "overview": "Wang Cuihua, an ordinary office worker, is thrust into a novel as a doomed villainess. To change her fate, she teams up with a tyrant, who is also a fellow transmigrator. Together, they fight to survive against the story’s original heroine and scheming male lead.",
//         "popularity": 2.986,
//         "poster_path": "/o3EO1i41t1zQrOq141kdBDr6cNB.jpg",
//         "first_air_date": "2025-06-28",
//         "name": "How Dare You!?",
//         "vote_average": 8.25,
//         "vote_count": 8,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/xfn7cCypYcegyfIsWBO13tn3MkY.jpg",
//         "genre_ids": [
//             10764
//         ],
//         "id": 258142,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "跟我走吧",
//         "overview": "Dare Or Not invites hot-blooded young people to form a group to start a 15-day Yunnan free travelling experience trip, and in the process of the experience and game challenges, it cooperates with the local cultural tourism and publicity departments to carry out public welfare publicity, attracting traffic and bringing goods of agricultural products to local cultural tourism resources, so as to show China's natural beauty, rich culture and help enhance the popularity and attractiveness of the local community at the same time. In this way, it will show the natural beauty and rich culture of China, and at the same time help to enhance the popularity and attractiveness of the local community.",
//         "popularity": 2.8539,
//         "poster_path": "/24JToxEiwEOUbPkKlBGA7kAvmDr.jpg",
//         "first_air_date": "2024-06-30",
//         "name": "Dare Or Not",
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [],
//         "id": 23624,
//         "origin_country": [
//             "GB"
//         ],
//         "original_language": "en",
//         "original_name": "Celebrity Daredevils",
//         "overview": "",
//         "popularity": 0.3484,
//         "poster_path": null,
//         "first_air_date": "2006-05-03",
//         "name": "Celebrity Daredevils",
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/yWTiFlRfYUSZwS8CSPhtAiQj4ah.jpg",
//         "genre_ids": [
//             18,
//             35
//         ],
//         "id": 233099,
//         "origin_country": [
//             "KR"
//         ],
//         "original_language": "ko",
//         "original_name": "함부로 대해줘",
//         "overview": "After leaving his rural hometown, which was built on Joseon principles, a man meets a woman with a big personality who tests his rigid social boundaries.",
//         "popularity": 2.5449,
//         "poster_path": "/xWsGNPd3xF06BrvxiDSWV3uyqxa.jpg",
//         "first_air_date": "2024-05-13",
//         "name": "Dare to Love Me",
//         "vote_average": 6.2,
//         "vote_count": 5,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/kBBody6zZZcUOxraAYhNSiFgIT.jpg",
//         "genre_ids": [
//             18,
//             10765
//         ],
//         "id": 59046,
//         "origin_country": [
//             "KR"
//         ],
//         "original_language": "ko",
//         "original_name": "미래의 선택",
//         "overview": "Set in the world of television broadcasting, Na Mi-rae travels back in time to prevent her 32-year-old self from marrying news anchor Kim Shin, thus sending her past self down a different path and enabling her to pursue the things she really wanted in life.",
//         "popularity": 2.8444,
//         "poster_path": "/9Av5nkc0Jlew11pf1EInx4ggFfu.jpg",
//         "first_air_date": "2013-10-14",
//         "name": "Marry Him If You Dare",
//         "vote_average": 2.4,
//         "vote_count": 11,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/uOWyUIObz8aumOaRycz4pTb8RrY.jpg",
//         "genre_ids": [
//             35
//         ],
//         "id": 89259,
//         "origin_country": [
//             "CN"
//         ],
//         "original_language": "zh",
//         "original_name": "人见人爱",
//         "overview": "",
//         "popularity": 1.5086,
//         "poster_path": "/mArVtnPaRfgDbQwpCtOWwJRlWFL.jpg",
//         "first_air_date": "2014-04-30",
//         "name": "Love Him if You Dare",
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/2uQIVB7aJWnA8pqBsTlRu7ChINP.jpg",
//         "genre_ids": [],
//         "id": 46571,
//         "origin_country": [
//             "KR"
//         ],
//         "original_language": "ko",
//         "original_name": "당돌한 여자",
//         "overview": "Daring Women is a 2010 South Korean television series starring Lee Yoo-ri, Lee Chang-hoon, Seo Ji-young, and Lee Joong-moon. The morning soap opera aired on SBS on Mondays to Fridays at 8:40 a.m. from March 2 to July 30, 2010 for 105 episodes.",
//         "popularity": 1.8777,
//         "poster_path": "/eEC12qvSdZIx7lYV7KYhe9bfQ50.jpg",
//         "first_air_date": "2010-03-02",
//         "name": "Daring Women",
//         "vote_average": 3,
//         "vote_count": 1,
//         "media_type": "tv"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             18
//         ],
//         "id": 1367017,
//         "original_language": "en",
//         "original_title": "Dared",
//         "overview": "The dark and uncertain world that Spinks inhabits is turned upside down when a drug deal goes bad...",
//         "popularity": 0.4317,
//         "poster_path": null,
//         "release_date": "2012-10-03",
//         "title": "Dared",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/x2e5ZaIrngnFdo5o8qubkBHLWGL.jpg",
//         "genre_ids": [
//             28,
//             80
//         ],
//         "id": 66238,
//         "original_language": "zh",
//         "original_title": "雜技亡命隊",
//         "overview": "The General's son Yang escapes a massacre at his home that subsequently sees a corrupt, criminal syndicate in charge of the local forces. Seeking shelter with four good friends who are street performers, Yang plots his revenge though refuses to acknowledge the fearsome odds he faces. The quartet try to convince him to bide his time, but the young avenger sneaks into his former home and, after a battle against a few top fighters, is killed by their leader. When Yang's friends discover his tragic fate, they devise a way of defeating the killers without having to face their mighty army directly.",
//         "popularity": 2.4117,
//         "poster_path": "/mMwWAMkwzXAtHDShFvQmlz8KvPn.jpg",
//         "release_date": "1979-06-09",
//         "title": "The Daredevils",
//         "video": false,
//         "vote_average": 6.8,
//         "vote_count": 6,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             36,
//             10752,
//             28
//         ],
//         "id": 229339,
//         "original_language": "ja",
//         "original_title": "大阪城物語",
//         "overview": "During the raging war between the Toyotomi and Tokugawa clans, the swordsman Mohei (whose family has been completely decimated) is recruited by Toyotomi to overcome the seat of power, Osaka Castle. Mohei's daredevil skills will be put to severe tests.",
//         "popularity": 2.3353,
//         "poster_path": "/c7XJnormqBGVTNDRmjrNITQbD2V.jpg",
//         "release_date": "1961-01-03",
//         "title": "Daredevil in the Castle",
//         "video": false,
//         "vote_average": 7.1,
//         "vote_count": 9,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/aswl69NruN1rdVD3ziZx1v8cQqo.jpg",
//         "genre_ids": [
//             28,
//             80
//         ],
//         "id": 80654,
//         "original_language": "en",
//         "original_title": "The Daredevil",
//         "overview": "A top stock-car driver causes a death on the race track and finds his career in shambles. Desperate for money, he gets a job as a driver for a drug ring.",
//         "popularity": 0.6814,
//         "poster_path": "/xrx6YWtDkaGUOFPIVXX6y5o2rhI.jpg",
//         "release_date": "1972-01-01",
//         "title": "The Daredevil",
//         "video": false,
//         "vote_average": 6,
//         "vote_count": 3,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/e7jIX02GiSwsgkU5lMpeKjwq2Zc.jpg",
//         "genre_ids": [
//             14,
//             28
//         ],
//         "id": 9480,
//         "original_language": "en",
//         "original_title": "Daredevil",
//         "overview": "A man blinded in a childhood accident fights crime using his superhumanly-elevated remaining senses.",
//         "popularity": 6.6732,
//         "poster_path": "/oCDBwSkntYamuw8VJIxMRCtDBmi.jpg",
//         "release_date": "2003-02-14",
//         "title": "Daredevil",
//         "video": false,
//         "vote_average": 5.292,
//         "vote_count": 5411,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/ixWp3Gxslo1HINzGL3nZF8EdtE2.jpg",
//         "genre_ids": [
//             18
//         ],
//         "id": 110573,
//         "original_language": "fr",
//         "original_title": "Le ciel est à vous",
//         "overview": "The strength of a couple's fascination with airplanes and flight is to the detriment of their family.",
//         "popularity": 0.7197,
//         "poster_path": "/CMF6MvzMFsROq6DyiCK8EKcZWu.jpg",
//         "release_date": "1944-02-03",
//         "title": "The Woman Who Dared",
//         "video": false,
//         "vote_average": 7,
//         "vote_count": 26,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/hQiqLSKZizTYGzjBGSvwMfLWmuv.jpg",
//         "genre_ids": [
//             99
//         ],
//         "id": 510236,
//         "original_language": "de",
//         "original_title": "Heimliche Helden - Keas in Neuseeland",
//         "overview": "Here are parrots that totally break the stereotypes!  The keas in New Zealand just love the snow and the cold, harsh mountain climate. To survive here, these mountain parrots have developed exceptional intelligence and resourcefulness.  Watch these incredibly unique birds in action!",
//         "popularity": 0.1801,
//         "poster_path": "/64KBQBDJfhh6DHDDPoecdti1df3.jpg",
//         "release_date": "2015-01-01",
//         "title": "Keas - New Zealand's Witty Daredevils",
//         "video": false,
//         "vote_average": 8,
//         "vote_count": 2,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             28
//         ],
//         "id": 455400,
//         "original_language": "zh",
//         "original_title": "Guan dong wu ta xia",
//         "overview": "The heroes pose as gun dealers and acrobats in order to get close to the bad guys so they can avenge the death of one of their brothers.",
//         "popularity": 0.9543,
//         "poster_path": "/uQreO1LlhZmNfbriMgntrMn0gyr.jpg",
//         "release_date": "1977-01-01",
//         "title": "Five Kung Fu Daredevil Heroes",
//         "video": false,
//         "vote_average": 6.5,
//         "vote_count": 2,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/2UHcDkF8QFkYUC68V4IBmToIF8N.jpg",
//         "genre_ids": [
//             28
//         ],
//         "id": 707790,
//         "original_language": "ja",
//         "original_title": "マッハ’78",
//         "overview": "A Japanese stunt-drivers team make its way to California for a car stunt tournament. Otomo, a Japanese driver, falls for a beautiful American woman.",
//         "popularity": 0.8463,
//         "poster_path": "/jDUfiEZn58DTjKaZRg6KCbK84sU.jpg",
//         "release_date": "1978-02-25",
//         "title": "Daredevil Drivers",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             28
//         ],
//         "id": 104389,
//         "original_language": "id",
//         "original_title": "Komando samber nyawa",
//         "overview": "The Indonesian rebels want to get rid of the evil Dutch occupiers, but they are too strong so they have to create a super commando unit with their best soldiers.",
//         "popularity": 0.1269,
//         "poster_path": "/gHwf7251NYhz8qDp5APmNdKaKE9.jpg",
//         "release_date": "1985-01-01",
//         "title": "Daredevil Commandos",
//         "video": false,
//         "vote_average": 3,
//         "vote_count": 1,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/nym4wqJMJIOaOyOTzvSvkbZK70x.jpg",
//         "genre_ids": [
//             80
//         ],
//         "id": 264236,
//         "original_language": "de",
//         "original_title": "Der Draufgänger",
//         "overview": "Harbour policeman Hans and his companion rescue a young woman from water during their night watch, to find out she is connected with a jewel robbery in which a gangster now owner of an hippodrome, an out jailed one and his mistress now mixed up with an American millionaire weave some obscure plans.",
//         "popularity": 0.2862,
//         "poster_path": "/wcLjIsDACECgcKjEWU3oPbcUf1m.jpg",
//         "release_date": "1931-11-26",
//         "title": "The Daredevil",
//         "video": false,
//         "vote_average": 5.9,
//         "vote_count": 9,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             99
//         ],
//         "id": 332422,
//         "original_language": "ja",
//         "original_title": "がむしゃら",
//         "overview": "Yuka Yasukawa is an actress and also a professional wrestler with the nickname of Act Yasukawa. An in-depth look is given into her personal life as well as her in the ring. Her past experiences are also told including being bullied, refusing to go to school, rape and attempted suicide.",
//         "popularity": 0.4637,
//         "poster_path": "/8klgx2KdhdERjh5eaOrXT3XfbWy.jpg",
//         "release_date": "2015-03-28",
//         "title": "Daredevil",
//         "video": false,
//         "vote_average": 10,
//         "vote_count": 1,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/iTtjv5UdMV5sSW2tsJQR0JSP4Jb.jpg",
//         "genre_ids": [
//             18,
//             10752
//         ],
//         "id": 657761,
//         "original_language": "pl",
//         "original_title": "Szaleńcy",
//         "overview": "",
//         "popularity": 0.1091,
//         "poster_path": "/u4goWaVqweBbEDfij7p5aCOGFqn.jpg",
//         "release_date": "1928-08-28",
//         "title": "Daredevils",
//         "video": false,
//         "vote_average": 6,
//         "vote_count": 1,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             10751,
//             18
//         ],
//         "id": 503898,
//         "original_language": "sh",
//         "original_title": "Hajdučka vremena",
//         "overview": "Sfaira (1971-1984) dedicated to Pythagoras and Plato is a homage to two of his favourite spheroids: the Earth and the Sun.",
//         "popularity": 0.2824,
//         "poster_path": "/cCirlduIsqlPZQtGK5tXnR2ZL9c.jpg",
//         "release_date": "1977-01-12",
//         "title": "Daredevil Times",
//         "video": false,
//         "vote_average": 6.5,
//         "vote_count": 3,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             18,
//             10752,
//             16
//         ],
//         "id": 1407226,
//         "original_language": "hy",
//         "original_title": "Սասնա Ծռեր",
//         "overview": "An animation film based on the Armenian heroic epic poem Daredevils of Sassoun.",
//         "popularity": 0.1672,
//         "poster_path": null,
//         "release_date": "2010-01-25",
//         "title": "Daredevils of Sassoun",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             99,
//             9648,
//             36
//         ],
//         "id": 1087346,
//         "original_language": "th",
//         "original_title": "เจริญวิริญาพรมาหาทำใน 3 โลก",
//         "overview": "\"Viriyaporn Boonprasert\" is the name of a filmmaker who has been making social satire films since 2012, and no one knows who she is until now. But Viriyaporn's films reflect the condition of Thai society and Thai politics in the past to the present.",
//         "popularity": 0.0797,
//         "poster_path": "/kUrAIh6789ZtbmVEm7sMh7VTyEq.jpg",
//         "release_date": "2021-10-26",
//         "title": "Develop Viriyaporn Who Dared in 3 Worlds",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": "/nJtieIJgVP3CkbrdDDFzGs9noz1.jpg",
//         "genre_ids": [
//             12,
//             10751,
//             10770
//         ],
//         "id": 411860,
//         "original_language": "lt",
//         "original_title": "Pramuštgalviai, pirmyn!",
//         "overview": "A story about three best friends who are always looking for adventures.",
//         "popularity": 0.0071,
//         "poster_path": "/vEpNv7NhZdwSe9kte5J6LKfdje6.jpg",
//         "release_date": "1986-08-18",
//         "title": "Daredevils, Forward!",
//         "video": false,
//         "vote_average": 7,
//         "vote_count": 1,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             28
//         ],
//         "id": 175859,
//         "original_language": "da",
//         "original_title": "Filmens Vovehals",
//         "overview": "'Daredevil of the movies' is a promotion reel compiled of film extracts showing some of actress and airial artist Emilie Sannom's most daring stunts.\r She is seen crawling on windmills and church towers, balancing barefoot on sharp spears and parachuting out of an airplane.  The film was undoubtedly compiled to to show the skill and courage of Emilie Sannom, which gave her the nick-name 'Daredevil of the movies'. She supposedly showed it to her audience when traveling through Denmark and giving talks about her adventurous career during the 1920s.",
//         "popularity": 0.0538,
//         "poster_path": null,
//         "release_date": "1923-03-09",
//         "title": "Daredevil of the Movies",
//         "video": false,
//         "vote_average": 5.7,
//         "vote_count": 3,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [],
//         "id": 798328,
//         "original_language": "fr",
//         "original_title": "Cerisay : elles ont osé",
//         "overview": "A women's strike in a a textile factory that lasted 109 days.",
//         "popularity": 0.0261,
//         "poster_path": null,
//         "release_date": "",
//         "title": "Cerizay: They Dared",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     },
//     {
//         "adult": false,
//         "backdrop_path": null,
//         "genre_ids": [
//             99
//         ],
//         "id": 748139,
//         "original_language": "it",
//         "original_title": "Temerari",
//         "overview": "The film explores unobvious connections between the cultural and political phenomena of Italy and Ukraine. Suddenly, fans of Italian futurism and fascism appear among the Ukrainian far-right community. At the same time, conservative ideas are spreading in Italy and Europe. There are its own heroes, villains and victims including Ukrainian soldier Vitalii Markiv, far-right publishing house Iron Dad, former Italian Deputy Prime Minister Matteo Salvini, a group of pro-Russian recruits for the war in Donbas, and others.",
//         "popularity": 0.0168,
//         "poster_path": "/xSTXcThbRgsOs6AcQOsWD0REBQG.jpg",
//         "release_date": "2020-09-29",
//         "title": "Daredevils",
//         "video": false,
//         "vote_average": 0,
//         "vote_count": 0,
//         "media_type": "movie"
//     }
// ])
  function appendresult(show,i){
    state = "All"
    // chrome.storage.local.set({state:"All"})
    arrow.style.display = 'none';
    comment.style.opacity = 0
    let isTv = show?.media_type == "tv"
    let [li,card] = CreateCard(show,isTv)    
    ul.style.flexDirection = "row";
    console.log("appending cards")
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
        // chrome.storage.local.set({CachedEp:Epselect.value})
        CachedEp = Epselect.value
        fetchOnChange(true)
      }
  , 1600);
    });  
    Sessionselect.addEventListener("change",()=>{
      // chrome.storage.local.set({CachedSession:Sessionselect.value,CachedEp:1})
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
    console.log(show)
    const movieDetailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${show.id}`,
      { headers: {          
        Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
      }});
    MovieDetails = await movieDetailsRes.json();
    console.log(MovieDetails) 

    fetchOnChange()
  }
  All.value = "all"
  All.innerHTML = "all"
  fetchSubButton.style.border = 'none'
  fetchSubButton.style.outline = 'none'
  fetchSubButton.style.padding = 'none'
  fetchSubButton.style.backgroundColor = 'black'
  fetchSubButton.style.color = 'white'
  fetchsubdiv.style.alignItems = "center";
  fetchsubdiv.style.display = "flex";
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
      if(langfilter != "all" && langfilter){
        if(langfilter == sub.attributes.language){
          resultcard.innerHTML =   `<div class="subtitle-row">
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
            <a href="${sub.attributes.url}" target="_blank" class="download-btn">⬇</a>
          </div>
        </div>`
          results.appendChild(resultcard)
      }
      }else{
          resultcard.innerHTML =   `<div class="subtitle-row">
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

  ul.appendChild(results)

  async function fetchOnChange(change){
    console.log(change)
    console.log(!change)
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
      console.log(MovieDetails)
      console.log(MovieDetails.original_title)
      await fetchMovieSub(MovieDetails.original_title,MovieDetails.imdb_id,show.id,show.release_date.split("-")[0])
      subDisplay(langselect.value)
    }
  }

  // fetchSubButton.addEventListener('click',async ()=>{
  //   await fetchTvSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
  //   subDisplay(langselect.value)
  // })
  langselect.addEventListener('change',async ()=>{
    if(subtitles?.length > 0){
      subDisplay(langselect.value)
    }
  })
  manualsearch.addEventListener("input",(e)=>{
    clearTimeout(secTimer)
    secTimer = setTimeout(async () => {
        await fetchTvSub(e.target.value,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
        subDisplay(langselect.value)
      }, 3000);
  })

  controlbar.appendChild(fetchsubdiv)
  // controlbar.appendChild(manualsearch)
  // fetchsubdiv.appendChild(fetchSubButton)

  

      
}
  async function fetchTvSub(name,imdb_id,tmdb_id,year,session,episode){
      return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
              { type: 'SUB_FETCH', name, imdb_id, tmdb_id, year, session, episode },
              (response) => {
                  if (chrome.runtime.lastError) {
                      reject(chrome.runtime.lastError);
                  } else {
                      cardSub = {subtitlesCards:response.sub,id:imdb_id}
                    // chrome.storage.local.set({cardSub:{subtitlesCards:subtitles,id:imdb_id}})
                      resolve(response.sub);
                  }
              }
          );
      });

  }
  async function fetchMovieSub(name,imdb_id,tmdb_id,year){

    // chrome.storage.local.set({cardSub:{subtitlesCards:subtitles,id:imdb_id}})
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
  console.log(video)
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
            console.log(msg.data)
            let location = window.location.href
            subtitles = msg.data;
            chrome.runtime.sendMessage({type:"SUB_SAVE" ,location,arrofobj:msg.data,name:msg.name})
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
    console.log(hover )
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