var async = require('async'),
    path = require('path'),
    curry = require('./utils/curry'),
    config;

var available = ['update', 'build', 'cleanup'];

function execute(action, completed) {
    var tasks = {},
        section,
        key,
        base;

    for(key in config) {
        section = config[key];

        base = path.resolve(process.cwd(), section.path || '');
        tasks[key] = curry(require('./commands/' + action), key, base, section);
    }

    async.series(tasks, completed);
}

exports.run = function(args, completed) {
    var action = args.shift(),
        prefix = '';

    process.argv.forEach(function(val) {
        val.indexOf('--prefix=') !== -1 && (prefix = val.replace('--prefix=', ''));
    });

    if (!action && available.indexOf(action) === -1) {
        console.log('Usage: mounter <command>');
        console.log('where <command> is one of:', available.join(', '));
        completed(null);
        return;
    }

    prefix = path.resolve(process.cwd(), prefix);
    config = require('./utils/conf').load(prefix + '/mounter.json')

    execute(action, completed);
}