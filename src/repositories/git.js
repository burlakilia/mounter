var cp = require('child_process').exec,
    semver = require('semver'),
    fs = require('fs'),
    curry = require('../utils/curry');

var commands = {
    lsRemote: 'git ls-remote --{{action}} {{repository}}',
    clone: 'git clone {{repository}} {{path}}',
    pull: 'cd {{path}} && git checkout master && git pull',
    checkout: 'cd {{path}} && git checkout -B {{version}} && git reset --hard {{version}}'
};


function Git(config) {
    this.config = config;
}

function exec(command, complete) {
    console.log('   * process: ', command);

    function resolve(err, stdout) {

        if (err) {
            console.error(err);
            complete(err);
            return;
        }

        complete(null, stdout);
    }

    cp(command, resolve);
}

Git.prototype.tags = function(complete) {

    function clean(str) {
        return str.replace(/(refs\/tags\/)(.*)(\^{})/, '$2');
    }

    function parse(err, stdout) {
        var list;

        if (err) {
            complete(err);
            return;
        }

        list = stdout ? stdout.match(/refs\/tags\/(.*)/gi) : [];
        list = list.map(clean);
        complete(null, list);
    }

    exec(commands.lsRemote
        .replace('{{repository}}', this.config.repository)
        .replace('{{action}}', 'tags'), parse);

};

Git.prototype.clone = function(path, complete) {

    exec(commands.clone
        .replace('{{repository}}', this.config.repository)
        .replace('{{path}}', path), complete);

};

Git.prototype.pull = function(path, complete) {
    exec(commands.pull.replace('{{path}}', path), complete);
};

Git.prototype.update = function(base, tag, complete) {
    this[fs.existsSync(base) ? 'pull' : 'clone'](base, curry(this.checkout, base, tag, complete));
}

Git.prototype.checkout = function(path, version, complete) {

    if (version === '*') {
        complete(null, 'Set latest version of repository');
        return;
    }

    exec(commands.checkout
        .replace(/{{version}}/gi, version)
        .replace(/{{path}}/gi, path), complete);

};

exports.create = function(config) {
    return new Git(config)
}