import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { createOffice, deleteOffice, getAllOffice } from '../../../redux/actions/office'
function NewOffice() {
    const dispatch = useDispatch()
    const [viewOffices,setViewOffices]=useState([])
    const [renderOffices,setRenderOffices]=useState(false)
    const [allCodesuc,setAllCodesuc]=useState([])
    const [renderNewOffice,setRenderNewOffice]=useState(false)
    const [newOffice,setNewOffice]=useState({
        codesuc: 0,
        name:"",
        address:"",
        phone:0
        
    })

    const AllOffices = useSelector(state => state.officeReducer.offices)

    useEffect(() => {
        dispatch(getAllOffice())
    }, [])
    useEffect(() => {
        setViewOffices(AllOffices)
        setAllCodesuc(AllOffices.map(o=>o.codesuc))
    }, [AllOffices])
    const handleChange=(e)=>{
        setNewOffice(values => ({
            ...values,
            [e.target.name]: e.target.value
          }))
    }
    const postNewOffice=(e)=>{
        dispatch(createOffice(newOffice))
    }
    const deleteOffices=(event)=>{
        console.log(event.target.id)
        dispatch(deleteOffice(event.target.id))
    }
    const ShowOffices=(e)=>{
        setRenderOffices(!renderOffices)
    }
    const renderFormNewOffice=(e)=>{
        setRenderNewOffice(!renderNewOffice)
    }
    return (
        <div>
            <div>
                <button onClick={e=>ShowOffices(e)}>Ver las Oficinas</button>
                {renderOffices&& viewOffices.map(e=> 
                <div key={e.id}> 
                    <p>Nombre: {e.name}</p>
                    <p>Dirección: {e.address}</p>
                    <p>Telefono: {e.phone} </p>
                    <p>Codesuc: {e.codesuc}</p>
                    <button id={e.id} onClick={(event)=>deleteOffices(event)} >Eliminar Oficina</button>
                </div>)}
            </div>
            <br />
            <br />
            
            <div>
                <button onClick={e=>renderFormNewOffice(e)}>Crear nueva Oficina</button>
                {renderNewOffice&&
                    <div>
                    <form>
                
                    <div class="mb-3">
                        <label htmlFor="codesuc" class="form-label">Codeduc</label>
                        <input type="number" name="codesuc" min={Math.max(...allCodesuc)+1} class="form-control" id="codesuc" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Nombre</label>
                        <input type="text" name="name"  class="form-control" id="name" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="address" class="form-label">Dirección</label>
                        <input type="text" name="address"  class="form-control" id="address" onChange={e=>handleChange(e)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="phone" class="form-label">Telefono</label>
                        <input type="number" name="phone" class="form-control" id="phone" onChange={e=>handleChange(e)} />
                    </div>
                </form>
                <button onClick={e=>postNewOffice(e)} >Crear Nueva Oficina</button>
                </div>}
            </div>


        </div>
    )
}

export default NewOffice
