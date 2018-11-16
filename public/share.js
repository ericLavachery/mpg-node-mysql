(function(exports){
    exports.isJSON = function(string){
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    };
}(typeof exports === 'undefined' ? this.isJSON = {} : exports));

// (function(exports){
//     exports.makeMyDay = function(a,b){
//         if (a+b == 7) {
//             console.log('cacaboudin!');
//         } else {
//             console.log(a+'+'+b+' ça fait pas 7, ducon!');
//         }
//     };
// }(typeof exports === 'undefined' ? this.mmd = {} : exports));
