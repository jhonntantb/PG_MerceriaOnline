const router = require('express').Router()
const mercadopago = require('mercadopago');
const { User } = require('../db'); 

const { MP_TOKEN } = process.env

mercadopago.configure({
    access_token: MP_TOKEN
});

router.post('/:userId', async (req, res) => {
    console.log(req.body)
    try {
    const  products  = req.body;
    const {userId} = req.params;

    var user = await User.findByPk(userId);

    const itemsAcomprar = products.map(item => {
        return {
            title: item.title,
            unit_price: parseInt(item.price - (item.price * (item.discount / 100))),
            quantity: parseInt(item.quantity)
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
                failure: 'http://localhost:3000/after-checkout-reject',
                pending: 'http://localhost:3000/after-checkout'
            },
            auto_return: 'approved',
            statement_descriptor: "PUEDO METER LA ORDEN AQUI?"
        };

        var mp_response=  await mercadopago.preferences.create(preference)

        return res.send(mp_response.body.id)
    }
    catch(err){ console.log(err) }
});

module.exports = router;