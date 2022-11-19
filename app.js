const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

//initializing express
const app = express();

//using the body-parser middleware

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//initializing the database

const db = require("./models");
const userModel = require('./models/user.model');
const { user } = require('./models');
const { INITIALLY_DEFERRED } = require('sequelize/types/deferrable');
const Category = db.category;
const Product = db.product;
const Role = db.role;

//setting the One to Many relationship between Category and Product
Category.hasMany(Product);//this will create a foreign key column { categoryId} inPr

console.log(Category);
db.sequelize.sync({force:true}).then(() => {
    console.log('table dropped and recreated');
    init();

})

function init(){
    //Initaling few Category
    var categories = [{
        name: "Electronics",
        description: "This category will contain all the electronic products"
    
    },
{   
    name: "KitchenItems" ,
    description : "This category will contail all the Kitchen related product "
                    }];

                    Category.bulCreate(categories).then(() => {
                        console.log("Categories table is initialized");
        }).catch(err => {
            console.log("Error while initializing categories table");

        })

        //adding roles

        Role.create({
            id:1,
            name:"user"
        });

        Role.create({
            id:2,
            name:"admin"
        })
}

//importing the routes and using it 

require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);



module.exports = app;