'use strict';

var util = require('util');
var conf = require('./conf.js');
var parse = require('./parse.js');
var running = '[[ $(pm2 jlist) != "[]" ]]';

module.exports = {
    pm2_reload: function () {
        return util.format('%s && sudo pm2 reload all || echo "pm2 not started."', running);
    },
    pm2_start: function (name) {
        var project = conf('PROJECT_ID');
        var root = util.format('/srv/apps/%s', project);
        var target = root + '/current';
        var env = parse.env({
            NODE_ENV: name
        });

        return util.format('%s || sudo pm2 start %s/%s -i 2 --name %s -- %s || echo "pm2 already started."',
            running, target, conf('NODE_SCRIPT'), name, env
        );
    }
};