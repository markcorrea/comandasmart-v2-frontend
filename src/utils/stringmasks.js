export const cpfMask = (input = null) => {
  if (!input || typeof input !== 'string') return ''
  const outputArray = []
  const inputArray = input.split('')
  for (let i = 0; i < inputArray.length; i++) {
    outputArray.push(inputArray[i])
    if (i === 2 || i === 5) outputArray.push('.')
    if (i === 8) outputArray.push('-')
  }
  return outputArray.join('')
}
