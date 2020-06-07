import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const AUTH_USER= gql`
mutation authenticate($input: InputAuth){
    authenticate(input: $input) {
      token
    }
  }
`;


const Login = () => {

    const [msj, saveMsj] = useState(null);

    const router = useRouter();

    const [ authenticate ] = useMutation(AUTH_USER);
    const formik = useFormik({
        initialValues: {
            email:'',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('El email no es válido')
                .required('El email no puede estar vacio'),
            password: Yup.string()
                .required('el password es obligatorio')    
        }),
        onSubmit: async values => {

            const { email, password } = values;

            try {
                const { data } = await authenticate({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                console.log(data)
                saveMsj('Autenticando...')
                const { token } = data.authenticate    
                localStorage.setItem('token', token)
                router.push('/')

            } catch (error) {
                saveMsj(error.message.replace('GraphQL error: ', ''))
                setTimeout(() =>{
                    saveMsj(null);
                },3000);
            }

        }
    })

    const newUser = () =>{
        router.push('/new_user')

    }

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
                <h1 className="text-center text 2xl text-white font-light">Login</h1>

                {msj && showMsj()}

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder = "Email Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    >
                                </input>
                            </div>
                            { formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null }
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder = "Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                              
                                    >
                                </input>
                            </div>
                            { formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null }
                            <div>
                                <input 
                                    className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"                                    type="submit"
                                    value = "Iniciar sesión"
                                    >
                                </input>
                            </div>
                        </form>
                        <div>
                            <a className="text-blue-500 hover:text-blue-700" onClick={newUser}>Nuevo usuario</a>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login