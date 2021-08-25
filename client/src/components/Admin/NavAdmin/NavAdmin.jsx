import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllOrder } from "../../../redux/actions/order/index";
import { getAllOffice } from "../../../redux/actions/office";
import { getAllProduct } from "../../../redux/actions/product";
import * as ROUTES from "../../../routes";
import NotFound from "../../../views/NotFound/NotFound";

function NavAdmin() {
  const dispatch = useDispatch();

  const admin = localStorage.getItem("admin")


  return admin!=='null'?(
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-5">
      <div class="container-fluid mt-5">
        <span class="navbar-text">Tareas</span>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav  pt-4,5 mb-lg-0">
            <h3 className="mx-3">/</h3>
            <li class="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to="/admin/stock"
                onClick={(e) => {
                  dispatch(getAllOffice);
                  dispatch(getAllProduct);
                }}
              >
                stocks
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to="/admin/orders"
                onClick={(e) => dispatch(getAllOrder())}
              >
                Ordenes
              </NavLink>
            </li>
        
            <li className="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to={ROUTES.FORM}
              >
                {" "}
                Agregar Categoria{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to={ROUTES.PRODUCT_CREATION}
              >
                {" "}
                Agregar Producto{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to={ROUTES.MANAGE_USERS}
              >
                {" "}
                Administrar Usuarios{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="text-dark"
                className="dropdown-item"
                to="/admin/offices"
              >
                {" "}
                Officina{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ): <NotFound/>
}

export default NavAdmin;
