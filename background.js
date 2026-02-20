let delay = 0;
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
    // Get all windows
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