import cashier from './cashier'
import client from './client'
import company from './company'
import useOrders from './order'
import product from './product'
import useTerminals from './terminal'
import ticket from './ticket'
import user from './user'

const useServices = () => {
  return {
    ...cashier,
    ...client,
    ...company,
    ...useOrders(),
    ...product,
    ...useTerminals(),
    ...ticket,
    ...user,
  }
}

export default useServices
