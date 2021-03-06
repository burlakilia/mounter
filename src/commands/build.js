var exec = require('child_process').exec,
    async = require('async'),
    path = require('path');

module.exports = function(name, base, component, complete) {
    var tasks = component.build || [];

    function build(task, next) {
        console.log('   * ', task);
        exec(task, { cwd: path.resolve(base, name) }, next)
    }

    tasks.length > 0 && console.log('Build: ' + name);
    async.eachSeries(tasks, build, complete);
};