var async = require('async'),
    path = require('path'),
    curry = require('./utils/curry'),
    settings = {},
    config;

var commands = ['update', 'build', 'cleanup'],
    options = ['--prefix', '--config'];

function execute(action, completed) {
    var tasks = {},
        section,
        key,
        base;

    for(key in config) {
        section = config[key];

        base = path.resolve(settings.prefix || process.cwd(), section.path || '');
        tasks[key] = curry(require('./commands/' + action), key, base, section);
    }

    async.series(tasks, completed);
}

function tune(val) {
    var key = '';

    options.forEach(function(option) {
        key = option + '=';
        val.indexOf(key) !== -1 && (settings[option.replace('--', '')] = val.replace(key, ''));
    });

}

exports.run = function(args, completed) {
    var action = args.shift();

    if (!action && commands.indexOf(action) === -1) {
        console.log('Usage: mounter <command> [<options>]');
        console.log('where <command> is one of:', commands.join(', '));
        console.log('where <options> is one of:', options.join(', '));
        completed(null);
        return;
    }

    process.argv.forEach(tune);
    settings.prefix = path.resolve(process.cwd(), (settings.prefix || ''));
    settings.config = path.resolve(process.cwd(), (settings.config || './mounter.json'));
    config = require('./utils/conf').load(settings.config);

    execute(action, completed);
};