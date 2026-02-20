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