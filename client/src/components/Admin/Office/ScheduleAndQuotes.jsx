import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllOffice, updateOffice } from '../../../redux/actions/office'

function ScheduleAndQuotes() {
    const dispatch = useDispatch()
    const [view,setView]=useState([])
    const [showForm,setShowForm]=useState(false)
    const [offcieId,setOfficeId]=useState("")
    const [formInput,setFormInput]=useState([1])
    const [sendQuotes,setSendQuotes]=useState([])
    const [onchange,setOnchange]=useState("")

    const allOffices = useSelector(state => state.officeReducer.offices)
    useEffect(() => {
        dispatch(getAllOffice())
    }, [])
    
    useEffect(() => {
        setView(allOffices)
    }, [allOffices])
    const handleOffice=(e)=>{
        e.preventDefault()
        setShowForm(true)
        setOfficeId(e.target.id)
    }
    const pushInput=(e)=>{
        setFormInput(formInput.concat([formInput.length+1]))
    }
    const popInput=(e)=>{
        const aux=formInput.slice(0,-1)
        setFormInput(aux)
    }
    var quotes={} 

    const handleChange=(e)=>{
        e.preventDefault()
        setOnchange(e.target.value)  
    }
    const hadleOnBlur=(e,value)=>{
        //manejar id
        const search=sendQuotes.filter(q=>q.name===e.target.name)
        if(search.length===1){
            const filter=sendQuotes.filter(q=>q.name!==e.target.name)
            setSendQuotes(filter.concat([{name:e.target.name,quote:value}]))
        }else{
            setSendQuotes(sendQuotes.concat([{name:e.target.name,quote:value}]))
        }  
    }
    //-----------------------Ordenando los Cambios--------------------------
    const prev=sendQuotes.sort((a,b)=>{
        if(a.name<b.name) return -1;
        if(a.name>b.name) return 1;
        return 0;
    })
    const qoutes=prev.map(e=>e.quote)
    var changes={
        shift:qoutes
    }
    const sendQuotesbyeOffice=(e)=>{
        e.preventDefault()
        dispatch(dispatch(updateOffice({changes:changes,id:offcieId})))
    }
    console.log("esto es quotes",qoutes)
    return (
        <div>
            <h3>Selecciona una Sucursal</h3>
            <div>
                {view&&view.length>0&&
                view.map(e=>
                    <div key={e.id}>
                        <button id={e.id} onClick={event=>handleOffice(event)} >{e.name}</button>
                    </div>
                )
                }
            </div>
            <br />
            {showForm&&
                <div>
                <div>
                <h3>Turnosa crear: </h3>
                <br />
                <button onClick={e=>pushInput(e)}>Agregar</button>
                <button disabled={formInput.length===1} onClick={e=>popInput(e)}  >Quitar</button>
                <br />
                <br />
                {showForm&&formInput.length>0&& formInput.map(e=>
                <form key={e.id}  name="formulario">
                    <button disabled={true}>{e}</button>
                    {"---->"}
                    <input type="time" name={e} max="17:00:00" min="10:00:00" step="1" required="required" onChange={event=>handleChange(event)} onBlur={e=>hadleOnBlur(e,onchange)}/>
                </form>
                )
                
                }
            </div>
            <br />
            <button onClick={e=>sendQuotesbyeOffice(e)} >Guardar Cambios</button>
            </div>}
        </div>
    )
}

export default ScheduleAndQuotes
