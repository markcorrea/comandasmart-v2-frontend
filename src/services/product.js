import products from 'mocks/product'

const getProducts = search =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
    }, 1000)
  })

export default {
  getProducts,
}
