class Drawinghalfcircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextReal.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextDraft.strokeStyle = canvasSettings.colorStroke; //canvas-configuration.js
        this.contextDraft.fillStyle = canvasSettings.colorFill; //canvas-configuration.js
        this.contextReal.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextDraft.lineWidth = canvasSettings.brushSize; //canvas-configuration.js
        this.contextReal.beginPath();
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height); //- to clear draft context before redrawing
        this.contextDraft.beginPath();        
        this.contextDraft.ellipse(this.origX, this.origY, Math.abs(coord[0]- this.origX), Math.abs(coord[1] - this.origY), 0 * Math.PI/180, 0, 2 * Math.PI) // rotation hardcoded as zero - essentially drawing an arc from zero @ x-axis to 2pi;
        let radius = 0;
    let pointX = coord[0] - this.origX;
    let pointY = coord[1] - this.origY;
    radius = Math.sqrt(pointX * pointX + pointY * pointY);
    this.contextDraft.clearRect(
      0,
      0,
      canvasDraft.clientWidth,
      canvasDraft.height
    );
    this.contextDraft.beginPath();
    this.contextDraft.arc(this.origX, this.origY, radius, 0, Math.PI);
    this.contextDraft.fill();
    this.contextDraft.closePath();
    this.contextDraft.stroke();
  }
  onMouseUp(coord) {
    let radius = 0;
    let pointX = coord[0] - this.origX;
    let pointY = coord[1] - this.origY;
    radius = Math.sqrt(pointX * pointX + pointY * pointY);
    this.contextDraft.clearRect(
      0,
      0,
      canvasDraft.clientWidth,
      canvasDraft.height
    );
    this.contextReal.beginPath();
    this.contextReal.arc(this.origX, this.origY, radius, 0, Math.PI);
    this.contextReal.closePath();
    this.contextReal.fill();
    this.contextReal.stroke();
    this.onFinish();
    push(); //for redo/ undo
  }
  onMouseLeave() {}
  onMouseEnter() {}
  onFinish(){
    canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount] = new Image();
    canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount].src = canvasReal.toDataURL();
    canvasSettings.undoObject.actionCount++;
}
}