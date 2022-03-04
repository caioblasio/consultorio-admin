const VALIDATION_SCHEMA = {
  holder: {
    required: 'Este campo é obrigatório',
  },
  patientId: {
    required: 'Este campo é obrigatório',
  },
  type: {
    required: 'Este campo é obrigatório',
  },
  references: {
    required: 'Este campo é obrigatório',
    validate: (v) => v.length > 0,
  },
  status: {
    required: 'Este campo é obrigatório',
  },
}

export default VALIDATION_SCHEMA
