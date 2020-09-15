import useCashiers from './cashier'
import useClients from './client'
import useCompanies from './company'
import useAuthentication from './authentication'
import useOrders from './order'
import useProducts from './product'
import useReports from './report'
import useTerminals from './terminal'
import useTickets from './ticket'
import useUsers from './user'

const useServices = () => {
  return {
    ...useCashiers(),
    ...useClients(),
    ...useCompanies(),
    ...useAuthentication(),
    ...useOrders(),
    ...useProducts(),
    ...useReports(),
    ...useTerminals(),
    ...useTickets(),
    ...useUsers(),
  }
}

export default useServices
