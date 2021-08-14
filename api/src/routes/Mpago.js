const router = require('express').Router(),
 mercadopago = require('mercadopago');
const {User} = require('../db'); 

const {MP_PUBLIC_KEY, MP_TOKEN}=process.env

    
    

mercadopago.configure({
    access_token: MP_TOKEN
});

router.post('/:userId', async (req, res) => {
    //del front debo recibir un objeto como body que tenga:
        // title:
        // price:
        // discount: (en formato integer que va a representar porcentaje)
        // quantity:
        console.log(req.body)
        try {

    const  products  = req.body;
    const {userId}=req.params;

    var user = await User.findByPk(userId);


    const itemsAcomprar = products.map(item => {
        return {
            title: item.title,
            unit_price: Number(item.price - (item.price * (item.discount / 100))),
            quantity: Number(item.quantity)
        };
    });





    const preference = {
            items: itemsAcomprar,
            payer: {
                name: user.first_name,
                surname: user.last_name,
                email: user.email,
                phone: {
                    area_code: '11',
                    number: 00000000
                }
            },    
            back_urls: {
                success: 'http://localhost:3000/after-checkout',
                failure: 'http://localhost:3000/after-checkout',
                pending: 'http://localhost:3000/after-checkout'
            },
            auto_return: 'approved',
            statement_descriptor: "PUEDO METER LA ORDEN AQUI?"
        };

    

        var mp_response=  await mercadopago.preferences.create(preference)
        console.log(mp_response)

        var id=mp_response.body.id 
        return res.send(mp_response.body)


    }catch(err){console.log(err)}
    
    
});

//comento esto porque vamos a trabajar con las ordenes y sus rutas
// router.put('/:userId', async (req, res) => {
//     const { userId } = req.params
//     const order = await Order.findOne({
//         where: {
//             userId: userId,
//             status: 'cart'
//         }
//     });

//     order.status = req.body.status;
//     order.save()
//     .then(response => res.send(order))
//     .catch(err => console.log(err));
// });

module.exports = router;