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
let backEnd = `http://localhost:3000`
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
      console.log(file.body)
      let url = await file.json()
      console.log(url)
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
        console.log(subtitle)
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
    sendResponse({})
    return true
  }
  if(msg?.action == 'Deattach'){
    chrome.system.display.getInfo((displays) => {
      const { width, height } = displays[0].workArea;

      const popupWidth = Math.min(510, Math.floor(width * .42));
      const popupHeight = Math.min(700, Math.floor(height * 0.4));

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
    chrome.windows.getAll({ populate: true }, (windows) => {
      const normalWindow = windows.find(w => w.type === "normal");
      if (!normalWindow) return;
      
      const activeTab = normalWindow.tabs.find(t => t.active);
      if (!activeTab) return;
      chrome.tabs.sendMessage(activeTab.id,{
            action: msg?.action,
            spec: msg?.spec,
            type:msg?.type,
            payload:msg?.payload
          },sendResponse);
    });

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
