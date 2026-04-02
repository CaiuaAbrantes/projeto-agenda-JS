exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este e o valor da variavel local';
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('404');
    }   
    next();
}

exports.csfrMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}