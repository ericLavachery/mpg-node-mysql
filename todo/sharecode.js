// Epeli has a nice solution here http://epeli.github.com/piler/ that even works without the library, just put this in a file called share.js

(function(exports){
    // function code here?
    exports.test = function(){
        return 'This is a function from shared module';
    };
}(typeof exports === 'undefined' ? this.share = {} : exports));

// On the server side just use:
var share = require('./share.js');
share.test();

// And on the client side just load the js file and then use
share.test();

// In my Express folder besides the static (public) folder, I have also a folder named 'shared' which is also accessible from the client like the 'public' folder like that:
app.use(express.static('public'));
app.use(express.static('shared'));
