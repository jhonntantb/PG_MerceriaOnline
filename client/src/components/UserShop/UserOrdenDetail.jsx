import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOrder } from "../../redux/actions/order";
import { updateOrderStatus } from "../../redux/actions/order/index";
import CreateReview from "../Review/CreateReview";
import {sendOrderStatusEmail} from "../../redux/actions/mail/index";
import { NavLink } from "react-router-dom";

function UserOrdenDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [showReview, setShowReview] = useState(false);
  const order = useSelector((state) => state.orderReducer.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, []);



  const handleUserShopStatus = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus(id, "cancelled"));
    setTimeout(() => {
      dispatch(sendOrderStatusEmail(order.userId, order.id))
    }, 1500)
  };

  const sendReview = (e) => {
    e.preventDefault();
    setProductId(e.target.id);
    setProductName(e.target.value);
    setShowReview(true);
  };

  const viewShopping = (e) => {
    e.preventDefault();
    push("/user/compras");
  };

  return (
    <div className="container">
      <h3 className="text-center mt-4">Detalle de la Orden</h3>
      <div className="row mt-4">
        <div className="col-md-4 border rounded">
          <div className="mt-3">
            <h4 className="text-center text-dark">Información de la Orden</h4>
          </div>
          <hr />
          <p className="px-2 text-dark">Orden Numero: {order.id}</p>
          <p className="px-2 text-dark">Estado: {order.status}</p>
          <p className="px-2 text-dark">Fecha:</p>
          <p className="px-2 text-dark">{order.delivery_date}</p>
        </div>

        <div className="col-md-4 border rounded">
          <div className="mt-3">
            <h4 className="text-center text-dark">información de envio</h4>{" "}
          </div>

          <hr />
          <p className="px-2 text-dark">Provincia: {order.province}</p>
          <p className="px-2 text-dark">Region: {order.location}</p>
          <p className="px-2 text-dark">Direccion: {order.home_address}</p>
        </div>
        <br />
        <div className="col-md-4 border rounded">
          <div className="mt-3">
            <h4 className="text-center text-dark">Productos comprados</h4>
          </div>
          <hr />
          {order.products && order.products.length > 0
            ? order.products.map((e) => (
                <div className="">
                 <NavLink  style={{color: "red" , fontSize: "18px"}} to={`/product/${e.id}`}> <p style={{color:"blue" , fontSize: "18px"}} className="px-2">Nombre: {e.title}</p> </NavLink>
                  <p className="px-2 text-dark">
                    Cantidad: {e.Order_Product.quantity}
                  </p>
                  <p className="px-2 text-dark">Precio/Unitario :{e.price}</p>
                  <hr />
                  {order.status === "delivered" ? (
                    <button
                      className="boton-drop-review"
                      id={e.id}
                      value={e.title}
                      onClick={(e) => sendReview(e)}
                    >
                      Dejanos tu comentario
                    </button>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
      {showReview && (
        <div>
          <h4>Producto:{productName}</h4>
          <CreateReview match={productId} />
        </div>
      )}
      <hr />
      <div className="row justify-content-center">
        {order &&
          (order.status === "approved") ? (
          <button id="buttondown" hidden={order.status !== "approved"} onClick={(e) => handleUserShopStatus(e)}>
            Cancelar mi Compra
          </button>
        ) : null}
        <br />
        <br />
        <button
          style={{ marginLeft: "5px" }}
          id="buttondown"
          onClick={(e) => viewShopping(e)}
        >
          Volver a Compras
        </button>
      </div>
    </div>
  );
}

export default UserOrdenDetail;
