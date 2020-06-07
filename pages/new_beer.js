import React, {useState} from 'react'
import Layout from '../components/Layout';
import { useRouter} from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'


const NEW_BEER = gql`
  mutation newBeer($input: InputBeer){
      newBeer(input: $input){
        id
        name
        brand
        stock
        info
        price
        url
      }
    }
`;

const NewBeer
    = () => {

    const [msj, saveMsj] = useState(null);
   
    const [ newBeer ] = useMutation(NEW_BEER);

//Routing
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            ibus: '',
            info: "",
            brand: "",
            stock: 0,
            type: '',
            price: 0.0,
            url: ""
        },validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            ibus: Yup.number().required('los ibus son obligatorios'),
            brand: Yup.string().required('La dirección es obligatorio'),
            info: Yup.string().required('El telefono es obligatorio'),
            stock: Yup.number().required('La cantidad de stock es obligatorio'),
            type: Yup.string().required('La dirección es obligatorio'),
            price: Yup.number().required('La dirección es obligatorio'),
            url: Yup.string().required('La dirección es obligatorio')
        }),
         onSubmit:  async values  => {
            console.log('enviado');
            console.log(values);
            const {name,info,ibus,stock,type,brand,price,url} = values;
            console.log(values)
            try {
                const {data} = await newBeer({
                    variables: {
                        input: {
                            name,
                            ibus,
                            brand,
                            info,
                            stock,
                            price,
                            type,
                            url
                        }
                    }
                })
                console.log(data);
                saveMsj(`Se creo correctamente el usuario ${data.newBeer.name}`);
                setTimeout(() =>{
                    saveMsj(null);
                    router.push('/beers')
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

                <h1 className="text-center text 2xl text-white font-light">Nueva Cerveza</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre de la cerveza
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder = "Nombre"
                                    autoComplete="nameBeer"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                                    Marca
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="brand"
                                    type="text"
                                    autoComplete="brand"
                                    placeholder = "brand"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                >
                                </input>
                            </div>
                            { formik.errors.brand ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.brand}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ibus">
                                    Ibus
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ibus"
                                    type="number"
                                    autoComplete="ibus"
                                    placeholder = "ibus"
                                    value={formik.values.ibus}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.ibus ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.ibus}</p>
                                </div>
                            ): null }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                    Tipo
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="type"
                                    type="text"
                                    placeholder = "tipo"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                >
                                </input>
                            </div>
                            { formik.errors.type ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.type}</p>
                                </div>
                            ): null }

                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">
                                    Info
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="info"
                                    type="text"
                                    placeholder = "Información"
                                    value={formik.values.info}
                                    onChange={formik.handleChange}
                                    >
                                </textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Precio
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    autoComplete="price"
                                    placeholder = "price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                >
                                </input>
                            </div>
                            { formik.errors.price ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.price}</p>
                                </div>
                            ): null }
                            { formik.errors.info ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.info}</p>
                                </div>
                            ): null }
                            <div className="mb-4"> 
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                    Stock
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="stock"
                                    type="number"
                                    placeholder = "Stock"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    >
                                </input>
                            </div>
                            { formik.errors.stock ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.stock}</p>
                                </div>
                            ): null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                                    URL
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="url"
                                    type="text"
                                    autoComplete="ulr"
                                    placeholder = "url"
                                    value={formik.values.url}
                                    onChange={formik.handleChange}
                                >
                                </input>
                            </div>
                            { formik.errors.url ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.url}</p>
                                </div>
                            ): null }

                            <div>
                                <input 
                                    className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"                                    type="submit"
                                    value = "Nueva cerveza">
                                </input>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default NewBeer