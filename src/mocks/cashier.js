import {datetimeToString} from 'utils/datetimeToString'

export default {
  total: 1,
  totalPages: 1,
  data: [
    {
      id: '1',
      name: 'Marcus',
      opened: datetimeToString(new Date('1987-04-09T08:00:00')),
      closed: datetimeToString(new Date('1987-04-09T18:00:00')),
      totalValue: 120,
    },
    {
      id: '2',
      name: 'Salun',
      opened: datetimeToString(new Date('1987-04-09T12:00:00')),
      closed: datetimeToString(new Date('1987-04-09T18:00:00')),
      totalValue: 180,
    },
    {
      id: '3',
      name: 'Sávio',
      opened: datetimeToString(new Date('1987-04-09T12:00:00')),
      closed: datetimeToString(new Date('1987-04-09T18:00:00')),
      totalValue: 60,
    },
  ],
}
