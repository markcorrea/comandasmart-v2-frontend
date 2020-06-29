import {cpfMask} from 'utils/stringmasks'

export default {
  total: 1,
  totalPages: 1,
  data: [
    {
      id: '08989565600',
      name: 'Marcus',
      email: 'mrc.correa@gmail.com',
      cpf: cpfMask('08989565600'),
      birthDate: new Date('1987-09-04T12:00:00'),
      phone: '47991115868',
      address: 'Rua Guido Kaestner Senior, 301, ap. 1005',
      city: 'Blumenau',
      state: 'Santa Catarina',
    },
    {
      id: '08528752666',
      name: 'Salun',
      email: 'salunmarvin@gmail.com',
      cpf: cpfMask('08528752666'),
      birthDate: new Date('1990-02-26T12:00:00'),
      phone: '47992922092',
      address: 'Rua Laguna, 56',
      city: 'Blumenau',
      state: 'Santa Catarina',
    },
    {
      id: '12345678912',
      name: 'Savio',
      email: 'savio@kanova.com',
      cpf: cpfMask('12345678912'),
      birthDate: new Date('1990-01-01T12:00:00'),
      phone: '47999999999',
      address: 'Rua Antonio da Veiga, 1',
      city: 'Blumenau',
      state: 'Santa Catarina',
    },
  ],
}
