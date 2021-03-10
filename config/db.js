const Sequelize = require('sequelize')
const sequelize = new Sequelize('faceapi', 'teste', 'lajg32d559862', {
    host: '157.245.1.76',
    dialect: 'mysql'

})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso, Gabriel')
}).catch(function(err){
    console.log('Falha ao conectar, Gabriel. O código do erro é:' + err)
})

// Usuario 
const Usuario = sequelize.define('usuarios', {
    nome :  {
        type: Sequelize.TEXT
    },
    ra : {
        type: Sequelize.STRING
    } ,
    cpf : {
        type: Sequelize.STRING 
    },
    rg : {
        type: Sequelize.STRING
    },
    nome_mae : {
        type: Sequelize.TEXT
    }
})


const Sessao = sequelize.define('sessao', {
    paper: {
        type: Sequelize.TEXT
    }
})

Sessao.belongsTo(Usuario, {
    as: 'SessaoRef',
    foreignkey: 'sessId'
})


/* 
Sessao.create({
    paper: 'Lazy loading on dinamic portraited websites: an holistic approach', 
    SessaoRefId: 2
})


Usuario.create({
    nome : "Lucas Gabriel Guilherme dos Santos",
    ra: "356726",
    cpf: "067" ,
    rg:"2008", 
    nome_mae:"Antônia Guilherme"
}) 

//Usuario.sync({force : true})
//Sessao.sync({force: true})

*/
