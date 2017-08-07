const tokenService = require('./token-service');

//eslint-dispable-next-line
module.exprots = function getEnsureAuth() {

    return function ensureAuth(req, res, next) {
        const token = req.get('Autorization');
        if(!token) {
            return next({ 
                code: 401,
                error: 'No Authorization Found'
            });
        }

        tokenService.verify(token)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(() => {
                next({
                    code: 401,
                    error: 'Authorization Failed'
                });
            });
    };
};