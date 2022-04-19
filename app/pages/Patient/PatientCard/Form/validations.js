const VALIDATION_SCHEMA = {
  name: {
    required: 'Este campo é obrigatório',
  },
  holder: {
    required: 'Este campo é obrigatório',
  },
  phone: {
    required: 'Este campo é obrigatório',
    pattern: {
      value: /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
      message: 'Telefone inválido',
    },
  },
  email: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'E-mail inválido',
    },
  },
  treatmentBegin: {
    required: 'Este campo é obrigatório',
  },
}

export default VALIDATION_SCHEMA
