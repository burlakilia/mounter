var url = require('url');

function treat(config) {
    var data = JSON.parse(JSON.stringify(config)),
        key;

    for(key in data) {
        data[key] = parse(data[key]);
    }

    return data;
}

function parse(component) {
    var uri = url.parse(component.endpoint),
        repository;


    try {
        uri.protocol = uri.protocol || '';
        uri.protocol = (uri.protocol.match(/([a-z]+)/gi) || []);

        repository = uri.href.match(/(.+\/\/)?([^#]*)?/)[2].replace(/\/:/, ':');

        if (uri.protocol.length === 2 && uri.protocol[1]) {
            repository = uri.protocol[1].replace(/^-/, '') + '://' + repository;
        }

    } catch(e) {
        throw new Error('Incorrect git endpoint: ' + component.endpoint);
    }

    component.endpoint = {
        repository: repository,
        version: decodeURI(uri.hash.replace(/^#/, '')),
        vcs: uri.protocol[0]
    };

    return component;
}

exports.load = function(path) {
    return treat(require(path));
}
