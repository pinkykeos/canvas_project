function download() {
    var canvas = document.getElementById("canvas-real");
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
}