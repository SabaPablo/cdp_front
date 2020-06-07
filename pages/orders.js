import React from 'react'
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'


const GET_ORDERS = gql`
  query getOrders {
    getBeers {
      id
      name
      ibus
      type
      brand
      stock
      price
    }
  }
`;



const Orders = () => {

  const { data, loading, error } = useQuery(GET_ORDERS);



  if(loading){
    return 'Cargando....'
  }
  console.log(data.getOrders)
  return(
      <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Beers</h1>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
              <tr className="text-white">
                  <th className="w-1/ py-2">Nombre</th>
                  <th className="w-1/ py-2">ibus</th>
                  <th className="w-1/ py-2">tipo</th>
                  <th className="w-1/ py-2">marca</th>
                  <th className="w-1/ py-2">price</th>
                  <th className="w-1/ py-2">stock</th>
              </tr>
          </thead>  
          <tbody className="bg-white">
          {data.getBeers.map( beer => (
              <tr key= {beer.id}>
                  <td className="border px-4 py-2">{beer.name}</td>
                  <td className="border px-4 py-2">{beer.ibus}</td>
                  <td className="border px-4 py-2">{beer.type}</td>
                  <td className="border px-4 py-2">{beer.brand}</td>
                  <td className="border px-4 py-2">{beer.price}</td>
                  <td className="border px-4 py-2">{beer.stock}</td>
              </tr>
          ))}
          </tbody>
      </table>
      </Layout>
    </div>  
  );
}
  
export default Orders;