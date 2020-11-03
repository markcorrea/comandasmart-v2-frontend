import useAuthentication from './authentication'
import useCashiers from './cashier'
import useClients from './client'
import useCompanies from './company'
import useMenus from './menu'
import useOrders from './order'
import useProducts from './product'
import useReports from './report'
import useTerminalOrders from './terminalOrder'
import useTerminals from './terminal'
import useTickets from './ticket'
import useUsers from './user'

const useServices = () => {
  return {
    ...useAuthentication(),
    ...useCashiers(),
    ...useClients(),
    ...useCompanies(),
    ...useMenus(),
    ...useOrders(),
    ...useProducts(),
    ...useReports(),
    ...useTerminalOrders(),
    ...useTerminals(),
    ...useTickets(),
    ...useUsers(),
  }
}

export default useServices
