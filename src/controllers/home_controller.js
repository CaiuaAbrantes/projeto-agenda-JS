exports.paginaInicial = (req, res) =>{
    res.render('index', {
        titulo: 'Titulo Da Pagina',
        numeros : [1, 5 ,12 , 2, 7],
    })
}

exports.trataPost = (req, res) =>{
    res.send('Oi sou sua nova rota de post')
}

