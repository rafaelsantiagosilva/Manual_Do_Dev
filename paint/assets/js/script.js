const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mousemove", action);
inputColor.addEventListener("change", changeColor);
buttonClear.addEventListener("click", clearCanvas);

tools.forEach(tool => {
     tool.addEventListener("click", changeTool);
});

sizeButtons.forEach(sizeButton => {
     sizeButton.addEventListener("click", changeSize);
});