const isInsideIframe = window !== window.top;
let subtitleDelay = 0; 
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
    if (v) { observer.disconnect(); fn(v); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
// Overlay
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'my-subtitle-overlay';
  Object.assign(overlay.style, {
    position:        'absolute',
    bottom:          '10%',
    left:            '50%',
    translate:       '-50% 0',
    "white-space":   'nowrap',
    textAlign:       'center',
    color:           'white',
    fontSize:        '1.4em',
    pointerEvents:   'none',
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    zIndex:          '2147483647',
    padding:         '0 30px',
    boxSizing:       'border-box',
    backgroundColor: 'rgba(0,0,0,0.4)',
  });
  return overlay;
}

let LocationId = window.location.href
let subtitles = []

function getActiveCue(time) {
  console.log(+subtitleDelay)
  return subtitles.find(s => (time + +subtitleDelay) >= s.start && (time + +subtitleDelay) <= s.end);
}

let overlay; 

function debug(msg) {
  if (overlay) overlay.innerHTML = `${msg}`;
}

whenReady(() => {

  overlay = createOverlay();
  document.body.appendChild(overlay);

  if (!isInsideIframe && document.querySelectorAll('video').length < 1) {
    return;
  }

  // debug('INSIDE IFRAME — looking for video...');
  const delayControl = document.createElement('div');
  delayControl.style.position = 'fixed';
  delayControl.style.top = '5%';
  delayControl.style.right = '5%';
  delayControl.style.minWidth = '40px';
  delayControl.style.background = 'rgba(255, 0, 0, 0.7)';
  delayControl.style.color = 'white';
  delayControl.style.padding = '8px 12px';
  delayControl.style.borderRadius = '6px';
  delayControl.style.fontSize = '16px';
  delayControl.style.cursor = 'pointer';
  delayControl.style.zIndex = 99999;
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
  document.body.appendChild(delayControl);



  waitForVideo((video) => {
    debug('VIDEO FOUND — injecting overlay into container...');

    const container = video.parentElement;
    const containerPos = getComputedStyle(container).position;
    if (containerPos === 'static') {
      container.style.position = 'relative';
      debug(`container was static — fixed. tag: ${container.tagName}`);
    }
    
    document.body.removeChild(overlay);
    document.body.removeChild(delayControl);

    container.appendChild(overlay);
    container.appendChild(delayControl);
    if(window.localStorage.getItem("delay")){
      delayControl.textContent = `Subtitle Delay: ${(window.localStorage.getItem('delay'))}s` 
      subtitleDelay = +window.localStorage.getItem('delay')
    }
    else{ 
      window.localStorage.setItem("delay",0)
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
    
    debug(`OVERLAY INJECTED — container: ${container.tagName}.${container.className.slice(0, 30)}`);
    video.addEventListener('timeupdate', () => {
      const ct = video.currentTime;
      const cue = getActiveCue(ct);
      if (cue) {
        overlay.innerHTML = `${cue.text}`;
        } else if (subtitles.length === 0) {
        overlay.innerHTML = `<span style="background:rgba(255,140,0,0.6);padding:2px 8px;border-radius:4px;">
          no subtitles loaded — t=${t.toFixed(2)}s delay=${subtitleDelay}
        </span>`;
      } else {        
        overlay.innerHTML = ``;
      }     
    });
    let timeout;

    video.addEventListener("playing", () => {
        hideControl();
    });

    video.addEventListener("pause", () => {
        showControl()
    });

    document.addEventListener("mousemove", () => {
        showControl()

        clearTimeout(timeout);
        timeout = setTimeout(hideControl, 2000);
    });

    chrome.runtime.sendMessage({type:'SUB_GET',LocationId},(respnose)=>{
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
              timeout = setTimeout(hideControl, 2000);
            }
            else if(msg?.type == 'Input'){
              subtitleDelay = +(+msg.payload).toFixed(1);
              window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
              updateButton();
              showControl()
              clearTimeout(timeout);
              timeout = setTimeout(hideControl, 2000);
            }else{  
              subtitleDelay = +((+subtitleDelay + +msg.payload).toFixed(1));
              window.localStorage.setItem("delay",(+subtitleDelay).toFixed(1))
              updateButton();
              showControl()
              clearTimeout(timeout);
              timeout = setTimeout(hideControl, 2000);
            }

            if(sendResponse){
              sendResponse({ delay: subtitleDelay });
              return true
            }
        }
        else if (msg?.spec == "subtitles"){
            if(msg?.type == 'Fontsize'){
              overlay.style.fontSize = msg?.payload
            }else if(msg?.type == "Color"){
              overlay.style.color = msg?.payload
            }else if(msg?.type == "Position"){
                overlay.style.bottom = msg?.payload
            }else if(msg?.type == "Weight"){
                overlay.style.fontWeight = +msg?.payload
            }
        }
        sendResponse({ statue: "ok" });
      }
    });
  });

});