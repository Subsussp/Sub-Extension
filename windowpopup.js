
  function send(spec,type,payload,callback){
    chrome.runtime.sendMessage({
    to: "content",
    action: "custom",
    spec: spec,
    type:type,
    payload: payload
  },callback);
  }
  // Font size
  let state = '#FFF'

  const sizeSlider = document.getElementById('font-size');
  const sizeVal = document.getElementById('size-val');
  sizeSlider.addEventListener('input', () => {
    sizeVal.textContent = sizeSlider.value + 'px';
   send("subtitles", "Fontsize",sizeVal.textContent,(data)=>{
        console.log(data.statue)
        
      });
  });

  // Weight
  document.querySelectorAll('[data-weight]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-weight]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      send("subtitles","Weight",btn.dataset.weight,(data)=>{
        console.log(data.statue)
      });
    });
  });

  // Color
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      send("subtitles","Color",btn.dataset.color,(data)=>{
        console.log(data.statue)
      });

    });

  });

  // Position
  const posSlider = document.getElementById('position');
  const posVal = document.getElementById('pos-val');
  posSlider.addEventListener('input', () => {
    posVal.textContent = posSlider.value + '%';
    send("subtitles","Position", (100 - posSlider.value) + '%',(data)=>{
        console.log(data.statue)
        
      });
  }); 
  function updateColorButtons() {
    document.querySelectorAll('.color-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.color === color);
    });
  }
  // custom color picker 
  document.getElementById('customColor').addEventListener('input', (e) => {
      color = e.target.value;
      updateColorButtons()
      send("subtitles","Color",color,(data)=>{
        console.log(data.statue)
      });
  });
  // Delay
  let delay = 0;
  const delayVal = document.getElementById('delay-val');

  function updateDelay() {
    delayVal.value = +delay.toFixed(1) ;
  }

  document.getElementById('delay-minus').addEventListener('click', () => {
    send("delay","", -0.1,(data)=>{
      delay = data.delay
      updateDelay();
    });
  });
  delayVal.addEventListener("input", (e) => {
      send("delay","Input",delayVal.value,(data)=>{
      delay = +delayVal.value
    });
  });
  document.getElementById('delay-plus').addEventListener('click', () => {
    send("delay","", +0.1,(data)=>{
      delay = data.delay
      console.log(delay)
      updateDelay();
    });
  });

  document.getElementById('delay-reset').addEventListener('click', () => {
    delay = 0;
    send("delay","Reset",0,(data)=>{
        console.log(data.statue)
        
      });
    updateDelay();
  });
