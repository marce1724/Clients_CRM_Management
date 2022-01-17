import { useState,  useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from "../Components/Formulario"

const EditarCliente = () => {

    const [ cliente, setCliente ] = useState([])
    const [ cargando, setCargando ] = useState(true)
    const { id } = useParams()

    useEffect(() =>{

         const obtenerClienteAPI = async () =>{
             try {
                const url = `https://my-json-server.typicode.com/marce1724/api_crm/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)

             } catch (error) {
                console.log(error)
             }
             setCargando(!cargando) 
         }
         obtenerClienteAPI()

    }, [])

    return (
        <>
         <h1 className=" font-black text-4xl text-blue-900 ">Editar Cliente</h1>
         

         {cliente?.nombre ? (
            <> 
                <p className='mt-3'>Utiliza este formulario para editar la información del cliente</p>
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                /> 
             </>
         ) : <p className='mt-3'>Cliente ID no válido</p>}     
        </>
    )
}

export default EditarCliente