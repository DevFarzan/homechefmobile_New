var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

 var config = {
    development: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 3000,
        secret : "homechef",
        EvenNodeDB: 'mongodb://944745cb5bb672158048fa69ca95586e:944745cb5bb672158048fa69ca95586e@eu-1.evennode.com:27017/944745cb5bb672158048fa69ca95586e'
    },

    test: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 3000,
        secret : "homechef",
        EvenNodeDB: 'mongodb://944745cb5bb672158048fa69ca95586e:944745cb5bb672158048fa69ca95586e@eu-1.evennode.com:27017/944745cb5bb672158048fa69ca95586e'
    },

    production: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 3000,
        secret : "homechef",
        EvenNodeDB: 'mongodb://944745cb5bb672158048fa69ca95586e:944745cb5bb672158048fa69ca95586e@eu-1.evennode.com:27017/944745cb5bb672158048fa69ca95586e'
    }
};

module.exports = config[env];
