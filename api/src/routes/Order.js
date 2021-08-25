const router = require('express').Router();
const axios = require('axios');
const { Order, User, Product, Order_Product, Office, Stock, Productimage } = require('../db')



///////////////   GET GENERAL usando query con userId o productId o status o combinados ////////////////////////////////
// Si no viene ingun parametro en el query lista todas las ordenes
router.get("/",async (req, res,next) =>{
    const {userId, productId, status} = req.query ;
    var filtro = {};
    var filtroProd = {};
    userId ? filtro.userId = userId : null;
    productId ? filtroProd.id = productId: null;
    status ? filtro.status = status : null;
    try {
        const allOrder=await Order.findAll({where:filtro, include:[{model: User,  attributes: ['user_name', 'id', 'email'] }, {model: Order_Product },{model:Product, include: [{ model: Productimage, attributes: ['id', 'image_url'] }, { model: Stock, attributes: ['id', 'quantity', 'officeId'], include: {model: Office, attributes:['codesuc','name']} }] } ]  })  
        res.send(allOrder)
     } catch (error) {
        next(error)

} 
})

//////////////////// GET ESPECIFICO POR ID /////////////////////////////////////
router.get("/:id",async (req, res, next) =>{
    try {
       const order=await Order.findByPk(req.params.id, {include: [{model: Order_Product},{model:User},{model:Product, include: [{ model: Productimage, attributes: ['id', 'image_url'] },{ model: Stock, attributes: ['id', 'quantity', 'officeId'], include: {model: Office, attributes:['codesuc','name']} }]}]})
       res.send(order)
    } catch (error) {
        next(error)
    }
})


// relacion con oficina (pendiente)
//la orden se relaciona con una oficina---->con un calendario

//////////// P O S T ////////////////////////////////////////******/
// *************** FORMATO EJEMPLO DEL POST **********************
// {"status": "En preparacion",
// "total_price": 10000,
// "home_address": "Artigas 2028",
// "location": "Villa Tachitos",
// "province": "Buenos Aires",
// "country": "Argentina",
// "delivery_date": "2021-08-20",
// "userId": "046fb71e-14f1-445c-a66a-2e69556ebdad",
// "products": [
//     {
//         "productId":"209c1a8c-ae99-4e88-bb49-c522e14fc3e7",
//         "quantity": 20,
//         "unitprice": 200.50
//     },
//     {
//        "productId": "49dc4925-dbff-41fe-8d4a-6f2a3808904b ",
//        "quantity": 10,
//        "unitprice": 500
//     }
// ]
// }

router.post("/",async (req, res, next) => {
    try {
        const order=await Order.create({
            status: req.body.status,
            total_price: req.body.total_price,
            home_address: req.body.home_address,
            location: req.body.location,
            province: req.body.province,
            country: req.body.country,
            delivery_date: req.body.delivery_date,
            userId: req.body.userId,
            postal_code: req.body.postal_code,
            phone_number: req.body.phone_number
        })
        var total = 0;
        var orderPromises = []
        req.body.products.forEach(async (e) => {
             orderPromises.push(order.addProducts(e.productId, {through: {quantity: e.quantity, unitprice: e.unitprice}}))
            total = total + (e.quantity * e.unitprice)
            
        })
        // Actualizo el total_price en la orden
        await Promise.all(orderPromises)
        const orderupdate = await Order.findByPk(order.id)
        orderupdate.total_price = total;
        await orderupdate.save()
        // const saved_order = await orderupdate.save()
        // res.send(saved_order)
        const orderFinal = await Order.findByPk(order.id, {include: [{model: Order_Product}]})
        res.send(orderFinal)
    //la relacion del calendario pendiente 
    } catch (error) {next(error)    }
})



////////  UPDATE GENERAL: BUSCA LA ORDEN, LA MODIFICA  Y VUELVE A GRABARLA

router.put("/:id",async (req,res,next) => {
    console.log('update general')
    try {
      // Busco orden a actualizar  
      const order=await Order.findByPk(req.params.id, {include:[{model: Order_Product}] })
      
      // Elimino registros actuales de productos dela orden
      const resultado  = await Order_Product.destroy({where:{orderId:req.params.id}})
      // Agrego registros actualizados de productos d ela orden y computo el costo total
      var total = 0;
      var promisesAux = []
      if(req.body.products) {

          req.body.products.forEach(async (e) => {
              promisesAux.push( order.addProducts(e.productId, {through: {quantity: e.quantity, unitprice: e.unitprice}}))
              total = total + (e.quantity * e.unitprice);
          })
      }
      await Promise.all(promisesAux)

      if(req.body.status) order.status= req.body.status;
      if(req.body.products) order.total_price= total;
      if(req.body.home_address) order.home_address= req.body.home_address;
      if(req.body.location) order.location= req.body.location;
      if(req.body.province) order.province= req.body.province;
      if(req.body.country) order.country= req.body.country;
      if(req.body.delivery_date) order.delivery_date= req.body.delivery_date;
      if(req.body.phone_number) order.phone_number= req.body.phone_number;
      if(req.body.postal_code) order.postal_code=req.body.postal_code;
      
      
      const saved_order = await order.save() 

      res.send(saved_order);
    } 
    catch (error) { next(error) }
})

//////////////////////////// UPDATE STATUS ///////////////////////
router.put('/:id/:Status', async (req, res) => {
    console.log('update status')
    const { id, Status } = req.params;
    const order = await Order.findByPk(id);
    // Busco id de sucursal central codesuc = 0
    const sucursal = await Office.findOne({where: {codesuc: 0}})
    var sucid = sucursal.dataValues.id
    // Valida que sea un cambio de status valido:
    const statusAnt = order.status
    const statusNew = Status
    const statusDupla = statusAnt + "/" + statusNew;
    const validDuplas = [
    "cart/checkout", "checkout/cart", "checkout/approved", "checkout/cancelled","approved/shipped","checkout/rejected","rejected/cancelled","shipped/delivered","approved/cancelled",
    "cart/cancelled", "shipped/cancelled"
    ];

    if(!validDuplas.includes(statusDupla)) return res.status(300).send('Cambio de status invalido');

    var oper = 'na'
    statusAnt === "checkout" && statusNew === "approved" ? oper = 'resta' : null ;
    statusAnt === "approved" && statusNew === "cancelled" ? oper = 'suma' : null ;

    // Si corresponde actualizar el stock:
    if (oper != 'na') {
      // Tomo los productos de la orden
      const products = await order.getOrder_Products({where:{orderId: id}})
      // Actualizo el stock para cada producto d ela orden restando la cantidad
      products.map( async e => {
        const [stock, created] = await Stock.findOrCreate({ defaults:{quantity: 0},where:{productId: e.dataValues.productId, officeId: sucid}})
        oper === 'resta' ?  stock.quantity = stock.quantity - e.dataValues.quantity : stock.quantity = stock.quantity + e.dataValues.quantity ;
        
        try {
            
            if(stock.quantity <= 5) {
               let msgSend = axios.get(`http://localhost:3001/mail/stock/${e.dataValues.productId}`)
               if(msgSend.data.length>0) {
                   console.log("se envió mensaje LowSTOCK")
               }
            }
        }catch (err) {console.log("error al enviar el mensaje de low stock " , err)}

        await stock.save()
      })
    } 

    order.status = Status;
    order.save()
    .then(response => res.send(response))
    .catch(err => console.log("ERROR WHILE CHANGING SSTATUS: ", err));
})


//////////////////////////// DELETE ////////////////////////
//solo puede deletear el admin
router.delete("/:id",async (req, res) => {
    try {
        await Order.destroy({where:{id: req.params.id}})
        res.sendStatus(200)
    } 
    catch (error) {
        next(error)
    }
})

module.exports = router;