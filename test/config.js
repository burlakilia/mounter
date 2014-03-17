exports['config should have correct endpoint for private git endpoint'] = function(test) {
    var config = require('../src/utils/conf').load(__dirname + '/misc/mounter')['app'];

    test.ok(typeof config.endpoint === 'object', 'have endpoint object')
    test.ok(config.endpoint.version === '0.0.1', 'correct version');
    test.ok(config.endpoint.repository === 'git@git.dev:itoapp.git', 'correct repository');
    test.ok(config.endpoint.vcs === 'git', 'correct vcs');
    test.done();
};

exports['config should have correct endpoint for github'] = function(test) {
    var config = require('../src/utils/conf').load(__dirname + '/misc/mounter')['jquery'];

    console.log(config);

    test.ok(typeof config.endpoint === 'object', 'have endpoint object')
    test.ok(config.endpoint.version === '1.9.x', 'correct version');
    test.ok(config.endpoint.repository === 'https://github.com/jquery/jquery.git', 'correct repository');
    test.ok(config.endpoint.vcs === 'git', 'correct vcs');
    test.done();
}