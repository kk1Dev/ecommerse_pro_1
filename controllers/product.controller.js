// this file contains the controller logic for product resource.
//Everytime any CRUD request come for the product , 
//methods defined in this controller file will be executed.
const db = require("../models");
const Product = db.product;
const Category = db.Category;
const Op = db.Sequelize.Op;

//create and save new product

exports.create = (req,res) => {
    const product = { 
        
        name : req.body.name,
        description : req.body.description,
        cost:req.body.cost,
        categoryId : req.body.categoryId

    };

    // storing : the Product in the DB
    
    Product.create(product).then(product => {
        console.log(`product name: [${product.name}] got inserted in DB`)
        res.status(201).send(product);

    }).catch(err => {
        console.log(`Issue in inserting product name: [${product.name}]. Error message : ${err.message}`)
        res.status(500).send({
            message:"Some Internal error while storing the product!"
        })
    })
}


//Get a list of all the products

exports.findAll = (req, res) => {
    //Supporting the query param

    let productName = req.query.name;
    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;
    let promise;
if(productName){
    promise = Product.findAll({
        where: {
            name: productName
        }
    });
} else if(minCost && maxCost){
    promise = Product.findAll({
        where: {
            cost: {
                [Op.gte]: minCost,
                [Op.lte]: maxCost
            }
        }
    });
} else if (minCost){
    promise = Product.findAll({
        where : {
            cost : {
                [Op.gte]: minCost
            }
        }
    });
} else if (maxCost){
    promise = Product.findAll({
        where : { 
            cost: {
                [Op.lte]: maxCost
            }
    
        }
    });

} else { promise = Product.findAll();
          }

          promise.then(products => {
            res.status(200).send(products);
          }).catch(err => {
            res.status(500).send({
                message: "Some internal error while fetching all the products"
            })
          })

}


//get a product based on the product id

exports.findOne = ( req,res) => {
    const productId = req.params.id;

    Product.findByPk(productId).then(product => {
        res.status(500).send({
            message: "Some Internal error while fetching the product based on the id"
        })
    })
}


//update an existing product

exports.update = (req,res) => { 
    //creation of the Product object to be stored in the DB

    const product = {
        name: req.body.name,
        description: req.body.categoryId
    };

    const productId = req.params.id;

    Product.update(product,{
        returning: true,
        where: { id:productId}

    }).then(updatedProduct => {
        Product.findByPk(productId).then(product => {
            res.status(200).send(product);
        }).catch(err => {
            res.status(500).send({
                message:"Some Internal error while fetching the product based on the id"

            })
    })
}).catch(err => {
    res.status(500).send({
        message:"Some Internal error while fetching the product based on the id"
    })
})

}


//Deleting an existing product based on the product name

exports.delete = (req,res) => {
    const productId = req.params.id;
    Product.destroy({
        where: {
            id: productId
        }
    }).then(result => {
        res.status(200).send({
            message:"Sucessfully deleted the product"
        });
    }).catch(err => {
        res.status(500).send({
            message: " Some Internal error while deleting the product based on the id"

        })
    })
}

//get the list of all the products under a category

exports.getProductsUnderCategory =  (req,res) => {
    const categoryId = parseInt(req.params.categoryId);

    Product.findAll({
        where: {
            categoryId: categoryId
        }
    }).then(products => {
        res.status(200).send(products);

    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching products based on the category id"
        })
    })
}