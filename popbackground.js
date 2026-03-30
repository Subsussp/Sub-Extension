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

let timer;
let query;
let season;

const ul = document.getElementById('list');


document.getElementById('subsearch').addEventListener(('input'), (e)=>{
  query = e.target.value
  fetchsub()
})
function fetchsub() {
    clearTimeout(timer)
    if(query?.length < 2)return
    timer = setTimeout(async()=> {
    // if(season){
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

  data.results.map((show,)=>{
      const li = document.createElement("li");
      const card = document.createElement("button");
      card.style.display = "flex";
      card.addEventListener("click", () => {
        chrome.tabs.create({ url:
            `https://www.subtitlecat.com/index.php?search=${show.name}`
        });
      });
      card.style.flexDirection = "row";
      card.style.gap = "10px";
      card.style.padding = "10px";
      card.style.border = "1px solid #ccc";
      card.style.borderRadius = "6px";
      card.style.backgroundColor = "#fff";
      card.style.alignItems = "center";
      card.style.width = "200px";
      card.style.cursor = "pointer";

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w92${show.poster_path}`;
      img.alt = show.name;
      img.style.width = "60px";
      img.style.height = "90px";
      img.style.borderRadius = "4px";
      card.appendChild(img);

      const info = document.createElement("div");
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.gap = "4px";

      const title = document.createElement("div");
      title.textContent = show.name;
      title.style.fontWeight = "bold";
      info.appendChild(title);

      const year = document.createElement("div");
      year.textContent = show.first_air_date.split("-")[0]; 
      year.style.fontSize = "12px";
      year.style.color = "#555";
      info.appendChild(year);

      const rating = document.createElement("div");
      rating.textContent = `⭐ ${show.vote_average.toFixed(1)}`;
      rating.style.fontSize = "12px";
      rating.style.color = "#555";
      info.appendChild(rating);

      card.appendChild(info);
      li.style.margin = "0";
      li.style.padding = "0";
      li.appendChild(card)
      ul.parentElement.style.display = 'block'
      ul.appendChild(card)
  })
      if(data.status){
        
        console.log(data)
        // data.subtitles.map((item,i)=>{
        //   const li = document.createElement("li");
        //   const button = document.createElement("button");
        //   const div = document.createElement("div");
        //   // button.textContent = item.name
        //   button.addEventListener("click",async (e)=>{
        //     // let sub =await 
        //     extractSubtitle(item.url)
        //     // console.log(sub)
        //   })
        //   div.textContent = item.episode_from + " " + item.episode_end
        //   li.style.margin = "0";
        //   li.style.padding = "0";
        //   li.appendChild(button)
        //   li.appendChild(div)
        //   ul.appendChild(li)
        // })
      }
    // }

  },400)
}

// async function extractSubtitle(zipUrl){
//   const fullUrl = "https://dl.subdl.com" + zipUrl;
//   const res = await fetch(fullUrl);
//   const blob = await res.blob();

//   const zip = await JSZip.loadAsync(blob);

//   console.log(zip)
//   for (const name of Object.keys(zip.files)) {
//     // if (name.endsWith(".srt")) {

//     //   const srt = await zip.files[name].async("string");

//     //   return srt;

//     // }

//   }

// }

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