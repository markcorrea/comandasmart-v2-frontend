const addZero = input => {
  return input.length < 2 ? `0${input}` : input
}

export const datetimeToString = input => {
  input = new Date(input)
  const day = addZero(input.getDate().toString())
  const month = addZero((input.getMonth() + 1).toString())
  const year = input.getFullYear().toString()

  const hour = addZero(input.getHours().toString())
  const minute = addZero(input.getMinutes().toString())

  const date = `${day}/${month}/${year}`
  const time = `${hour}:${minute}`

  return `${date} às ${time}`
}

export const dateToString = input => {
  input = new Date(input)
  const day = addZero(input.getDate().toString())
  const month = addZero((input.getMonth() + 1).toString())
  const year = input.getFullYear().toString()

  const date = `${day}/${month}/${year}`

  return `${date}`
}

export const datetimeToAmericanDateString = input => {
  const day = addZero(input.getDate().toString())
  const month = addZero((input.getMonth() + 1).toString())
  const year = input.getFullYear().toString()

  const date = `${year}/${month}/${day}`

  return `${date}`
}
