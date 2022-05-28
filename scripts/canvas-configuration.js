var canvasSettings = {
    //Default Settings
    colorStroke: $("#colorStroke").val(),
    colorFill: $("#colorFill").val(),
    brushSize: $('#brushSize').val(),
    //Text Options
    textFont: $('#textFont').val(),
    textSize: $('#textSize').val(),
    //Setting Functions
    changeStroke: function(jscolor){canvasSettings.colorStroke = "#"+jscolor;},
    changeFill: function(jscolor){canvasSettings.colorFill = "#"+jscolor;},

    //Tool Functions
    pencilButton: DrawingBezier,
    lineButton: DrawingLine,
    rectangleButton: DrawingRectangle,
    circleButton: DrawingEllipse,
    triangleButton: DrawingTriangle,
    clearButton: clear,
    eraserButton: DrawingEraser,
    textButton: DrawingText,
    downloadButton: download,
    //Canvas Filter
    filterImage: function(){},
    //Admin Functions 
    downloadCanvas : function(){},
    clearCanvas: function(){},
    //Bug Fix functions
    clearText: function(){},
    //Undo Function Object
    undoObject: {
        actionCount: 0,
        states: [],
        savePoint: 0,
        undoAction: function(){
                        if(canvasSettings.undoObject.actionCount>1){
                            canvasSettings.undoObject.actionCount--;
                            canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
                            contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
                        }
                    },
        redoAction: function(){
                        if(canvasSettings.undoObject.actionCount == canvasSettings.undoObject.savePoint && canvasSettings.undoObject.actionCount<canvasSettings.undoObject.states.length){
                            canvasSettings.undoObject.actionCount++;
                            canvasSettings.undoObject.savePoint++;
                            contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
                        }
                        else if(canvasSettings.undoObject.actionCount != canvasSettings.undoObject.savePoint){
                            canvasSettings.undoObject.states.splice(canvasSettings.undoObject.actionCount);
                            canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
                        }
                    }
    },
}

document.onkeydown = canvasSettings.keyPress;

//Change Tool
$('body').on("click",".toolButton", function(){
    //Bug fix
    canvasSettings.clearText();
    // Undo eraser and clear all effect
    contextReal.globalCompositeOperation="source-over";
    //Assign function on click
    var toolButton = $(this).attr("class").split(' ')[1];
    currentFunction = new canvasSettings[toolButton](contextReal,contextDraft);
    /*Highlight button*/
    $('.toolButton').removeClass("active");
    $(this).addClass("active");
    //Shows textbox options if text tool is active
    if(/textButton/.test($('.active')[0].className)){
        $('#textOptions').slideDown().css("display","flex");
    }
    else {
        $('#textOptions').slideUp();//.css("display","none");
    }
});
$(window).resize(function(){
    $('#textOptions').css("display","none");
})
//Clear text
canvasSettings.clearText = function(){
    $('#textInput').css({"display":"none","transform":"translateY(0) translateX(0)"});
    $('#textInput').val('');
}
