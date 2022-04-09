function perdeu() {
 
  botaoDireito.style = "display: none";
  botaoEsquerdo.style = "display: none";
  botaoIniciarPartida.style.display = "none";
  botaoIniciarPartida_desktop.style.display = "none";

  // start = true
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

  setTimeout(() => {
    
    location.reload();
  }, 1000);
});

function exibir_botao_iniciar(){

  if (canvas.width <= 800) {
    botaoIniciarPartida.style.display = "flex";
  }else{
    
    botaoIniciarPartida_desktop.style.display = "flex";
  }
}
exibir_botao_iniciar()


