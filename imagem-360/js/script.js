const container = document.getElementsByClassName("container")[0];
const image = document.getElementsByClassName("car-image")[0];

const cursor = {
     isDragging: false,
     initialPosition: 0,
};

let currentImage = 1;

function updateImage(direction) {
     currentImage = direction > 0 ? ((currentImage == 1) ? 12 : currentImage - 1) : ((currentImage == 12) ? 1 : currentImage + 1);
     image.src = `./images/${currentImage}.jpg`;
}

container.addEventListener("mousedown", ({ clientX }) => {
     cursor.isDragging = true;
     cursor.initialPosition = clientX;
});

container.addEventListener("mouseup", () => {
     cursor.isDragging = false;
});

container.addEventListener("mousemove", ({ clientX }) => {
     if (!cursor.isDragging)
          return;

     const offset = cursor.initialPosition - clientX;

     if (Math.abs(offset) >= 50) {
          updateImage(offset);
          cursor.initialPosition = clientX;
     }
});