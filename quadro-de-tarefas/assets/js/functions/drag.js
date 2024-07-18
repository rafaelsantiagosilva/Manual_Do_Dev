let draggedCard;

function dragStart({ target, dataTransfer }) {
     draggedCard = target;
     dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
     event.preventDefault(); // Mudando o cursor
}

function dragEnter({ target }) {
     if (target.classList.contains("column__cards"))
          target.classList.add("column-highlight");
}

function dragLeave({ target }) {
     target.classList.remove("column-highlight");
}

function drop({ target }) {
     if (!target.classList.contains("column__cards"))
          return;

     target.classList.remove("column-highlight");
     target.append(draggedCard);
}

function createCard({ target }) {
     if (!target.classList.contains("column__cards"))
          return;

     const card = document.createElement("section");

     card.classList.add("card");
     card.draggable = "true";
     card.contentEditable = true;

     card.addEventListener("focusout", () => {
          card.contentEditable = false;

          if (!card.textContent)
               card.remove();
     });

     card.addEventListener("dragstart", dragStart);
     target.append(card);
     card.focus();
}