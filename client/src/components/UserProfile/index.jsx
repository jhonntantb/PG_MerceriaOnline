import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, updateUser } from '../../redux/actions/user'
import PasswordChangePage from '../Authentication/PasswordChange';
import Direction from './Direction';
import Footer from '../Footer/Footer';
import './index.css'

function Index() {
    const dispatch = useDispatch()
    const userId = localStorage.getItem("pg_merceria")
    const user = useSelector(state => state.userReducer.user)
    useEffect(() => {
        dispatch(getUser(userId))
    }, [])
    //---------------------Render info----------------------------
    const [myData, setMyData] = useState(true)
    const [security, setSecurity] = useState(false)
    const [showDirection,setShowDiretion]=useState(false)

    //--------------------Data User----------------------------
    const [disabledDirection, setDisabledDirection] = useState(true)
    const [disabledUser, setDisabledUser] = useState(true)//
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [location, setLocation] = useState("")
    const [province, setProvince] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        if (typeof user === "object") {
            setUserName(user.user_name)
            setEmail(user.email)
            setFirstName(user.first_name)
            setLastname(user.last_name)
            setPhone(user.phone_number)
            setLocation(user.location)
            setProvince(user.province)
            setAddress(user.address)
        }
    }, [user])

    const handleChange = (e) => {
        e.target.id === "username" && setUserName(e.target.value)
        e.target.id === "email" && setEmail(e.target.value)
        e.target.id === "first_name" && setFirstName(e.target.value)
        e.target.id === "last_name" && setLastname(e.target.value)
        e.target.id === "phone" && setPhone(e.target.value)
        e.target.id === "province" && setProvince(e.target.value)
        e.target.id === "location" && setLocation(e.target.value)
        e.target.id === "address" && setAddress(e.target.value)

    }
    const showSecurity = (e) => {
        e.preventDefault()
        setSecurity(true)
        setMyData(false)
        setDisabledDirection(true)
        setDisabledUser(true)
    }
    const ShowMyData = (e) => {
        e.preventDefault()
        setMyData(true)
        setSecurity(false)
        setShowDiretion(false)
    }
    const modifyUserData = (e) => {
        e.preventDefault();
        setDisabledUser(false)
        setShowDiretion(false)
    }
    const modifyUserDirection = (e) => {
        e.preventDefault()
        setDisabledDirection(false)
    }
    const showDirections=(e)=>{
        setShowDiretion(true)
        setMyData(false)
        setSecurity(false)
    }

    const changes = {
        username: username,
        first_name: firstName,
        last_name: lastname,
        email: email,
        phone_number: phone,
        province: province,
        location: location,
        address: address
    }

    const handleUserUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser([{ id: userId, changes: changes }]))
        setDisabledUser(true)
        setDisabledDirection(true)
    }

    return (
        <div>
        <main className="page-main">
            <div>
                <div>
                    <div className="page-title-wraper">
                        <div className="container">
                            <h1 className="page-title">
                                {myData ?
                                    <span className="base" data-ui-id="page-title-wrapper"> Editar informacion personal</span>
                                    : <span className="base" data-ui-id="page-title-wrapper">Seguridad</span>
                                }
                            </h1>
                        </div>
                    </div>
                    <div className="colums container">
                        <div className="row">
                            <div className="col-sm-3 grid-left px-1">
                                <div className="sidebar sidebar-main">
                                    <div className="block account-nav">
                                        <div className="content account-nav-content">
                                            <ul>
                                                <li > <button type="submit" className="items my-2" onClick={e => ShowMyData(e)}>Mis Datos</button></li>
                                                <li > <button type="submit" className="items my-2" onClick={e => showSecurity(e)} >Seguridad</button></li>
                                                <li > <button type="submit" className="items my-2" onClick={e => showDirections(e)} >Direcciones</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-9 grid-main px-5">
                                {myData === true && user &&
                                    <div className="column main">
                                        <form>
                                            <fieldset className="fieldset info">
                                                <legend className="legend">
                                                    <span>Informacion personal</span>
                                                </legend>
                                                <br />
                                                <div className="field field-username required">
                                                    <label htmlFor="username" className="label">
                                                        <span>Usuario</span>
                                                    </label>
                                                    <div className="control">
                                                        <input type="text" disabled={disabledUser} value={username} className="input-text required-entry" aria-required="true" id="username" onChange={e => handleChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="field field-email required">
                                                    <label htmlFor="email" className="label">
                                                        <span> E-mail</span>
                                                    </label>
                                                    <div className="control">
                                                        <input type="email" value={email} disabled={true} className="input-text required-entry" aria-required="true" id="email" aria-describedby="emailHelp" />
                                                        <label id="emailHelp" className="form-text">No puedes modificar tu email,para mayor informacion contactanos</label>
                                                    </div>
                                                </div>
                                                <div className="field field-name-firstname required">
                                                    <label htmlFo="firstname" className="label">
                                                        <span>Nombre</span>
                                                    </label>
                                                    <div className="control">
                                                        <input id="firstname" type="text" disabled={disabledUser} value={firstName} aria-required="true" class="input-text required-entry" onChange={e => handleChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="field field-name-lastname required">
                                                    <label htmlFor="lastname" className="label">
                                                        <span>Apellido</span>
                                                    </label>
                                                    <div className="control">
                                                        <input type="text" disabled={disabledUser} value={lastname} aria-required="true" class="input-text required-entry" id="lastname" onChange={e => handleChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="field field-phonenumber required">
                                                    <label htmlFor="phone" className="label">
                                                        <span>N° Telefonico de Contacto</span>
                                                    </label>
                                                    <input type="text" disabled={disabledUser} value={phone} aria-required="true" class="input-text required-entry" id="phone" onChange={e => handleChange(e)} />
                                                </div>
                                            </fieldset>

                                            <div className="actions-toolbar">
                                                <div className="primary">
                                                    <button type="submit" className="action save primary" onClick={e => modifyUserData(e)}>
                                                        <span>Modificar Datos </span>
                                                    </button>
                                                </div>
                                                <div className="secondary">
                                                    <button type="submit" className="action primary" onClick={e => handleUserUpdate(e)} >
                                                        <span>Guardar Cambios</span>
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                    }
                                    {security&&
                                    <div>
                                    <PasswordChangePage />
                                    </div>}
                                    {showDirection&&
                                        <div>
                                            <Direction/>
                                        </div>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
         <Footer />
         </div>
    )
}

export default Index
