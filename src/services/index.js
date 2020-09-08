import client from './client'
import cashier from './cashier'
import company from './company'
import product from './product'
import terminal from './terminal'
import ticket from './ticket'
import user from './user'

const functions = {
  ...cashier,
  ...client,
  ...company,
  ...product,
  ...terminal,
  ...ticket,
  ...user,
}

export default functions
