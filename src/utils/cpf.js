export const unformatCPF = text => {
  const newCpf = text.replace(/\D/g, '').replace(/-/g, '')
  return newCpf
}

export const formatCPF = text => {
  const arrayOfText = text.split('')
  const itemsToAdd = 11 - arrayOfText.length
  const newArray = [...Array.from({length: itemsToAdd}, () => '0'), ...arrayOfText]
  return newArray.join('')
}
