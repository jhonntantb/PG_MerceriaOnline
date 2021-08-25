import { Form, Label, Input, FormText, FormGroup } from "reactstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
 import "./AddressForm.css"

export default function AddresForm({setAddress}){
    const user = useSelector(state => state.userReducer.user)
    const [provincias, setProvincias] = useState([])
    const [localidades, setLocalidades] = useState([])
    const [selectProv, setSelectProv] = useState(user.province)
    const [selectLoc, setSelectLoc] = useState(user.location)
    const [direccion, setDireccion] = useState(user.address)
    const [cod, setCod] = useState(user.postal_code)
    const [telephone, setTelephone] = useState(user.phone_number)
    const [pais, setPais] = useState(user.country)


    useEffect(() => {
        axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre&orden=nombre")
        .then(res => setProvincias(res.data.provincias))
    }, [])

    useEffect(() => {
        axios.get("https://apis.datos.gob.ar/georef/api/localidades?campos=nombre&orden=nombre&max=1000&provincia=" + selectProv)
        .then(res => setLocalidades(res.data.localidades))
    }, [selectProv])

    const handleChange = (e) => {
        if(e.target.name === "prov") setSelectProv(e.target.value)
        if(e.target.name === "city") setSelectLoc(e.target.value)
        if(e.target.name === "address") setDireccion(e.target.value)
        if(e.target.name === "pais") setPais(e.target.value)
        if(e.target.name === "cod") setCod(e.target.value.replace(/\D/g, ""))
        if(e.target.name === "telephone") setTelephone(e.target.value.replace(/\D/g, ""))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(selectProv === ""){alert("No se a seleccionado una provincia"); return}
        if(selectLoc === ""){alert("No se a seleccionado una localidad"); return}
        if(direccion === ""){alert("Calle invalida"); return}
        if(pais === ""){alert("No se ingresó pais"); return}
        if(cod === ""){alert("Codigo postal requerido"); return}
        if(telephone === ""){alert("Agregue un telefono"); return}
        const address = {
            province: selectProv,
            location: selectLoc,
            home_address: direccion,
            postal_code: cod,
            country: pais,
            phone_number: telephone
        }
        setAddress(address)
    }

    
    return (
        provincias ? 
        <div>
            <Form className='container'>

               <FormGroup>
                    <Label>Direccion</Label>
                    <Input onChange={handleChange} type="text" value={direccion} name="address" id="orderAddress"/>
                </FormGroup>
                 <br />
                <FormGroup>
                    <Label>Provincia</Label>
                    {selectProv ?
                      <Input onChange={handleChange} type="select" value={selectProv} name="prov" id="orderCity">
                          <option value={selectProv}>{selectProv}</option>
                          {provincias.map(e => <option>{e.nombre}</option>)}
                      </Input>
                    :
                      <Input onChange={handleChange} type="select" value={selectProv} name="prov" id="orderCity">
                          <option value="">--Seleccionar--</option>
                          {provincias.map(e => <option>{e.nombre}</option>)}
                      </Input>
                    }
                </FormGroup>
                   <br />
                <FormGroup>
                    <Label>Ciudad</Label>
                    {selectLoc ?
                      <Input onChange={handleChange} type="select" value={selectLoc} name="city" id="orderCity">
                          <option value={selectLoc}>{selectLoc}</option>
                          {localidades.map(e => <option>{e.nombre}</option>)}
                      </Input>
                    :
                      <Input onChange={handleChange} type="select" value={selectLoc} name="city" id="orderCity">
                          <option value="">--Seleccionar--</option>
                          {localidades.map(e => <option>{e.nombre}</option>)}
                      </Input>
                    }
                </FormGroup>
                  <br />
 
                <FormGroup>
                    <Label>Codigo Postal</Label>
                    <Input onChange={handleChange} type="text" value={cod} name="cod" maxLength="4" id="orderPostalCod"/>
                    <FormText>ej. 1706</FormText>
                </FormGroup>
                 <br />
                <FormGroup>
                    <Label>Pais</Label>
                    <Input onChange={handleChange} type="text" value={pais} name="pais"  id="orderCountry"/>
                </FormGroup>
                 <br />
                <FormGroup>
                    <Label>Numero de Telefono</Label>
                    <Input onChange={handleChange} type="text" value={telephone} name="telephone" maxLength="10" id="orderPhone"/>
                </FormGroup>
                 <br />
                <button id="buttonorder" onClick={handleSubmit}
                className="btn btn-block rm-border my-5"
                >Confirmar dirección de envio</button>
            </Form>
        </div>
        :
        <div>Cargando...</div>
    )
} 