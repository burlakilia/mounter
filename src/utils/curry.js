module.exports = function() {
    var args = Array.prototype.slice.call(arguments),
        fn = args.shift();

    return function () {
        fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };

}