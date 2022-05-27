let canvasReal = document.getElementById("canvas-real");
let contextReal = canvasReal.getContext("2d");
let canvasDraft = document.getElementById("canvas-draft");
let contextDraft = canvasDraft.getContext("2d");
let step = -1;
let userhistory = [];

//存放步驟結束當下的陣列
function push() {
  step++;
  console.log("step:", step)
  if (step < userhistory.length - 1) {
      userhistory.length = step + 1
  }
  userhistory.push(canvasReal.toDataURL());
  console.log("userhistory: ", userhistory); //當前影像存成 Base64 編碼的字串並放入陣列
}

  //上一步的function
  function undo() {
    console.log("undo:");
    if (step > 0) {
        step--;
        console.log("step1:", step);
        let canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step]; //載入剛剛存放的影像
        console.log("canvaspic.",canvaspic.src);
        canvaspic.onload = function() {
          contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
          contextReal.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
    }else if(step == 0) {
      step--;
      contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    }
    if (step < userhistory.length && step > 0) {
        $('.next-step').removeClass('disable-btn');
    }
  }
  
  //下一步的function
  function redo() {
    if (step < userhistory.length - 1) {
        step++;
        const canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step] //載入剛剛存放的影像
        canvaspic.onload = function() {
          contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
          contextReal.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
        if (step === userhistory.length - 1) {
            $('.next-step').addClass('disable-btn');
        }
    }
  }



$("#canvas-draft").mousedown(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseDown([mouseX, mouseY], e);
  dragging = true;
});

$("#canvas-draft").mousemove(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  if (dragging) {
    currentFunction.onDragging([mouseX, mouseY], e);
  }
  currentFunction.onMouseMove([mouseX, mouseY], e);
});

$("#canvas-draft").mouseup(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseUp([mouseX, mouseY], e);
});

$("#canvas-draft").mouseleave(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$("#canvas-draft").mouseenter(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseEnter([mouseX, mouseY], e);
});


class PaintFunction {
  constructor() {}
  onMouseDown() {}
  onDragging() {}
  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}
}



