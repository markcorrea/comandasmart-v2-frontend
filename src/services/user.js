import users from 'mocks/user'

const getUsers = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(users)
    }, 1000)
  })

export default {
  getUsers,
}
