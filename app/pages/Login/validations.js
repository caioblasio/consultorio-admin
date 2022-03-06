const VALIDATION_SCHEMA = {
  email: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email inválido',
    },
    required: 'Este campo é obrigatório',
  },
  password: {
    required: 'Este campo é obrigatório',
  },
}

export default VALIDATION_SCHEMA
