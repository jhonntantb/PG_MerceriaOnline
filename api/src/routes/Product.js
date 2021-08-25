const { Product, Category, Productimage, Stock, Review } = require('../db');

const router = require('express').Router();
const { Op } = require("sequelize");


//////////  GET PRODUCT  /////////////
router.get("/", async function (req, res, next) {
  const { name, order } = req.query;
  var orden;
  if(order === 'alfa') {orden = 'title'} else {orden = 'catalog_id'};
console.log('orden: ', orden)
  if (!name) {
    try {
      const product = await Product.findAll({ order: [[orden, 'ASC']], include: [{ model: Category, attributes: ['id', 'name'] }, { model: Productimage, attributes: ['id', 'image_url'] }, { model: Review, attributes: ['id', 'date', 'score', 'description'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'] }] })
      res.status(200).json(product)
    }
    catch (error) { next(error) };
  }
  else 
  { var searchCatalog = parseInt(name);
    console.log('searchCatalog: ',searchCatalog)
    if(!isNaN(searchCatalog)) {
     try {
      const product = await Product.findAll({ where: { catalog_id: searchCatalog }, include: [{ model: Category, attributes: ['id', 'name'] }, { model: Productimage, attributes: ['id', 'image_url'] }, { model: Review, attributes: ['id', 'date', 'score', 'description'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'] }] })
      res.status(200).json(product)
    }
    catch (error) { next(error) };
    }
    else {
      try {
        const product = await Product.findAll({ where: { title: { [Op.iLike]: "%" + name + "%" } }, include: [{ model: Category, attributes: ['id', 'name'] }, { model: Productimage, attributes: ['id', 'image_url'] }, { model: Review, attributes: ['id', 'date', 'score', 'description'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'] }] })
        res.status(200).json(product)
      }
      catch (error) { next(error) };
    }
}
})

router.get("/:idProducto", async function (req, res, next) {
  let product_id = req.params.idProducto;
  // Si no viene nada en esta ruta (nulo) lo pone en cero, si no se rompe.
  if(product_id === "null") product_id = 0;
  
  // Si el largo de product_id es mayor a 10 lo considera un UUID y busca por pk
  // Si es menor lo considera un catalog id y busca por catalog id 
  if(product_id.length > 10){
   try {
     const product = await Product.findByPk(product_id, { include: [{ model: Category, attributes: ['id', 'name'] }, { model: Productimage, attributes: ['id', 'image_url'] }, { model: Review, attributes: ['id', 'date', 'score', 'description'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'] }] })
     if (product) { return res.status(200).json(product) }
     else { res.status(400) }
   }
  catch (error) { next(error) };
  }
  else
  {
    try {
      const product = await Product.findAll({where: { catalog_id: product_id  }, include: [{ model: Category, attributes: ['id', 'name'] }, { model: Productimage, attributes: ['id', 'image_url'] }, { model: Review, attributes: ['id', 'date', 'score', 'description'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'] }] })
      if (product) { return res.status(200).json(product) }
      else { res.status(400) }
    }
   catch (error) { next(error) };
  }

})

///////////    POST PRODUCT    ///////////
router.post("/", async function (req, res, next) {
  
  try {
    console.log(req.body)
    const [product, created] = await Product.findOrCreate({
      where: { catalog_id: req.body.catalog_id },
      defaults: {
        title: req.body.title,
        catalog_id: req.body.catalog_id,
        resume: req.body.resume,
        detail: req.body.detail,
        price: req.body.price
      }
    });

    if (!created) {
      res.status(400).json("Ya existe producto con mismo nro catalogo")
    }
    else {
      req.body.category.map(async (c) => {
        await product.setCategories(c);
      })
      await Stock.create({
        productId: product.id,
        officeId: req.body.office,
        quantity: req.body.quantity,
      })

      if (req.body.image.length > 0) {

        try {
          for (let i = 0; i < req.body.image.length; i++) {
            await Productimage.create({
              productId: product.id,
              image_url: req.body.image[i]
            })
          }

        } catch (err) { next(err) }

      }

      res.status(200).json(product)
    }

  }
  catch (error) { next(error) };
})

///////////    UPDATE PRODUCT    ///////////
router.put("/", async function (req, res, next) {
  try {
   
    const product = await Product.update(
      {
       title: req.body.title,
       catalog_id: req.body.catalog_id,
       resume: req.body.resume,
       detail: req.body.detail,
       price: req.body.price 
      },
      {where: {id: req.body.id}
    }
     )

   //  if (product !== [ 1 ]) {
   //   return res.status(400).json("No existe producto")
   // }
    const productupdated = await Product.findByPk(req.body.id)
    req.body.category.map(async (c) => {
        await productupdated.setCategories(c);
      })
      await Stock.create({
        productId: productupdated.dataValues.id,
        officeId: req.body.office,
        quantity: req.body.quantity,
      })

      if (req.body.image.length > 0) {

        try {
          for (let i = 0; i < req.body.image.length; i++) {
            await Productimage.create({
              productId: productupdated.dataValues.id,
              image_url: req.body.image[i]
            })
          }

        } catch (err) { next(err) }

      }

      res.status(200).json(product)
    

  }
  catch (error) { next(error) };
})


///////////    DELETE PRODUCT    ///////////
// En general solo para usar via postman para borrar por mantenimiento
//
// By id
router.delete("/:id", async function (req, res, next) {
  //console.log("REQ PRODUCT: ",req.params)
  await Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json("borrado exitosamente")
  }).catch((err) => next(err))
})

// By query id or catalog_id
router.delete("/", async function (req, res, next) {
  if (req.query.id) {
    await Product.destroy({
      where: { id: req.query.id }
    })
      .then(() => { res.status(200).json("borrado exitosamente") })
      .catch((err) => next(err))
  }
  else {
    if (req.query.catalog_id) {
      await Product.destroy({
        where: { catalog_id: req.query.catalog_id }
      })
        .then(() => { res.status(200).json("borrado exitosamente") })
        .catch((err) => next(err))
    }
    else {
      res.status(300).json("No vino ni id ni catalog_id para borrar")
    }
  }
})


module.exports = router;