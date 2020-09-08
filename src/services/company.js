import companies from 'mocks/company'

const getCompanies = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(companies)
    }, 1000)
  })

export default {
  getCompanies,
}
