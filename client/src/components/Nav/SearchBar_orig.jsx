import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../redux/actions/product/index.js";
import { SetCategoriesFiltradas } from "../../redux/actions/category/index.js";
import "./SearchBar.css";

export default function SearchBar() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { push } = useHistory();
 

  const handleInputSearch = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleClickSearch = (e) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      dispatch(getAllProduct(name));
      setName("");
      dispatch(SetCategoriesFiltradas("Todas"))
      push("/productlist");
    }
    else if (name.trim().length == 0) {
      dispatch(getAllProduct());
      setName("");
      dispatch(SetCategoriesFiltradas("Todas"))
      push("/productlist");
    }
  };

  return (

    <div className="search">
      <input
        className="form-control"
        type="text"
        placeholder="Ingrese su busqueda..."
        onChange={(e) => handleInputSearch(e)}
      />

      <button className="btn btn-block btn-black rm-border" onClick={(e) => handleClickSearch(e)}>
        Buscar
      </button>
    </div>
  );
}
