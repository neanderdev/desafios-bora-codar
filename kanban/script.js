const cards = document.querySelectorAll(".card");
const dropzones = document.querySelectorAll(".dropzone");

cards.forEach((card) => {
  card.addEventListener("dragstart", dragstart);
  card.addEventListener("dragend", dragend);
});

dropzones.forEach((dropzone) => {
  dropzone.addEventListener("dragover", dragover);
  dropzone.addEventListener("dragleave", dragleave);
  dropzone.addEventListener("drop", drop);
});

function dragstart() {
  dropzones.forEach((dropzone) => dropzone.classList.add("highlight"));
  this.classList.add("is-dragging");
}

function dragend() {
  dropzones.forEach((dropzone) => dropzone.classList.remove("highlight"));
  this.classList.remove("is-dragging");
}

function dragover(e) {
  e.preventDefault();

  const cardBeingDragged = document.querySelector(".is-dragging");

  this.classList.add("over");

  this.appendChild(cardBeingDragged);
}

function dragleave() {
  this.classList.remove("over");
}

function drop(e) {
  e.preventDefault();

  this.classList.remove("over");
}
