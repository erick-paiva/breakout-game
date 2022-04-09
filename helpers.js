function perdeu() {
 
  botaoDireito.style = "display: none";
  botaoEsquerdo.style = "display: none";

  start = true
  pause = true

  game_over_text.style = "display: flex";

  tocarMusica("game_over.wav");
}

function vitoria() {
  tocarMusica("vitoria.mp3");
  const card_vitoria = document.querySelector(".vitoria");
  const button_vitoria = document.querySelector(".jogar_novamente_win");
  const video = document.querySelector(".vitoria video");
  video.play();
  card_vitoria.style = "display: flex";
  botaoDireito.style = "display: none";
  botaoEsquerdo.style = "display: none";

  button_vitoria.addEventListener(
    "click",
    function () {
      location.reload();
    },
    false
  );

}

const button = document.querySelector(".jogar_novamente");
button.addEventListener("click", function () {
//   tocarMusica("star_game.wav");
    // start = false
    // pause = true

  setTimeout(() => {
    
    location.reload();
  }, 1000);
});
