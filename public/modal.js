let modal = document.getElementById('zeModal');
// let btn = document.getElementById("zeBtn");
let span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    if (window.location.href.includes('/units')) {
        unitsCRUD();
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
