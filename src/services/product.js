import products from 'mocks/product'

const searchProducts = search =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
    }, 1000)
  })

const getProducts = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products)
    }, 1000)
  })

export default {
  searchProducts,
  getProducts
}
