function showModal(){
    const modal = document.getElementById('myModal');
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    const playAgain = document.querySelector(".play-again");
    const gameSummary = document.querySelector(".game-summary");
    gameSummary.innerText = `Your game summary:
                             ${player.point} points
                             ${player.stage} stages`
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };

    // When the use clicks on play again button, restart the game
    playAgain.onclick = function(event) {
        window.location.reload();
    };
}