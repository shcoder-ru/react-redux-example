var express = require('express');
var app = express();
var router = express.Router();
var rest = require('rest-req-res');

var config = {
    app: { port: 31288, host: '127.0.0.1' },
    api: { version: 'v1', origin: ['http://localhost:8080'] },
    cors: {
        maxAge: 86400,
        allowHeaders: ['Content-Type', 'Accept', 'Origin', 'X-HTTP-Method-Override', 'User-Agent', 'Authorization',
            'Cache-Control', 'Keep-Alive', 'X-Requested-With', 'If-Modified-Since'],
        'allowMethods': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    },
    errors: {
        BAD_REQUEST: { code: 400, status: 400, message: 'Bad Request' },
        NOT_FOUND: { code: 404, status: 404, message: 'Not Found' },
        INTERNAL_SERVER_ERROR: { code: 500, status: 500, message: 'Internal Server Error' }
    }
};

app.set('config', config);
rest(app);

router.use(function Log(req, res, next) {
    console.log(req.path);
    next();
});

router.get('/search/:value', function(req, res){
    var searchValue = req.params.value;
    var fakeResultsNumber = Math.ceil(Math.random()*20);
    var results = [];
    for (var i = 0; i < fakeResultsNumber; i++) {
        results.push(searchValue + '-' +Math.random());
    }
    res.success({
        results: results
    }, 200, {
        search: searchValue,
        timestamp: Date.now()
    });
});

app.use('/'+config.api.version, router);
app.listen(config.app.port, config.app.host);
