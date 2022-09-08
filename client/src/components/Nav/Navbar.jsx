import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css";
import SignOutButton from "../Authentication/SignOut/index";
import * as ROUTES from "../../routes";
import { getAllProduct } from "../../redux/actions/product";
import { ShowCartCant } from "./ShowCartCant";
import { getAllOrder } from "../../redux/actions/order";

import { getUser } from "./../../redux/actions/user/index";

const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = localStorage.getItem("pg_merceria");
  const admin = localStorage.getItem("admin");
  const storeUser = useSelector((state) => state.userReducer.user);
  var localUserId = localStorage.getItem("pg_merceria");

  useEffect(() => {
    if (localUserId !== "guest") {
      dispatch(getUser(localUserId));
      // dispatch(getCart(localUserId))
    }
  }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={authUser === "guest" ? "/" : "/"}>
          <img
            width="150rem"
            style={{
              borderRadius: "50px",
              backgroundPosition: "center",
            }}
            src="https://scontent.flim1-4.fna.fbcdn.net/v/t1.18169-1/10923273_406735952831411_3065322763382978546_n.jpg?stp=dst-jpg_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=1eb0c7&_nc_eui2=AeGrxCVBF-VTWPkqhNBfjFLe7LRiD_fiG1nstGIP9-IbWa4_0SlMgwrRv7S6DBQ5NBYYoXOIZ9sS3NTf1K9H3MN1&_nc_ohc=PZea2RjR2IIAX8IbJIb&_nc_ht=scontent.flim1-4.fna&oh=00_AT9mHF2z5jJLogcmrJWGnnguDaad59d-wFWq7aiJg-CiDQ&oe=633DB8BE"
            alt="logotipo"
            width="100px"
            height="100px"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div class="search">
          <SearchBar />
        </div>

        <div
          className=" navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav ml-1">
            {authUser !== "guest" ? (
              <li className="nav-item active mx-4">
                <NavLink
                  activeClassName="text-white"
                  className="nav-link"
                  to="/wishlist"
                >
                  Favoritos
                </NavLink>
              </li>
            ) : null}
            <li className="nav-item active mx-4">
              <NavLink
                activeClassName="text-white"
                className="nav-link"
                to="/productlist"
                onClick={() => dispatch(getAllProduct())}
              >
                Productos
              </NavLink>
            </li>
            <ul className="navbar-nav mx-4">
              {authUser && (admin != "null" && admin != undefined) ? (
                <li className="nav-item">
                  {" "}
                  <NavLink
                    activeClassName="text-white"
                    className="nav-link"
                    to={"/admin"}
                  >
                    Admin
                  </NavLink>
                </li>
              ) : null}
            </ul>
            {authUser === "guest" ? (
              <li className="nav-item mx-4">
                <NavLink
                  activeClassName="text-white"
                  className="nav-link"
                  to={ROUTES.SIGN_IN}
                >
                  Ingresar
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown mx-4">
                <NavLink
                  class="nav-link active dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                  to="#"
                >
                  <i class=" mx-2 fa fa-user-circle"></i>
                  {storeUser.user_name}
                </NavLink>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to={ROUTES.USER_DATA}>
                      Mi Cuenta
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      class="dropdown-item"
                      to="/user/compras"
                      onClick={(e) =>
                        dispatch(
                          getAllOrder(localStorage.getItem("pg_merceria"))
                        )
                      }
                    >
                      Compras
                    </NavLink>{" "}
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      <SignOutButton />
                    </a>
                  </li>
                </ul>
              </li>
            )}
           <ul className="navbar-nav mx-3">
              <li className="nav-item">
                <NavLink hidden={storeUser.id ? false : true} to={ROUTES.CART}>
                <button
                    id="buttoncart"
                    className="btn btn-block btn-black rm-border"
                  >
                    <i
                      style={{ fontSize: "25px" }}
                      id="iconcart"
                      class="fa fa-shopping-cart black"
                    >
                      {" "}
                    </i>
                    <span style={{ fontSize: "18px" }} class="badge bg ">
                      {ShowCartCant()}{" "}
                    </span>
                  </button>
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
