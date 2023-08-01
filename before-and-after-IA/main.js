const slider = document.getElementById("slider");
const before = document.querySelector(".before-image");
const dragger = document.getElementById("dragger");

slider.addEventListener("input", (event) => {
  before.style.width = event.target.value + "%";

  dragger.style.left = `calc(${event.target.value}%)`;
});
