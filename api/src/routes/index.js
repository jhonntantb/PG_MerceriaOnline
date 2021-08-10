const { Router } = require('express');


const Product = require('./Product');
const Review = require('./Review');
const Category = require('./Category');
const Productimage = require('./Productimage');
const Office =require('./Office');
const Bundle=require("./Boundle")
const User=require("./User");
const Schedule = require("./Schudule");
const Stock =require("./Stock")
const router = Router();

router.use("/product", Product ) 
router.use("/review", Review ) 
router.use("/category", Category )
router.use("/productimage", Productimage )
router.use("/office", Office )
router.use("/bundle",Bundle)
router.use("/user",User)
router.use("/schedule",Schedule)
router.use("/stock",Stock)

module.exports = router;