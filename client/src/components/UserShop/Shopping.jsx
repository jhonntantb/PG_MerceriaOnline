import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrder } from "../../redux/actions/order";
import { getProduct } from "../../redux/actions/product";
import CardOrder from "./CardOrder";
import "./ButtonShopping.css";

function Shopping() {
  const dispatch = useDispatch();
  const userid = localStorage.getItem("pg_merceria");
  const [orderView, setOrderView] = useState([]); //lo que vamos a renderizar
  const [history, setHistory] = useState(true);

  //console.log("este es el usuaario",userid)
  useEffect(() => {
    // get orders de un usuario????
    dispatch(getAllOrder(userid));
  }, []);
  const orders = useSelector((state) => state.orderReducer.orders);
  useEffect(() => {
    orders.length &&
      setOrderView(orders.filter((e) => e.status !== "delivered"));
  }, []);
  console.log("este es el usuaario", userid);

  // useEffect(() => {
  //   orders.length &&
  //     setOrderView(orders.filter((e) => e.status !== "delivered"));
  // }, [orders]);
  console.log(orders.products);
  //primero se muestra los productos que no tienen status  delivered luego pasa a history
  //historial
  const showHistory = (event) => {
    event.preventDefault();
    setOrderView(orders.filter((e) => e.status === "delivered"));
    setHistory(false);
  };
  const ShowShoopInProcess = (event) => {
    event.preventDefault();
    setOrderView(orders.filter((e) => e.status !== "delivered"));
    setHistory(true);
  };
  return (
    <div style={{marginTop: "10%"}} className="container-fluid shop">
      <br />
      <br />
      <div>
        <button id="buttonshopping" onClick={(e) => showHistory(e)}>
          Historial de Compras
        </button>
        <button
          style={{ marginLeft: "10px" }}
          id="buttonshopping"
          onClick={(e) => ShowShoopInProcess(e)}
        >
          Seguimiento de Pedido
        </button>
      </div>
      <br />
      <br />

      {history === true ? (
        <h3 className="text-center">Seguimiento de Pedidos</h3>
      ) : (
        <h3 className="text-center">Historial de Compras</h3>
      )}

      {orderView && orderView.length > 0 ? (
        orderView.map((e) => (
          <CardOrder
            id={e.id}
            status={e.status}
            products={e.products}
            total_price={e.total_price}
            className="justify-content-center"
          />
        ))
      ) : (
        <p>Aún no tiene Pedidos</p>
      )}
    </div>
  );
}

export default Shopping;
