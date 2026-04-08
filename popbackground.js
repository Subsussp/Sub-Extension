let file = document.getElementById('file')
const reader = new FileReader();
let name = ''
function parseTimeRange(line) {
  const [start, end] = line.split(' --> ');
  return {
    start: Timestamp(start),
    end: Timestamp(end)
  };
}

function Timestamp(time){
  const [hh, mm, rest] = time.split(':');
  const [ss, ms] = rest.split(',');

  return (
    Number(hh) * 3600 +
    Number(mm) * 60 +
    Number(ss) +
    Number(ms) / 1000
  );
}

let state;
let fetchTimer;
let timer;
let secTimer;
let epTimer;
let sessionTimer;
let subtitles;
let query;
let backend = 'https://extention-442a3505471f.herokuapp.com';
let temptvshows ;
let tempmovies ;
let CachedSession;
let CachedEp;
let tempcardSub;
let tempcatg ;
let firstSearch = true;
let season;
let arrow = document.getElementById('arrow-back')
let comment = document.getElementById('comment')
let searchinput = document.getElementById('subsearch')
let fetchOn = false;
const ul = document.getElementById('list');

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
        }, 3000);

    })
  }
})

 function Checkstorage(){
  chrome.storage.local.get(["state","searchtitle","searchdata","tvshows","movies","catg","card","cardSub","CachedSession","CachedEp"]).then((result)=>{
    if(result.state){
      state = result.state
    }else{
      state == "All"
    }
    if(state == "All"){
      searchinput.value = result.searchtitle || null
      if(result.searchtitle){
        document.getElementById('inplace').style.animation = "none"
        document.getElementById('inplace').style.opacity = 0
      }
      query = result.searchtitle || null
      ul.innerHTML = ''
      tempcatg = result.catg
      temptvshows = result.tvshows 
      tempmovies = result.movies
      if(!result.catg){
        chrome.storage.local.set({catg:"All",state:state})
        CreateNav(0)
        appenData(result.searchdata)
      }
      else if(result.catg == "All" && Array.isArray(result?.searchdata) &&result.searchdata.length > 0){
        CreateNav(0)
        comment.style.opacity = 0  
        appenData(result.searchdata)
      }
      else if(result.catg == "Tv shows" &&Array.isArray(result?.tvshows.results) &&result.tvshows.results?.length > 0){
        CreateNav(1)
        comment.style.opacity = 0
        appenData(result.tvshows.results)
      }
      else if(result.catg == "Movies" && Array.isArray(result?.movies?.results) &&result.movies.results?.length > 0){
        CreateNav(2)
        comment.style.opacity = 0
        appenData(result.movies.results)
      }

    }
    else{
      if(result.card){
        ul.innerHTML = ''
        let isTv = result.card.media_type == "tv"
        let [li,card] = CreateCard(result.card,isTv)
        tempcardSub = result.cardSub
        CachedSession = +result.CachedSession
        CachedEp = +result.CachedEp
        cardSelect(result.card,li,isTv,result.cardSub)
        ul.parentElement.style.display = 'block'
      }
      // let card;
    }
    })
}

Checkstorage()

function CreateNav(focusIndex){
  const catg = document.createElement("div");
  const line = document.createElement("div");
  const after = document.createElement("div");
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
    buttn.style.cssText =` padding: 5px 10px;background-color:#5863F8;color:white;font-family: cursive;  border-top: 2px solid black;
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
          chrome.storage.local.set({catg:"All"})
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
          chrome.storage.local.set({catg:"Tv shows"})
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
          chrome.storage.local.set({catg:"Movies"})
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
  ul.appendChild(catg)
  ul.appendChild(line)
}
searchinput.addEventListener(('input'), (e)=>{
  query = e.target.value
  fetchTvshowMv()
})
arrow.addEventListener("click",()=>{
  chrome.storage.local.set({state:"All",CachedSession:null,CachedEp:null})
  CachedEp = null
  CachedSession = null
  Checkstorage()
})
async function fetchTvSub(name,imdb_id,tmdb_id,year,session,episode){
  let fetchdata = await fetch(`${backend}/api/search?q=${encodeURIComponent(name)}&imdb_id=${imdb_id}&year=${year}&tmdb_id=${tmdb_id}&episode=${episode}&session=${session}&isTv=${true}`) 
  subtitles = ''
  subtitles = await fetchdata.json()
  tempcardSub = {subtitlesCards:subtitles,id:imdb_id};
  chrome.storage.local.set({cardSub:{subtitlesCards:subtitles,id:imdb_id}})
}
async function fetchMovieSub(name,imdb_id,tmdb_id,year){
  let fetchdata = await fetch(`${backend}/api/search?q=${encodeURIComponent(name)}&imdb_id=${imdb_id}&year=${year}&tmdb_id=${tmdb_id}&isTv=${false}`) 
  subtitles = ''
  subtitles = await fetchdata.json()
  chrome.storage.local.set({cardSub:{subtitlesCards:subtitles,id:imdb_id}})
}
function appendresult(show,i){
    state = "All"
    chrome.storage.local.set({state:"All"})
    arrow.style.display = 'none';
    comment.style.opacity = 0
    let isTv = show?.media_type == "tv"
    let [li,card] = CreateCard(show,isTv)    
    ul.style.flexDirection = "row";
    ul.parentElement.style.display = 'block'
    card.addEventListener("click",(e)=>cardSelect(show,li,isTv,tempcardSub))
    ul.appendChild(li)
    }
  function appenData(data){
    if(data?.length > 0){
      // Discarding data with vote count less that 1
      if(document.getElementById("SubSub-container")){
        document.getElementById("SubSub-container").remove()
      }
      data.forEach((show,i)=>{if(show.vote_count > 0){appendresult(show,i)}})
    }else{
      // No Search results
    }
}

function CreateCard(show,isTv){
    const li = document.createElement("li");
    const card = document.createElement("button");
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
    info.appendChild(title)
    const year = document.createElement("div");
     isTv ? (year.textContent = show.first_air_date.split("-")[0]) :  (year.textContent = show?.release_date && show?.release_date.split("-")[0])
    year.style.fontSize = "12px";
    year.style.color = "#555";
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
function fetchTvshowMv() {
    clearTimeout(timer)
    if(query?.length < 1){
      comment.style.opacity = 0
      document.getElementById('inplace').style.animation = "Lftright 8s linear infinite"
      document.getElementById('inplace').style.opacity = 1
      return
  }
    document.getElementById('inplace').style.animation = "none"
    document.getElementById('inplace').style.opacity = 0
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

      if(Data?.length < 1){
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
      chrome.storage.local.set({searchtitle:query,searchdata:Data,movies:moviesData,tvshows:tvData})

  },700)
}

async function cardSelect(show,li,isTv,cardSub){
  // Vars    
  state = "Single";
  let imdbjson;
  let tvDetails ;
  let MovieDetails ;

  chrome.storage.local.set({state:"Single",card:show})
  arrow.style.display = 'block';
  li.style.display = 'block';
  let results = document.createElement('div')
  let controlbar = document.createElement('div')
  let selectContainer = document.createElement('div')
  let Remaining = document.createElement('div')
  Remaining.style.cssText = `font-size: 14px;`
  Remaining.id = "remaining-down"

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
  fetchsubdiv.id = "remaining-cont"
  ul.innerHTML = ''
  ul.style.display = 'flex'
  ul.style.alignItems = 'center'
  ul.style.flexDirection = "column";
  ul.appendChild(li)
  langselect.appendChild(All)
  selectContainer.appendChild(Languagelabel)
  selectContainer.appendChild(langselect)
  
  fetchsubdiv.appendChild(Remaining)
  controlbar.appendChild(fetchsubdiv)

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
        chrome.storage.local.set({CachedEp:Epselect.value})
        fetchOnChange(true)
      }
  , 1600);
    });  
    Sessionselect.addEventListener("change",()=>{
      chrome.storage.local.set({CachedSession:Sessionselect.value,CachedEp:1})

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
      Sessionselect.value = CachedSession || 1
      Epselect.value = CachedEp || 1
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
    subtitles.forEach((sub)=>{
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
  selectContainer.style.display = "flex";
  selectContainer.style.flexDirection = "row";
  selectContainer.style.gap = "10px";
  selectContainer.style.padding = "10px";
  controlbar.style.width = "100%";
  results.style.display = "flex";
  results.id = "SubSub-container";
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
    if(isTv){
      if(cardSub && cardSub.id == imdbjson.imdb_id && !change){
        subtitles = cardSub.subtitlesCards
        subDisplay(langselect.value)
      }else{
        subtitles = null
        await fetchTvSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
        subDisplay(langselect.value)
      }
    }else{
      // Movie subtitles fetch
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
reader.onload = (e) => {
    const text = e.target.result;
    let linesArr = text.split('\n')
    let searchnum = 1
    let time = []
    let subtitle = []
    for(let i = 0;i < linesArr.length;i++){
        if(searchnum == linesArr[i] || `${searchnum}\r`== linesArr[i]){
            ++searchnum
            let seconds = parseTimeRange(linesArr[i+1])
            time.push(seconds)
            let sub = ""
            for(let g = i + 2; g < linesArr.length;g++){
                if(linesArr[g] == '' ||linesArr[g] == "\r"){
                    g = linesArr.length
                    subtitle.push(sub)
                    sub = ""
                }else{
                   sub = sub.concat('',linesArr[g] + ' ')
                }
            }
        }
    }
    chrome.runtime.sendMessage({action:'backgroundcall',data:{time,subtitle,name}},(respnose)=>{
        console.log(respnose)
    }
    )
};
file.addEventListener('input', (e)=>{  
  name = e.target.files[0].name
  reader.readAsText(e.target.files[0]);
})
document.getElementById('Deattachbtn').addEventListener('click',()=>{
    chrome.runtime.sendMessage({action:'Deattach'}) 
    window.close();
  }
)