import terminals from 'mocks/terminal'

const getTerminals = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(terminals)
    }, 1000)
  })

export default {
  getTerminals,
}
