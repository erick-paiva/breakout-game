function perdeu() {
  const game_over_video = document.querySelector(".game_over_video");
  const game_over_text = document.querySelector(".game_over");
  botaoDireito.style = "display: none";
  botaoEsquerdo.style = "display: none";

  game_over_text.style = "display: flex";
  game_over_video.style = "display: block";
  game_over_video.play();

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
  tocarMusica("star_game.wav");
  setTimeout(() => {
    location.reload();
  }, 1000);
});
