import React from 'react'
import ProductSearch from 'components/ProductSearch'

export default {
  title: 'Components/ProductSearch',
  component: ProductSearch,
}

const products = [
  {
    id: 0,
    uniqueCode: 100,
    name: 'Heineken',
  },
  {
    id: 1,
    uniqueCode: 200,
    name: 'Languiru',
  },
  {
    id: 2,
    uniqueCode: 300,
    name: 'Edifier',
  },
  {
    id: 3,
    uniqueCode: 400,
    name: 'Alesis',
  },
  {
    id: 4,
    uniqueCode: 500,
    name: 'Uni-ball Eye',
  },
  {
    id: 5,
    uniqueCode: 600,
    name: 'MacBook Pro',
  },
  {
    id: 6,
    uniqueCode: 700,
    name: 'Bière Chaterlaine',
  },
  {
    id: 7,
    uniqueCode: 800,
    name: 'Tommy Hilfiger',
  },
  {
    id: 8,
    uniqueCode: 900,
    name: 'Samsung',
  },
  {
    id: 9,
    uniqueCode: 100,
    name: 'Soprano',
  },
]

const searchProductsByName = search =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
    }, 1000)
  })

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <ProductSearch
        searchProductsByName={searchProductsByName}
        onEnterPress={message => console.log('enter here', message)}
        onConfirm={() => console.log('confirming')}
      />
    </div>
  )
}
