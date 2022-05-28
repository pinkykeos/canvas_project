class DrawingTriangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;           
    }

    onMouseDown(coord,event){
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextReal.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        dragging = true;
        this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.lineTo((coord[0]),(coord[1]));
        this.contextDraft.lineTo(this.origX+(this.origX-coord[0]),(coord[1]));
        this.contextDraft.closePath();
        this.contextDraft.stroke();
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.moveTo(this.origX,this.origY);
        this.contextReal.lineTo((coord[0]),(coord[1]));
        this.contextReal.lineTo(this.origX+(this.origX-coord[0]),(coord[1]));
        this.contextReal.closePath();
        this.contextReal.fill();
        this.contextReal.stroke();
        this.onFinish();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    onFinish(){
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
        canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
        canvasSettings.undoObject.actionCount++;
    }
}