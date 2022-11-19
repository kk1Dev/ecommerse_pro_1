// this  file will contain the routes logic for the product resource
//and will export it

const productController = require(" ../controllers/product.controller")
const { authjwt, requestValidator } = require("../middlewares");
module.exports = function(app){
    //route for the post request to create the product
    app.post("/ecomm/api/v1/products",[requestValidator.validateProductRequest,authjwt.verifyToken,authjwt.isAdmin],productController.create);

    ///route for the GET request to fetch all the products
    app.get("/ecomm/api/v1/products",productController.findAll);

    //route for the GET request to fetch a product based on th id
    app.get("/ecomm/api/v1/products/:id", productController.findOne);

    //route for the PUT request to update a product based on the id
    app.put("/ecomm/api/v1/products/:id",[authjwt.verifyToken,authjwt.isAdmin], productController.update);

    //route for the Delete request to delete a product based on the id
    app.delete("/ecomm/api/v1/categories/:id",[authjwt.verifyToken,authjwt.isAdmin], productController.delete);
   
    //route for getting the list of products with cost greater than the
    app.get("/ecomm/api/v1/categories/:categoryId/products",[requestValidator.validateCategoryPassedInReqParam], productController.getProductsUnderCategory);

    //route for getting the list of products under a category
    app.get("/ecomm/api/v1/categories/: categoryId/products",[requestValidator.validateCategoryPassedInParam],getProductsUnderCategory);

}


