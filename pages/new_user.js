import React, {useState} from 'react'
import Layout from '../components/Layout';
import { useRouter} from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'


const NEW_USER = gql`
mutation newUser($input: InputUser){
    newUser(input: $input) {
      email
      name
      phone
      role
    }
  }
`;

const NewUser = () => {

    const [msj, saveMsj] = useState(null);
   
    const [ newUser ] = useMutation(NEW_USER);

//Routing
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: 0,
            address: ''
        },validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es válido').required('El mail es obligatorio'),
            password: Yup.string().required('La contraseña no puede ir vacio').min(6,'La contraseña debe tener un minimo de 6 caracteres'),
            phone: Yup.string().required('El telefono es obligatorio'),
            address: Yup.string().required('La dirección es obligatorio')

        }),
         onSubmit:  async values  => {
            console.log('enviado');
            console.log(values);
            const {name,email,password,phone,address} = values;
            console.log(values)
            try {
                const {data} = await newUser({
                    variables: {
                        input: {
                            name,
                            email,
                            password,
                            phone,
                            address
                        }
                    }
                })
                console.log(data);
                saveMsj(`Se creo correctamente el usuario ${data.newUser.name}`);
                setTimeout(() =>{
                    saveMsj(null);
                    router.push('/login')
                },5000)
            } catch (error) {
                saveMsj(error.message.replace('GraphQL error', ''));
                console.log(error);

                setTimeout(() =>{
                    saveMsj(null);
                },3000)

            }
        }
    })

    const showMsj = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{msj}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>

                {msj && showMsj()}

                <h1 className="text-center text 2xl text-white font-light">Nueva cuenta</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder = "Nombre"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                   >
                                </input>
                            </div>
                            { formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    placeholder = "Email Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input 
                        
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder = "Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Telefono
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="text"
                                    placeholder = "Telefono"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.phone ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.phone}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                    Dirección
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address"
                                    type="text"
                                    placeholder = "Dirección"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.address ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.address}</p>
                                </div>
                            ): null }
                            <div>
                                <input 
                                    className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"                                    type="submit"
                                    value = "Crear cuenta">
                                </input>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default NewUser