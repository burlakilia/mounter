exports['module should resolve strict version number'] = function(test) {
    var version = require('../src/utils/version'),
        list = ['0.0.2', '0.0.3'];

    test.ok(version.get('0.0.1', list) === '*', 'if list doesn\'t contain strict version, module should return *');
    test.ok(version.get('0.0.1', []) === '*', 'version for empty list should return *');

    test.ok(version.get('0.0.2', list) === '0.0.2', 'strict version found');

    test.done();
};

exports['module should resolve version number with wild card'] = function(test) {
    var version = require('../src/utils/version'),
        list = ['0.0.2', '0.0.3', '0.2.1', 'v0.2.2', '1.0.0', '1.0.1'];

    test.ok(version.get('0.0.x', list) === '0.0.3', 'correct resolve wild card in path');
    test.ok(version.get('0.x.x', list) === 'v0.2.2', 'correct resolve wild card in minor');
    test.ok(version.get('x.x.x', list) === '1.0.1', 'correct resolve wild card in  major');
    test.ok(version.get('x', list) === '1.0.1', 'correct resolve wild card');
    test.done();
};

exports['module should resolve version with logical expression'] = function(test) {
    var version = require('../src/utils/version'),
        list = ['0.0.2', '0.0.3', '0.2.1', '0.2.2', '1.0.0', '1.0.1'];

    test.ok(version.get('>0.0.1', list) === '1.0.1', 'should return larger version');
    test.ok(version.get('<1.0.1', list) === '1.0.0', 'should return previous version');
    test.done();
};

exports['modules should resolve dirty version list'] = function(test) {
    var version = require('../src/utils/version'),
        list = ["CCNet-Build-1.0.0-build.r2c92933","v.0.11.0","v0.10.0","v0.13.0","v0.14.0","v0.2.0","v0.3.0","v0.4.15","v0.4.16","v0.4.18","v0.4.21","v0.4.22","v0.4.4","v0.4.7","v0.6.0","v0.6.1","v0.6.2","v0.7.0","v0.7.1","v0.9.0"];


    test.ok(version.get('0.4.16', list) === 'v0.4.16', 'strict version found');
    test.ok(version.get('0.4.x', list) === 'v0.4.22', 'version with wild card in path version found');
    test.ok(version.get('>0.9.0', list) === 'v0.14.0', 'bigger version found');
    test.ok(version.get('<0.9.0', list) === 'v0.7.1', 'previous version found');

    test.done();
}