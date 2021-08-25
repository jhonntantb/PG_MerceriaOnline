import React from "react";
import { NavLink } from "react-router-dom";
import "./CardOrder.css";

function CardOrder(props) {



  var color = "";
  if (props.status === "approved") color = "#A0D568";
  if (props.status === "rejected") color = "#ED5564";
  if (props.status === "shipped") color = "#FF7500";
  if (props.status === "delivered") color = "#4FC1E8";
  if (props.status === "cart") color = "#FFCE54";
  if (props.status === "checkout") color = "#5a3711";
  if (props.status === "cancelled") color = "##ED5564";

  return (

    <div className="cardUserOrder text-center">
      <div style={{ minHeight: "150px" }}>
        <p className="text-dark mt-2">
          Estado:{" "}
          <span style={{ color: color, fontSize: "20px", fontWeight: "bold" }}>
            {props.status}
          </span>
        </p>
        <h6 className="text-dark">Productos comprados</h6>
        <ul>
          {props.products.map((e) => (
            <li>{e.title}</li>
          ))}
        </ul>
        <h5>Precio Total: ${props.total_price}</h5>
      </div>
      <div >
        <div>
          <NavLink to={"/user/compras/" + props.id}>
            <button className="btn btn-block btn-black rm-border">
              Ver Compras
            </button>
          </NavLink>
        </div>
      </div>

    </div>

  );
}

export default CardOrder;
