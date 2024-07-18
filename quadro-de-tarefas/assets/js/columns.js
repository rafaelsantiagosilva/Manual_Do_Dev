const columns = document.getElementsByClassName("column__cards");

Array.from(columns).forEach((column) => {
     column.addEventListener("dragover", dragOver);
     column.addEventListener("dragenter", dragEnter)
     column.addEventListener("dragleave", dragLeave);
     column.addEventListener("drop", drop);
     column.addEventListener("dblclick", createCard)
});

