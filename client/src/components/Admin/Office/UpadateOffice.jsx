import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllOffice, updateOffice } from '../../../redux/actions/office';

function UpadateOffice() {
    const dispatch=useDispatch();
    const [viewOffices,setViewOffices]=useState([])
    const [codesuc,setCodesuc]=useState(null)
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [phone,setPhone]=useState(null)
    const [form,setForm]=useState(false)
    const [idOffice,setIdOffice]=useState("")

    const allOffices = useSelector(state => state.officeReducer.offices)
    useEffect(() => {
        dispatch(getAllOffice()) 
    }, [])
    useEffect(() => {
        setViewOffices(allOffices)
    }, [allOffices])

    const handleChange=(e)=>{
       if(e.target.name==="codesuc") setCodesuc(e.target.value);
       if(e.target.name==="name") setName(e.target.value);
       if(e.target.name==="phone")setPhone(e.target.value);
       if(e.target.name==="address") setAddress(e.target.value);
    }
    const setUpdateOffice=(e)=>{
        setForm(!form)
        setIdOffice(e.target.id)
        const office=allOffices.find(o=>o.id===e.target.id)
        setCodesuc(office.codesuc)
        setName(office.name)
        setPhone(office.phone)
        setAddress(office.address)
    }
    const changes={
        codesuc:codesuc,
        name:name,
        phone:phone,
        address:address
    }
    const sendOfficeChanges=(e)=>{
        dispatch(updateOffice({changes:changes,id:idOffice}))
    }

    return (
        <div>
            <div>
            {
                viewOffices.length>0&&viewOffices.map(e=>
                    <div key={e.id}>
                        <p>Nombre: {e.name}</p>
                        <p>Dirección: {e.address}</p>
                        <p>Telefono: {e.phone} </p>
                        <p>Codesuc: {e.codesuc}</p>
                        <button id={e.id} onClick={(event)=>setUpdateOffice(event)} >Modificar Oficina</button>
                    </div>
                )
            }
            </div>
            <div>
            {form&&
            <div>
                <form>
                    <div class="mb-3">
                        <label htmlFor="codesuc" class="form-label">Codeduc</label>
                        <input type="number" name="codesuc" disabled={true} value={codesuc} class="form-control" id="codesuc" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Nombre</label>
                        <input type="text" name="name" value={name}  class="form-control" id="name" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="address" class="form-label">Dirección</label>
                        <input type="text" name="address" value={address}  class="form-control" id="address" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="phone" class="form-label">Telefono</label>
                        <input type="number" name="phone" value={phone} class="form-control" id="phone" onChange={e=>handleChange(e)} />
                    </div>
                    <button onClick={e=>sendOfficeChanges(e)} >Guardar Cambios</button>
                </form>
                </div>    
            }
            </div>
            
        </div>
    )
}

export default UpadateOffice
