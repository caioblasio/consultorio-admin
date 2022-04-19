import { validateCPF } from 'utils/cpf'

const VALIDATION_SCHEMA = {
  name: {
    required: 'Este campo é obrigatório',
  },
  cpf: {
    required: 'Este campo é obrigatório',
    validate: (v) => validateCPF(v) || 'CPF inválido',
  },
}

export default VALIDATION_SCHEMA
