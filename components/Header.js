import React from 'react'
import { useQuery, gql} from '@apollo/client'
import { useRouter} from 'next/router'

const GET_USER = gql`
    query getUser{
        getUser{
            id
            name
        }
    }
`

const Header = () => {


    const router = useRouter();

    const {data,loading, error} = useQuery(GET_USER) 

    if(loading) return null
    console.log( data)
    if(!data.getUser) return router.push('/login')
    

    const closeSesion = () =>{
        localStorage.removeItem('token');
        router.push('/login')
    }

    console.log(data)
    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2"> Hola: {data.getUser.name} </p>

            <button 
            onClick={() => closeSesion()}
            type="button"
            className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerrar Sesión
            </button>
        </div>
        );
}

export default Header;