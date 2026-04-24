const track = document.getElementById("track");
const cards = document.querySelectorAll(".card_art");  //devuelve el array de tarjetas

let index = 0;

document.querySelector(".right").onclick = () => {
  if (index < cards.length - 2) {
    index++;
    update();
  }
};

document.querySelector(".left").onclick = () => {
  if (index > 0) {
    index--;
    update();
  }
};
//hacia la izquierda es la ilusión 

function update() {
  track.style.transform = `translateX(-${index * 50}%)`;
}

document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});