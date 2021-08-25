import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../redux/actions/product/index.js";
import { getSomeProduct } from "../../redux/actions/product/index.js";
import "./SearchAC.css";

const Auto = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [filtrada, setFiltrada] = useState([]);
    const wrapperRef = useRef(null);

    const dispatch = useDispatch();
    const { push } = useHistory();
    const products = useSelector((state) => state.productReducer.products);

    useEffect(() => {
        const list = [];
        dispatch(getAllProduct('', 'alfa')).then(() => {
            products.map(e => list.push({ title: e.title + " (" + e.catalog_id + ")", id: e.id }))
        })
        setOptions(list);
        setFiltrada(list);
    }, []);


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
            setSearch("");

        }
    }


    const handleChange = (event) => {
        setSearch(event.target.value);
        setDisplay(true);
        var tempFiltrada = options.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));
        setFiltrada(tempFiltrada)

    };

    const handleClickSearch = () => {
        dispatch(getSomeProduct(filtrada));
        push('/productlist')
    }

    const setTexto = (texto, id) => {
        setSearch(texto);
        setDisplay(false);
        push(`/product/${id}`);
    }

    const handleSetDisplay = () => {
        setDisplay(!display);

    }

    return (
        <div ref={wrapperRef} className="flex-container flex-column pos-rel">
            <input
                id="auto"
                onClick={() => setDisplay(!display)}
                placeholder="Escriba para buscar"
                autoComplete="off"
                value={search}
                onChange={(e) => handleChange(e)}
            />
            <button onClick={() => handleClickSearch()}>Buscar  </button>
            {display && (
                <div className="autoContainer">
                    {filtrada.map((v, i) => {
                        return (
                            <div
                                onClick={() => setTexto(v.title, v.id)}
                                className="option"
                                key={i}
                                tabIndex="0"
                            >
                                <span>{v.title}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

}

function SearchAutoComplete() {
    return (
        <div className="SearchAutoComplete">
            <br></br>
            <br></br>
            <br></br>
            <h1>Autocomplete de Productos</h1>
            <div className="auto-container">
                <Auto />
            </div>
        </div>
    );
};

export default SearchAutoComplete;

