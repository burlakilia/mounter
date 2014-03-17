var version = require('../utils/version'),
    domain = require('domain').create(),
    path = require('path'),
    mkdirp = require('mkdirp');

module.exports = function(name, base, component, next) {

    function update() {
        var endpoint = component.endpoint,
            repository = require('../repositories/' + endpoint.vcs).create(endpoint),
            tag;

        console.log('Update ' + name + ' to version: ' + endpoint.version);

        repository.tags(domain.intercept(function(list) {
            tag = endpoint.version ? version.get(endpoint.version, list) : '*';

            if (tag === null) {
                next(new Error('Repository doesn\'t ' + endpoint.repository + ' contain necessary version: ', endpoint.version));
                return;
            }

            console.log('       * available version: ', tag);
            repository.update(path.resolve(base, name), tag, next);
        }));

    }

    domain.on('error', function(err) {
        next(err);
    });

    mkdirp(base, domain.intercept(update))
};
