window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        scubaDivingApp.init(document.querySelector('#canvas'))
        document.getElementById('start-button').innerHTML = 'RESTART'
        document.getElementById('start-button').onclick = () => {
            location.reload();
    }
}
    
}