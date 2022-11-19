/* 

this file will be used for the following purpose:

*create the db connection with the help of sequelize
*export  all the functionalities of the model through th 

*
one of the advantages of using index .js file is , other file 
trying to import this file ,just need to provide the modlule name
*/

const config = require("../configs/db.config");
const sequelize = require("sequelize");
const Sequelize = require("sequelize");

//creating the db connections

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect: config.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model.js')(db.sequelize,Sequelize);

module.exports = db;