const CENTESIMAL_CONVERTER = 100

export const centesimalToStandard = (cents) => cents / CENTESIMAL_CONVERTER

export const standardToCentesimal = (stand) => stand * CENTESIMAL_CONVERTER

export const formatCurrency = (number, currency = 'BRL', locale = 'pt-BR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number)
