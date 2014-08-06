if ( ! Function.prototype.bind) {
    Function.prototype.bind = function bind(that) { // .length is 1
        var target = this;
        if (typeof target !== "function") {
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
        }
        var args = Array.prototype.slice.call(arguments, 1); // for normal call
        var bound = function () {
    
            if (this instanceof bound) {
    
                var result = target.apply(
                    this,
                    args.concat(Array.prototype.slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;
    
            } else {
                return target.apply(
                    that,
                    args.concat(Array.prototype.slice.call(arguments))
                );
    
            }
    
        };
        if(target.prototype) {
            var Empty = function() {};
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
        }
        return bound;
    };
}
