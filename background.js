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
let delay = 0;
let backEnd = `https://extention-442a3505471f.herokuapp.com`
let lastWindowId ;
// let backEnd = `http://localhost:3000`
chrome.runtime.onMessage.addListener((msg,callback,sendResponse)=>{
  if(msg?.action == "backgroundcall"){
    sendResponse({from:'background.js'})
    chrome.tabs.query({ active: true, currentWindow: true },(tabs)=>{
        if (!tabs[0]) return;
        const tabId = tabs[0].id;
        let arrofobj = []
        msg.data.time.forEach((item,i) => {
          arrofobj.push({...item,text:msg.data.subtitle[i]})
        });
        chrome.tabs.sendMessage(tabId, {
          action: 'srtuploaded',
          data: arrofobj,
          name:msg?.data?.name
        });
        
  })
    return true
  }
  if(msg?.action == "FetchAndinject"){
    fetch(`${backEnd}/api/download?fileId=${msg?.data?.fileid}`).then(async (file)=>{
      let url = await file.json()
      sendResponse({remaining:url.remaining})
      try {
        let textReq = await fetch(url.link)
        let subText = await textReq.text()
        let linesArr = subText.split('\n')
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
        chrome.tabs.query({ active: true, currentWindow: true },(tabs)=>{
          if (!tabs[0]) return;
          const tabId = tabs[0].id;
          let arrofobj = []
          time.forEach((item,i) => {
            arrofobj.push({...item,text:subtitle[i]})
          });
          chrome.tabs.sendMessage(tabId, {
            action: 'srtuploaded',
            data: arrofobj,
            name: url.file_name
          });
  })
      } catch (error) {
        console.log(error)
      }
    })

    return true
  }
  if(msg?.type == "SUB_FETCH"){
    if(msg.isTv){
      fetch(`${backEnd}/api/search?q=${encodeURIComponent(msg.name)}&imdb_id=${msg.imdb_id}&year=${msg.year}&tmdb_id=${msg.tmdb_id}&episode=${msg.episode}&session=${msg.session}&isTv=${true}`).then(async (fetchdata)=>{      
        let subtitles = await fetchdata.json()
        sendResponse({sub:subtitles})
      })
    }else{
       fetch(`${backEnd}/api/search?q=${encodeURIComponent(msg.name)}&imdb_id=${msg.imdb_id}&year=${msg.year}&tmdb_id=${msg.tmdb_id}&isTv=${false}`).then(async (fetchdata)=>{      
        let subtitles = await fetchdata.json()
        sendResponse({sub:subtitles})
      })
    }
    return true
  }
  if(msg?.type == "CACHED_VALUES"){
  chrome.storage.local.get(["state","searchtitle","searchdata","tvshows","movies","catg","card","cardSub","CachedSession","CachedEp"]).then((result)=>{
    sendResponse(result)
  })
    return true
  }
  if(msg?.type == "CACHE_VALUES"){
    chrome.storage.local.set({state:msg.state,
      searchdata:msg.tempall,
      searchtitle:msg.query,movies:msg.tempmovies,tvshows:msg.temptvshows,cardSub:msg.cardSub,card:msg.card,catg:msg.tempcatg,CachedSession:msg.CachedSession,CachedEp:msg.CachedEp}).then((result)=>{
        sendResponse({})
    })
    return true
  }
  if(msg?.action == 'Deattach'){
    chrome.system.display.getInfo((displays) => {
      const { width, height } = displays[0].workArea;

      const popupWidth = Math.min(510, Math.floor(width * .42));
      const popupHeight = Math.min(700, Math.floor(height * 0.4));
      chrome.windows.getLastFocused({ populate: false, windowTypes: ["normal"] }, (window) => {
        lastWindowId = window.id
      })
      chrome.windows.create({
        url: chrome.runtime.getURL("windowpopup.html"),
        type: "popup",
        width: popupWidth,
        height: popupHeight,
        left: width - popupWidth - 30,
        top: (Math.floor(80 /100 * height))
      });
    });
    return true
  }
  if(msg?.to == "content"){

      chrome.tabs.query({active:true,windowId:lastWindowId},(tabs)=>{
        const activeTab = tabs[0];
        if (!activeTab) return;
        chrome.tabs.sendMessage(activeTab.id,{
              action: msg?.action,
              spec: msg?.spec,
              type:msg?.type,
              payload:msg?.payload
            },sendResponse);


      })
    return true
  }
  if(msg?.type == 'SUB_GET'){
    chrome.storage.local.get([`subtitles_${msg?.LocationId}`],(result)=>{
    let data = result[`subtitles_${msg?.LocationId}`]
    if(data?.data?.length > 0){
      sendResponse({sub: data?.data,name:data?.name})
    }
  })
      return true;
  }if (msg?.type == 'SUB_SAVE'){
    chrome.storage.local.set({
      [`subtitles_${msg?.LocationId}`]:{data:msg?.arrofobj,name:msg.name}
    })
    sendResponse({state: 'true'})
    return true
  }

})
