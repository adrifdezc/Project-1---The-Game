window.onload = () => {
  //when clicking instructions
  document.getElementById("instructions").onclick = () => {
    //change innerHTML to show the parchment (pergamino)
    document.getElementById(
      "logo"
    ).innerHTML = `<img src="../images/parchment.png" class="parchment" alt="">`;
    //when clicking on instructions
    document.getElementById("instructions").onclick = () => {
      location.reload();
    };
  };
  document.getElementById("start-button").onclick = () => {
    scubaDivingApp.init(document.querySelector("#canvas"));
    document.getElementById("logo").innerHTML = "";
    document.getElementById("start-button").innerHTML = "HOME SCREEN";
    document.getElementById("start-button").onclick = () => {
      location.reload();
    };
  };
};
