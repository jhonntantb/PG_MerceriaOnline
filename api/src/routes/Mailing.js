const sgMail = require('@sendgrid/mail');
const router = require('express').Router();
const {User, Order, Product} = require("../db");
const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

router.post('/user' , (req, res) =>{

    const {email, id}=req.body;

        const html = `<div>
          <h1>Estimado Usuario:</h1>
          <p>haga click en el siguiente enlace para continuar con la creacion de su cuenta</p>
          <br/>
          <a href=${`http://localhost:3000/AccountConfirmation?email=${email}&id=${id}`}> >>ENLACE<< </a>
          <p> ¡¡¡Muchas Gracias!!! </p>
        </div>`
    
        const msg = {
          to: email, // Change to your recipient
          from: 'jerexand@gmail.com', // Change to your verified sender
          subject: 'Comprobacion de Email',
          text: 'Comprobacion de Email para la creacion de su cuenta',
          html
        };

        
    
    sgMail
    .send(msg)
    .then(() => {
      
      console.log("Comprobacion de Email enviada")
      return  res.send(`Mensaje enviado a  ${email}`)
    })
    .catch((error) => {
        
        console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
        return res.status(407).send("ERROR AL ENVIAR EL MENSAJE: ")
    })

   
} )

router.post("/order" , async (req, res , next) => {
    const {userId, orderId} = req.body

    let html = ''
    let msg = {}

    try {
      var userOk = await User.findByPk(userId)
      var orderOk = await Order.findByPk(orderId)

      console.log("estado actual de la orden: - " , orderOk.status)
    } catch (err) {
      console.log("ocurrio un error buscando usuario y orden")
    }

   




      if(orderOk.status === "approved") {

        html = `<div>
        <h1>Estimado Usuario:</h1>
        <p>Su pedido ha sido registrado con éxito.</p>
        <br/>
        <p>Puede monitorear el estado de su pedido desde Mi Cuenta - Compras , dentro de nuestra web</p>
        <br/>
        <a href=http://localhost:3000/> >>>>ENLACE<<<< </a>
        <br/>
        <p> ¡¡¡Muchas Gracias!!! </p>
        <br/>
        <p>Araceli Merceria</p>
      </div>`

        msg = {
        to: userOk.email, // Change to your recipient
        from: 'jerexand@gmail.com', // Change to your verified sender
        subject: 'Su pedido ha sido registrado',
        text: 'Confirmacion de pedido registrado',
        html
      };

        sgMail
        .send(msg)
        .then(() => {
          
          console.log("mensaje de orden aprobada enviado")
          return  res.send(`Mensaje enviado a  ${userOk.email}`)
        })
        .catch((error) => {
            
            console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
            return res.status(407).send("ERROR AL ENVIAR EL MENSAJE DE LA ORDEN: - approved")
        })
    }

    if(orderOk.status === "shipped") {

      html = `<div>
      <h1>Estimado Usuario:</h1>
      <p>Su pedido ha sido enviado a ${orderOk.home_address} , ${orderOk.location}</p>
      <br/>
      <p>Puede monitorear el estado de su pedido desde Mi Cuenta - Compras , dentro de nuestra web</p>
      <br/>
      <a href=http://localhost:3000/> >>>>ENLACE<<<< </a>
      <br/>
      <p> ¡¡¡Muchas Gracias!!! </p>
      <br/>
      <p>Araceli Merceria</p>
    </div>`

      msg = {
      to: userOk.email, // Change to your recipient
      from: 'jerexand@gmail.com', // Change to your verified sender
      subject: 'Su pedido ha sido enviado',
      text: 'Confirmacion de pedido enviado',
      html
    };

      sgMail
      .send(msg)
      .then(() => {
        
        console.log("mensaje de orden despachada enviado")
        return  res.send(`Mensaje enviado a  ${userOk.email}`)
      })
      .catch((error) => {
          
          console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
          return res.status(407).send("ERROR AL ENVIAR EL MENSAJE DE LA ORDEN: -shipped ")
      })
  }

  if(orderOk.status === "delivered") {

    html = `<div>
    <h1>Estimado Usuario:</h1>
    <p>Su pedido ha sido entregado a ${orderOk.home_address} , ${orderOk.location}</p>
    <br/>
    <p>agradeceremos que nos deje sus comentarios respecto a la experiencia de compra en nuestra web</p>
    <br/>
    <a href=http://localhost:3000/> >>>>ENLACE<<<< </a>
    <br/>
    <p> ¡¡¡Muchas Gracias!!! </p>
    <br/>
    <p>Araceli Merceria</p>
  </div>`

    msg = {
    to: userOk.email, // Change to your recipient
    from: 'jerexand@gmail.com', // Change to your verified sender
    subject: 'Su pedido ha sido entregado',
    text: 'Confirmacion de pedido entregado',
    html
  };

    sgMail
    .send(msg)
    .then(() => {
      
      console.log("mensaje de orden entregada enviado")
      return  res.send(`Mensaje enviado a  ${userOk.email}`)
    })
    .catch((error) => {
        
        console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
        return res.status(407).send("ERROR AL ENVIAR EL MENSAJE DE LA ORDEN: -delivered ")
    })
}

if(orderOk.status === "cancelled") {

  html = `<div>
  <h1>Estimado Usuario:</h1>
  <p>Le informamos que su orden ha sido cancelada</p>
  <br/>
  <p>Le esperamos nuevamente en nuestra web!</p>
  <br/>
  <a href=http://localhost:3000/> >>>>ENLACE<<<< </a>
  <br/>
  <p> ¡¡¡Muchas Gracias!!! </p>
  <br/>
  <p>Araceli Merceria</p>
</div>`

  msg = {
  to: userOk.email, // Change to your recipient
  from: 'jerexand@gmail.com', // Change to your verified sender
  subject: 'Su pedido ha sido Cancelado',
  text: 'Confirmacion de pedido cancelado',
  html
};

    sgMail
    .send(msg)
    .then(() => {
      
      console.log("mensaje de orden cancelada enviado")
      return  res.send(`Mensaje enviado a  ${userOk.email}`)
    })
    .catch((error) => {
        
        console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
        return res.status(407).send("ERROR AL ENVIAR EL MENSAJE DE LA ORDEN: -cancelled ")
    })
}

})

router.get("/stock/:productId", async (req, res, next) => {
  const {productId} = req.params

  const product = await Product.findByPk(productId)

  console.log("esto es product dentro de mailing low stock: ", product)

  html = `<div >
  <h1>Estimado Aministrador:</h1>
  <p>Le informamos que el producto ${product.title} , con numero de catalogo ${product.catalog_id} se encuentra con stock minimo o sin stock</p>
  <br/>
  <br/>
  <p> ¡¡¡Muchas Gracias!!! </p>
  <br/>
  <p>Araceli Merceria</p>
</div>`

  msg = {
  to: 'jerexand@gmail.com', // Change to your recipient
  from: 'jerexand@gmail.com', // Change to your verified sender
  subject: 'Aviso de Stock Bajo',
  text: 'aviso de stock bajo',
  html
};

sgMail
    .send(msg)
    .then(() => {
      
      console.log("mensaje de stock Bajo enviado")
      return  res.send(`Mensaje enviado a jerexand@gmail.com `)
    })
    .catch((error) => {
        
        console.log("ERROR AL ENVIAR EL MENSAJE: " , error)
        return res.status(407).send("ERROR AL ENVIAR EL MENSAJE DE LOW STOCK ")
    })

})

module.exports = router;