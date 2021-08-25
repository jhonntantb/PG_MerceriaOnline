import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, updateUser } from '../../redux/actions/user'

function Direction() {
    const dispatch = useDispatch()
    const userId = localStorage.getItem("pg_merceria")
    const user = useSelector(state => state.userReducer.user)

    const [location, setLocation] = useState("")
    const [province, setProvince] = useState("")
    const [address, setAddress] = useState("")
    const [disabledDirection, setDisabledDirection] = useState(true)

    useEffect(() => {
        dispatch(getUser(userId))
    }, [])

    useEffect(() => {
        if (typeof user === "object") {
            setLocation(user.location)
            setProvince(user.province)
            setAddress(user.address)
        }
    }, [user])
    const handleChange = (e) => {
        e.target.id == "province" && setProvince(e.target.value)
        e.target.id == "location" && setLocation(e.target.value)
        e.target.id == "address" && setAddress(e.target.value)

    }
    
    const modifyUserDirection = (e) => {
        e.preventDefault()
        setDisabledDirection(false)
    }
    const changes = {
        province: province,
        location: location,
        address: address
    }
    const handleUserUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser([{ id: userId, changes: changes }]))
        setDisabledDirection(true)
    }
    return (
        <div>
            <form>
                <fieldset className="fieldset info">
                    <legend className="legend">
                    <span>Informacion personal</span>
                    </legend>
                        <br />
                        <div className="field field-username required">
                            <label htmlFor="province" className="label">
                                <span>Provincia</span>
                            </label>
                            <div className="control">
                                <input type="text" disabled={disabledDirection} value={province} className="input-text required-entry" aria-required="true" id="province" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="field field-email required">
                            <label htmlFor="location" className="label">
                                <span>Locacion</span>
                            </label>
                            <div className="control">
                                <input type="text" value={location} disabled={disabledDirection} className="input-text required-entry" aria-required="true" id="location" />
                            </div>
                         </div>
                        <div className="field field-name-firstname required">
                            <label htmlFo="address" className="label">
                                <span>Dirección</span>
                            </label>
                            <div className="control">
                            <input id="address" type="text" disabled={disabledDirection} value={address} aria-required="true" class="input-text required-entry" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                    
                </fieldset>

                    <div className="actions-toolbar">
                        <div className="primary">
                            <button type="submit" className="action save primary" onClick={e => modifyUserDirection(e)}>
                                <span>Modificar Direccion </span>
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
    )
}

export default Direction
