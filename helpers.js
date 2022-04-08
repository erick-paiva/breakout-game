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
const button = document.querySelector(".jogar_novamente");
button.addEventListener("click", function () {
    tocarMusica("star_game.wav");
    setTimeout(() => {

        location.reload();
    },1000)
  });

