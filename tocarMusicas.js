
function tocarMusica(musica){
    const music = new Audio(`./assets/${musica}`);
    music.play();
    // music.loop =true;
    music.playbackRate = 1;
    // music.pause()
}