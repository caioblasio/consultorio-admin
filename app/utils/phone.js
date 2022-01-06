export const formatPhone = (phone) => {
  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/
  var str = phone.replace(/[^0-9]/g, '').slice(0, 11)

  const result = str.replace(regex, '($1) $2-$3')

  return result
}
