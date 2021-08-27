window.onload = () => {
  //when clicking instructions
  document.getElementById("instructions").onclick = () => {
    let button1 = document.querySelector("#logo img");
    console.log(button1);
    if (button1.classList.contains("splash")) {
        document.getElementById(
        "logo"
      ).innerHTML = `<img src="https://adrifdezc.github.io/Project1-Game/images/parchment.png" class="parchment" alt="">`;
    } else {
      document.getElementById(
        "logo"
      ).innerHTML = `<img src="https://adrifdezc.github.io/Project1-Game/images/watersplash.png" class="splash" alt="Splash" />
      <img src="https://adrifdezc.github.io/Project1-Game/images/GameLogo.png" class="logo-img" alt="Game logo" />`;
    }
    }
  };

  //remove sound
  document.getElementById("audiocontrol").onclick = () => {
    let sound1 = document.querySelector("#audio audio");
    console.log(sound1);

    if (sound1.classList.contains("audio")) {
      document.getElementById(
        "audio"
      ).innerHTML = `<audio src="" class="broken" type="audio/mp3" autoplay></audio>`;
      document.getElementById("audiocontrol").innerHTML = `
      <button type ="submit" id="soundoff" class="first">
      <img src="https://adrifdezc.github.io/Project1-Game/images/soundon.png"  alt=""></button>`;
    } else {
      document.getElementById(
        "audio"
      ).innerHTML = `<audio src="https://adrifdezc.github.io/Project1-Game/sounds/560446__migfus20__happy-background-music.mp3" class="audio" type="audio/mp3" autoplay>
      Your browser does not support the audio tag.
      </audio>`;
      document.getElementById(
        "audiocontrol"
      ).innerHTML = `<button type ="submit" id="soundon" class="first"> <img src="https://adrifdezc.github.io/Project1-Game/images/soundoff.png"  alt=""></button>`;
    }
  };
  //start game
  document.getElementById("start-button").onclick = () => {
    document.getElementById(
      "canvas-border"
    ).innerHTML = `<canvas id="canvas" class="canvas"></canvas>`;
    scubaDivingApp.init(document.querySelector("#canvas"));
    document.getElementById("logo").innerHTML = "";
    document.getElementById(
      "start-button"
    ).innerHTML = `<img src="https://adrifdezc.github.io/Project1-Game/images/homebutton.png"  alt="">`;
    document.getElementById("inst").innerHTML = "";
    document.getElementById("restart").innerHTML = `
    <button type ="submit" id="soundoff">
            <img src="https://adrifdezc.github.io/Project1-Game/images/restartbutton.png" id="restart" alt="">
          </button>`;
    document.getElementById("start-button").onclick = () => {
      location.reload();
    };
    //restart game
    document.getElementById("restart").onclick = () => {
      scubaDivingApp.clearCanvas();
      scubaDivingApp.refreshScreen();
    };
  };
};
