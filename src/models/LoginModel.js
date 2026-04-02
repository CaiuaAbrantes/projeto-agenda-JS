const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type:String, required:true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.users = null;
    }

    async register(){
        this.valida();
        if(this.errors.length>0) return;

        await this.userExistis();

        if(this.errors.length>0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try{
            this.user = await LoginModel.create(this.body);
        }
        catch(e){
            console.log(e);
        }
    }

    async userExistis(){
        const user = await LoginModel.findOne({email: this.body.email});
        if(user) this.errors.push('Usuario ja existe');     
    }

    valida(){
        //Validacao, email precisa ser valido, senha precisa ter 3-50 caracteres
        this.cleanUp();
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email Invalido');
        }
        if(this.body.password.length <3 || this.body.password.length >50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        }
    }

    cleanUp(){
        for(let chave in this.body){
           if(typeof this.body[chave] !== 'string'){
            this.body[key] ='';
           }
        }
        this.body = {
            email:this.body.email,
            password:this.body.password,
        };
    }
}

module.exports = Login;