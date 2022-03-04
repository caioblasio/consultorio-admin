import { validateCPF } from 'utils/cpf'

const VALIDATION_SCHEMA = {
  name: {
    required: 'Este campo é obrigatório',
  },
  phone: {
    required: 'Este campo é obrigatório',
  },
  email: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'E-mail inválido',
    },
  },
  cpf: {
    required: 'Este campo é obrigatório',
    validate: (v) => validateCPF(v) || 'CPF inválido',
  },
}

export default VALIDATION_SCHEMA
