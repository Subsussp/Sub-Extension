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
let timer;
let secTimer;
let epTimer;
let sessionTimer;
let subtitles;
let query;
let season;
let comment = document.getElementById('comment')
let searchinput = document.getElementById('subsearch')
const ul = document.getElementById('list');

 function Checkstorage(){
  let searchtitle = chrome.storage.local.get(["searchtitle","searchdata"]).then((result)=>{
      searchinput.value = result.searchtitle
      query = result.searchtitle
      appenData(result.searchdata)
      comment.style.opacity = 0
      document.getElementById('inplace').style.animation = "none"
      document.getElementById('inplace').style.opacity = 0
  })
}
Checkstorage()
// if (searchtitle.key.length > 1){

// }
searchinput.addEventListener(('input'), (e)=>{
  query = e.target.value
  fetchTvshowMv()
})

async function fetchSub(name,imdb_id,tmdb_id,year,session,episode){
  let fetchdata = await fetch(`http://localhost:3000/api?q=${name}&imdb_id=${imdb_id}&year=${year}&tmdb_id=${tmdb_id}&episode=${episode}&session=${session}`) 
  subtitles = ''
  subtitles = await fetchdata.json()
}
function appendresult(show,i){
    comment.style.opacity = 0
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
      img.src = `https://image.tmdb.org/t/p/w92${show.poster_path}`;
      img.alt = show.name;
      img.style.width = "60px";
      img.style.height = "90px";
      img.style.borderRadius = "4px";
      card.appendChild(img)
      const info = document.createElement("div");
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.gap = "4px"
      const title = document.createElement("div");
      title.textContent = show.name;
      title.style.fontWeight = "bold";
      info.appendChild(title)
      const year = document.createElement("div");
      year.textContent = show.first_air_date.split("-")[0]; 
      year.style.fontSize = "12px";
      year.style.color = "#555";
      info.appendChild(year)
      const rating = document.createElement("div");
      rating.textContent = `⭐ ${show.vote_average.toFixed(1)}`;
      rating.style.fontSize = "12px";
      rating.style.color = "#555";
      info.appendChild(rating)
      card.appendChild(info);
      li.style.margin = "0";
      li.style.padding = "0";
      li.appendChild(card)
      ul.parentElement.style.display = 'block'


      card.addEventListener("click",async () => {
        let results = document.createElement('div')
        let controlbar = document.createElement('div')
        // labels
        let Sessionlabel = document.createElement('label')
        let Eplabel = document.createElement('label')
        let Languagelabel = document.createElement('label')
        // select
        let selectContainer = document.createElement('div')
        let Sessionselect = document.createElement('select')
        let Epselect = document.createElement('select')
        let langselect = document.createElement('select')
        let All = document.createElement('option')
        All.value = "all"
        All.innerHTML = "all"
        langselect.appendChild(All)
        let dict = new Set()

        let fetchsubdiv = document.createElement('div')
        let fetchsubbutton = document.createElement('button')
        fetchsubbutton.style.border = 'none'
        fetchsubbutton.style.outline = 'none'
        fetchsubbutton.style.padding = 'none'
        fetchsubbutton.style.backgroundColor = 'black'
        fetchsubbutton.style.color = 'white'
        fetchsubdiv.style.alignItems = "center";
        fetchsubdiv.style.display = "flex";
        fetchsubbutton.style.padding = '5px 10px'
        fetchsubbutton.innerText = "Fetch"
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
                <a href="${sub.attributes.url}" target="_blank" class="download-btn">⬇</a>
              </div>
            </div>`
              results.appendChild(resultcard)
          }

          })   
        }
        fetchsubbutton.addEventListener('click',async ()=>{
          await fetchSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
          console.log(subtitles)
          subDisplay(langselect.value)
  
        })
        langselect.addEventListener('change',async ()=>{
          if(subtitles?.length > 0){
            subDisplay(langselect.value)
          }
        })

        ul.innerHTML = ''
        ul.appendChild(li)
        ul.style.alignItems = 'center'
        ul.style.flexDirection = "column";
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
        results.style.flexDirection = "column";
        results.style.gap = "10px";
        results.style.width= "100%";
        results.style.alignItems = "center";
        results.style.fontFamily= "cursive"

        langselect.id = 'Language'
        Sessionselect.id = 'Session'
        Epselect.id = 'Episode'

        Sessionlabel.innerHTML = 'Session:'
        Eplabel.innerHTML = 'Episode:'
        Languagelabel.innerHTML = 'Language:'
        let manualsearch = document.createElement('input')
        manualsearch.type = "text"
        manualsearch.style.cssText = `outline: none;border: 1px solid black;padding: 5px 10px 5px 5px ;background-color: transparent;position: relative;width:40%;height:50%;`
        manualsearch.placeholder = "Search Manually";
        console.log(show)
        manualsearch.addEventListener("input",(e)=>{
          clearTimeout(secTimer)
          secTimer = setTimeout(async () => {
              await fetchSub(e.target.value,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
              subDisplay(langselect.value)
            }, 3000);
        })
        Languagelabel.setAttribute("for",'Language')
        Sessionlabel.setAttribute("for",'Session')
        Eplabel.setAttribute("for",'Episode')
        ul.appendChild(results)
        let req = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/external_ids`,{
          headers:{
          Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
          "Content-Type": "application/json"
        }})

        let imdbjson = await req.json()

   
        const tvDetailsRes = await fetch(
          `https://api.themoviedb.org/3/tv/${show.id}`,
          { headers: {          
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
          }});
        const tvDetails = await tvDetailsRes.json();
        if(tvDetails.seasons){
          tvDetails.seasons.map((session)=>{
            let seNumber = session.season_number
            if(seNumber == 0 || isNaN(seNumber))return
            let option = document.createElement('option')
            option.value = seNumber
            option.innerText = seNumber
            Sessionselect.appendChild(option)
          })
        }
        console.log(tvDetails)
        function addEps() {
          const value = Sessionselect.value;
          let object = tvDetails.seasons.filter((session)=>session.season_number == value)[0]
          Epselect.innerHTML = ''
          for(let i =1;i <= object.episode_count;i++){
            let option = document.createElement('option')
            option.value = i
            option.innerText = i
            Epselect.appendChild(option)
          }
          fetchOnChange()
        }
        addEps()
        async function fetchOnChange(){
          await fetchSub(tvDetails.original_name,imdbjson.imdb_id,show.id,show.first_air_date.split("-")[0],Sessionselect.value,Epselect.value)
          subDisplay(langselect.value)
        }
        Epselect.addEventListener("change",()=>{
          clearTimeout(epTimer)
          epTimer = setTimeout(fetchOnChange, 1600);
        });
        Sessionselect.addEventListener("change",addEps);
        selectContainer.appendChild(Sessionlabel)
        selectContainer.appendChild(Sessionselect)
        selectContainer.appendChild(Eplabel)
        selectContainer.appendChild(Epselect)
        selectContainer.appendChild(Languagelabel)
        selectContainer.appendChild(langselect)
        controlbar.appendChild(selectContainer)
        // controlbar.appendChild(manualsearch)
        // fetchsubdiv.appendChild(fetchsubbutton)
        controlbar.appendChild(fetchsubdiv)
        results.appendChild(controlbar)
        // chrome.tabs.create({ url:
        //     `https://www.subtitlecat.com/index.php?search=${show.name}`
        // });
      });
      ul.appendChild(li)
      }
function appenData(data){
  data.map((show,i)=>appendresult(show,i))
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
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ3MGYyYTE5NzdhODgxMDg3NzM3YzQ2YjlkNmEwNiIsIm5iZiI6MTczMjM3NjM4OC45NDQsInN1YiI6IjY3NDFmNzQ0ZDhkYjdkZDFiYTQ1MmVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y7UcPdAWd6nd0KIjBcYAJ-SQJ1dQ96sGGr93UsjnbTw`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();
      ul.innerHTML = ''
      if(data.results.length < 1){
          comment.style.opacity = 1 
      }
      appenData(data.results)
    chrome.storage.local.set({searchtitle:query})
    chrome.storage.local.set({searchdata:data.results})

  },700)
}


reader.onload = (e) => {
    const text = e.target.result;
    let linesArr = text.split('\n')
    // console.log(linesArr)
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
        console.log(respnose.from)
    }
    )
};
file.addEventListener('input', (e)=>{  
  name = e.target.files[0].name
  reader.readAsText(e.target.files[0]);
})
document.getElementById('Deattachbtn').addEventListener('click',()=>{
    window.close();
    chrome.runtime.sendMessage({action:'Deattach'}) 
  }
)