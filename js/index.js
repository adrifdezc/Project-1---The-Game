window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        scubaDivingApp.init(document.querySelector('#canvas'))
        document.getElementById("logo").innerHTML = ""
        document.getElementById('start-button').innerHTML = 'HOME SCREEN'
        document.getElementById('start-button').onclick = () => {
            location.reload();
    }
}
    
}