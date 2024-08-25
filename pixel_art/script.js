'use strict';

const canvas = document.querySelector('.canvas');
const inputSize = document.querySelector('.input-size');
const inputColor = document.querySelector('.input-color');
const usedColors = document.querySelector('.used-colors');
const buttonSave = document.querySelector('.button-save');
const colResizer = document.querySelector('.resize');
const main = document.querySelector('main');

const MIN_CANVAS_SIZE = 4;

let isPainting = false;
let isResizing = false;

const createElement = (tagName, className = "") => {
  const element = document.createElement(tagName);

  if (className)
    element.className = className;

  return element;
}

const addNewUsedColor = () => {
  const buttonColor = createElement('div', 'button-color');
  buttonColor.addEventListener('click', () => inputColor.value = buttonColor.dataset.color);
  buttonColor.dataset.color = inputColor.value;
  buttonColor.style.backgroundColor = inputColor.value;
  usedColors.append(buttonColor);
}

const paintPixel = (pixel) => {
  pixel.style.backgroundColor = inputColor.value;

  if (!usedColors.querySelector(`[data-color="${inputColor.value}"]`))
    addNewUsedColor(inputColor.value);
}

const createPixel = () => {
  const pixel = createElement('div', 'pixel');
  pixel.addEventListener('mousedown', (e) => paintPixel(e.target));
  pixel.addEventListener('mouseover', (e) => {
    if (isPainting)
      paintPixel(e.target)
  });
  return pixel;
}

const loadCanvas = () => {
  canvas.innerHTML = '';
  const length = inputSize.value;

  for (let i = 0; i < length; i++) {
    const row = createElement('div', 'row');

    for (let j = 0; j < length; j++)
      row.append(createPixel());

    canvas.append(row);
  }
}

const updateCanvasSize = () => {
  if (inputSize.value < MIN_CANVAS_SIZE)
    inputSize.value = MIN_CANVAS_SIZE;

  loadCanvas();
}

const resizeCanvas = (cursorPositionX) => {
  if (!isResizing) return;

  const canvasOffset = canvas.getBoundingClientRect().left;
  const width = `${cursorPositionX - canvasOffset - 20}px`;

  canvas.style.maxWidth = width;
  colResizer.style.height = width;
};


const saveCanvas = () => {
  html2canvas(canvas, {
    onrendered: (image) => {
      const img = image.toDataURL('image/png');
      const link = createElement('a');
      link.href = img;
      link.download = 'pixelart.png';
      link.click();
    }
  })
}

canvas.addEventListener('mousedown', () => isPainting = true);
canvas.addEventListener('mouseup', () => isPainting = false);

inputSize.addEventListener('change', updateCanvasSize);

colResizer.addEventListener('mousedown', () => isResizing = true);
main.addEventListener('mouseup', () => isResizing = false);
main.addEventListener('mousemove', ({ clientX }) => resizeCanvas(clientX));

buttonSave.addEventListener('click', saveCanvas);

loadCanvas();