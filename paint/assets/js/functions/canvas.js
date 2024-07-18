const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#000";
let brushSize = 10;
let isPainting = false;
let activeTool = "brush";

function startPainting() {
     isPainting = true;
}

function stopPainting() {
     isPainting = false;
}

function draw({ clientX, clientY }) {
     if (!isPainting)
          return;

     ctx.globalCompositeOperation = "color";
     ctx.beginPath();

     clientX -= canvas.offsetLeft;
     clientY -= canvas.offsetTop;

     let fullCircle = Math.PI * 2;
     let circleRadius = brushSize / 2;

     ctx.arc(clientX, clientY, circleRadius, 0, fullCircle);
     ctx.fill();
}

function changeColor({ target }) {
     ctx.fillStyle = target.value;
}

function erase({ clientX, clientY }) {
     if (!isPainting)
          return;

     ctx.globalCompositeOperation = "destination-out";
     ctx.beginPath();

     clientX -= canvas.offsetLeft;
     clientY -= canvas.offsetTop;

     let fullCircle = Math.PI * 2;
     let circleRadius = brushSize / 2;

     ctx.arc(clientX, clientY, circleRadius, 0, fullCircle);
     ctx.fill();
}

function changeTool({ target }) {
     tools.forEach(tool => {
          tool.classList.remove("active");
     });

     const selectedTool = target.closest("button");
     selectedTool.classList.add("active");
     const action = selectedTool.getAttribute("data-action");
     activeTool = action;
}

function changeSize({ target }) {
     sizeButtons.forEach(tool => {
          tool.classList.remove("active");
     });

     const selectedSize = target.closest("button");
     selectedSize.classList.add("active");
     const size = selectedSize.getAttribute("data-size");
     brushSize = Number(size);
}

function action(event) {
     if (activeTool == "brush")
          draw(event);

     if (activeTool == "rubber")
          erase(event);
}

function clearCanvas(event) {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
}