export const applyToken = token => (document.cookie = `token=${token}`)

export const verifyToken = () => {
  const cookiesArray = document.cookie.split(';')
  const cookie = cookiesArray.find(cookie => cookie.trim().substring(0, 5) === 'token' && !cookie.trim().includes('expires'))
  const mycookie = cookie !== undefined ? cookie.split('=')[1] : null
  return mycookie
}

export const destroyToken = () => {
  const cookiesArray = document.cookie.split(';')
  const mgmtCookie = cookiesArray.find(cookie => cookie.trim().substring(0, 5) === 'token')
  if (mgmtCookie) {
    document.cookie = `${mgmtCookie}; expires=${new Date()}`
  }
}
