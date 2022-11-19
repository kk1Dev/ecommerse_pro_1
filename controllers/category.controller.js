//this file contains the controller logic for the category resourse
//everytime a crud request come for the category,methods define in this controller file will be executed


const {category} = require("../models");
const db = require("../models");

const Category = db.category;
//

exports.create = (req,res) => {

    //validation of request body

    if (!req.body.name){
        res.status(400).send({
            message: " Name of the category can't be empty !"
        })
        return;
    }
// Creation of the category object to be stored in the db.

const category = {
    name: req.body.name,
    description: req.body.description
};
Category.create(category).then(category => {
    
    console.log(`category name: [${category.name}] got inserted in the DB`)
    
    res.status(201).send(category);
    })
    .catch(err => {
        console.log(`Issue in inserting category name:[${category.name}].
        Error message: ${err.message}`)

        res.status(500).send({
            message:"Some Internal error while starting the category!!"
        })

    })


}


exports.findAll = (req,res) => {
    // supporting the query param
    let categoryName = req.query.name;
    let promise ;
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        });

    }
    else {
        promise = Category.findAll();

    }

    promise.then(categories => {
        res.status(200).send(categories);
    
    }).catch(err => {
        res.status(500).send({
            message: " Some Internal error while fetching all the categories"
        })
    })

}


// get a categories based on the catergory id 



exports.findOne = ( req,res) => {
     const categoryId = req.params.id;

     Category.findByPk(categoryId).then(category => { 
         res.status(200).send(category);

     })
     .catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching on the id"
        })
     })
}

// function to update an existing categories

exports.update = (req, res) => { 
    // validation of the request body

    if(!req.body.name){
        res.status(400).send({
            message: "Name of the category can't be empty!"


        })
        
        return ;

    }
    // creation of the category object to be stored in the DB
    const category = {
        name: req.body.name,
        description: req.body.description
    };
    const categoryId = req.params.id;
    Category.update(category, {
        returning: true,
        where: {
            id: categoryId
        }

    }).then(updatedCategory => { 
        Category.findByPk(categoryId).then(category => {
            res.status(200).send(category);

        }).catch(err => {
            res.status(500).send({
                message: " Some Internal error while fetching the category based on the id"
            })
        })

    }).catch(err => {
        res.status(500).send({
            message: " Some Internal error while fetching the category based on id"

        })
    })
}


// delete an existing category based on the category name

exports.delete = (req,res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: {
            id:categoryId
        }
    }).then(result => {
        res.status(200).send({
            message: "Sucessfully deleted the category"

        });
    }).catch(err => {
        res.staus(500).send({
            message: "Some Internal error while deleting the category based id"
        })
    })
}

