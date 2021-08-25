import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getAllOrder, getOrder } from "../../../redux/actions/order";
import "./PaginationTable.css";
import "./Order.css";

function Order() {
  var admin = localStorage.getItem("admin");
  const dispatch = useDispatch();
  const [orderView, setOrderView] = useState([]);
  const [status, setStatus] = useState("");

  const orders = useSelector((state) => state.orderReducer.orders);

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  useEffect(() => {
    setOrderView(orders);
  }, [orders]);
  
  const handleStatus = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1)
  };
  useEffect(() => {
    status.length>0&&setOrderView(orders.filter((e) => e.status === status));
  }, [status]);

 //-------------------------Paginado de Tablas------------------//
 const [currentPage, setCurrentPage] = useState(1);
 const [rows, setRows] = useState(10); //modificamos esto si queremos mostrar mas filas
 const [pageNumberLimit, setPageNumberLimit] = useState(5);
 const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
 const [minPageNumberLmit, setMinPageNumberLmit] = useState(0);
 const handleClick = (event) => {
   setCurrentPage(Number(event.target.id));
 };
 const handleNextbtn = () => {
   setCurrentPage(currentPage + 1);
   if (currentPage + 1 > maxPageNumberLimit) {
     setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
     setMinPageNumberLmit(minPageNumberLmit + pageNumberLimit);
   }
 };
 const handlePrevbtn = () => {
   setCurrentPage(currentPage - 1);
   if ((currentPage - 1) % pageNumberLimit === 0) {
     setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
     setMinPageNumberLmit(minPageNumberLmit - pageNumberLimit);
   }
 };

 const pages = [];
 for (let i = 1; i <= Math.ceil(orderView.length / rows); i++) {
   pages.push(i);
 }
 const indexOfLastItem = currentPage * rows;
 const indexOfFirstItem = indexOfLastItem - rows;
 const currentItems = orderView.slice(indexOfFirstItem, indexOfLastItem);
 const renderPageNumbers = pages.map((number) => {
   if (number < maxPageNumberLimit + 1 && number > minPageNumberLmit) {
     return (
       <li
         key={number}
         id={number}
         onClick={e=>handleClick(e)}
         className={currentPage === number ? "activo" : null}
       >
         {number}
       </li>
     );
   } else {
     return null;
   }
 });
 //-------------------------------------------------------------------------

  return admin !== "null" ? (
    <div>
      <div>
        <br />
        {/* <nav className="navbar justify-content-start mx-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href={ROUTES.ADMIN}>Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Order</li>
                </ol>
            </nav> */}
        <br />
        <div className="d-table">
          <div id="tableleft" className="d-table-cell">
            <h3 className="mx-4"> Estados</h3>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"shipped"}
              >
                Enviada
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"cart"}
              >
                Carrito
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"checkout"}
              >
                Checkout
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"cancelled"}
              >
                Canceladas
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"delivered"}
              >
                Entregadas
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"approved"}
              >
                Aprobadas
              </button>
            </div>
            <div id="buttoncategory" className="mx-2 my-2">
              <button
                id="buttonorder"
                onClick={(e) => handleStatus(e)}
                value={"rejected"}
              >
                Rechazadas
              </button>
            </div>
          </div>
          <div>
            {orderView && orderView.length > 0 ? (
              <table id="tableright" className="d-table-cell">
                <h3 className="text-center">Ordenes de los usuarios</h3>
                <thead className="table-responsive">
                  <tr>
                    <th>Orden ID</th>
                    <th>Usuario nombre</th>
                    <th>Usuario Email</th>
                    <th>Precio Total</th>
                    <th>Estado</th>
                    <th>Fecha de Pedido</th>
                    <th># Productos</th>
                    <th>detalle</th>
                  </tr>
                </thead>
                {currentItems.length>0&&currentItems.map((e) => (
                  <tbody>
                    <tr>
                      <td>{e.id}</td>
                      <td>{e.user.user_name}</td>
                      <td>{e.user.email}</td>
                      <td>{e.total_price}</td>
                      <td>{e.status}</td>
                      <td>{e.date}</td>
                      <td>{e.products.length}</td>
                      <NavLink to={`/admin/orders/${e.id}`}>
                        <td className="text-dark">detalles</td>
                      </NavLink>
                    </tr>
                  </tbody>
                ))}
              </table>
            ) : null}
          </div>
        </div>
        <br />

        {
          <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                prev
              </button>
            </li>
            {renderPageNumbers}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                next
              </button>
            </li>
          </ul>
        }
      </div>
    </div>
  ) : null;
}

export default Order;
