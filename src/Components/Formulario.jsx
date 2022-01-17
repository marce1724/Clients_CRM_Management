
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import * as Yup from 'yup'
import Alerta from './Alerta'


const Formulario = ({cliente, cargando}) => {

     const navigate = useNavigate()


     const nuevoClienteSchema = Yup.object().shape({
         nombre: Yup.string()
                     .required('El nombre del cliente es obligatorio')
                     .min(3, 'El nombre es muy corto')
                     .max(30, 'El nombre es muy largo'),

         empresa: Yup.string()
                     .required('El nombre de la empresa es obligatorio'),

         email: Yup.string()
                     .email('Email no válido')
                     .required('El Email es obligatorio'),

         telefono: Yup.number()
                      .typeError('Teléfono no válido')
                      .integer('Teléfono no válido')
                      .positive('Teléfono no válido'),
         notas: ''

     })
      
     const handleSubmit = async (values) => {
         try{
             let respuesta
             if(cliente.id){
                  //Editando un Registro
                const url = `https://my-json-server.typicode.com/marce1724/api_crm/clientes/${cliente.id}`
                 respuesta = await fetch(url, {
                     method: 'PUT',
                     body: JSON.stringify(values),
                     headers: {
                        'Content-Type': 'application/json'
                     }
                })
             }else{
                 //Creando Nuevo Registro
                const url = "https://my-json-server.typicode.com/marce1724/api_crm/clientes/"
                 respuesta = await fetch(url, {
                     method: 'POST',
                     body: JSON.stringify(values),
                     headers: {
                        'Content-Type': 'application/json'
                     }
                })
             }
             await respuesta.json()
             navigate('/clientes')    


         }catch(error){
             console.log(error)
         }
     }



    return (
         cargando ? <Spinner/> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                    { cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
                </h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? "",
                    }}

                    enableReinitialize={true} //coloca el valor en los imputs
                    onSubmit={ async(values, {resetForm}) => {
                        
                        await handleSubmit(values)
                        resetForm()
                    }} 

                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => (

                    
                    <Form
                        className="mt-10"
                    >
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="nombre"
                                >Nombre:</label>
                                <Field
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50" 
                                    placeholder="Nombre del Cliente"                      
                                />
                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>

                                ) : null }
                            </div>

                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="empresa"
                                >Empresa: </label>
                                <Field
                                    id="empresa"
                                    name="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50" 
                                    placeholder="Empresa del Cliente"                      
                                />
                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>

                                ) : null }
                            </div>

                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="email"
                                >E-mail: </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50" 
                                    placeholder="Email del Cliente"                      
                                />
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>

                                ) : null }
                            </div>

                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="telefono"
                                >Teléfono: </label>
                                <Field
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50" 
                                    placeholder="Telefono del Cliente"                      
                                />
                                {errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>

                                ) : null }
                            </div>
                            

                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="notas"
                                >Notas: </label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    name="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40" 
                                    placeholder="Notas del Cliente"                      
                                />
                            </div>

                            <input 
                                type="submit"
                                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                            />
                    </Form>
                    )}
                </Formik>     
            </div>
        )
    )
}

Formulario.defaultProps ={
    cliente : {},
    cargando : false
}

export default Formulario