import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllOffice } from '../../../redux/actions/office'
import NewOffice from './NewOffice'
import UpadateOffice from './UpadateOffice'
import ScheduleAndQuotes from './ScheduleAndQuotes'


function Office() {
    const dispatch = useDispatch()
    const [offices,setOffices]=useState([])
    const [renderNewOffice,setRenderNewOffice]=useState(false)
    const [renderUpdateOffice,setRenderUpdateOffice]=useState(false)
    const [renderOfficeQuote,setRenderOfficeQuote]=useState(false)

    const allOffices = useSelector(state => state.officeReducer.offices)

    useEffect(() => {
        dispatch(getAllOffice())
    }, [])
    useEffect(() => {
        setOffices(allOffices)
    }, [allOffices])

    const manageOffices=(e)=>{
        setRenderNewOffice(!renderNewOffice)
        setRenderUpdateOffice(false)
        setRenderOfficeQuote(false)

    }
    const updateOfficeInfo=(e)=>{
        setRenderUpdateOffice(!renderUpdateOffice)
        setRenderNewOffice(false)
        setRenderOfficeQuote(false)
    }
    const officeQuotes=(e)=>{
        setRenderOfficeQuote(!renderOfficeQuote)
        setRenderNewOffice(false)
        setRenderUpdateOffice(false)
    }
    return (
        <div>
            Estamos en Oficina
            <div>
                <button onClick={e=>officeQuotes(e)} >Modificar Horario de Recojo</button>
                <button onClick={e=>manageOffices(e)} >Crear o Eliminar Oficina</button>
                <button onClick={e=>updateOfficeInfo(e)}>Modificar datos de una Oficina</button>
            </div>
            <div>
                {renderNewOffice&&<NewOffice/>}  
            </div>
            <div>
                {renderUpdateOffice&&<UpadateOffice/>}
            </div>
            <div>
                {renderOfficeQuote&&<ScheduleAndQuotes /> }
            </div>

        </div>
    )
}

export default Office
