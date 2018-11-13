// STUFF
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function about(number,aleat) {
    let numAleat = Math.round(number*aleat/100);
    let aboutNum = Math.floor((Math.random() * (numAleat*2)) + 1)+number-numAleat;
    return aboutNum;
};
