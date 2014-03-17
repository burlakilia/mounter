var semver = require('semver')

exports.get = function(expr, list) {
    var ret = null;

    if (list.length === 0 || expr === '*') {
        return '*';
    }

    list.map(semver.clean).forEach(function(version) {
        ret = semver.satisfies(version, expr) && (ret && semver.lt(ret, version) || !ret) ? version : ret;
    });


    if (ret) {

        list.forEach(function(version) {
            ret = version.indexOf(ret) !== -1 ? version : ret;
        });

    }

    return ret || '*';
}