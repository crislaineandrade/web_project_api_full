const mongoose = require('mongoose');
const validador = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/._~:/?%#[@!$&'()*+,;=]*)?/.test(v);
      },
      message: (props) => `${props.value} não é uma mensagem válida`,
    },
  },

  email: {
    type: String,
    required: true,
    unique:true,
    validate: {
      validator(v) {
        return validador.isEmail(v)
      },
      message: 'Formato de e-mail inválido'
    }
  },

  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('user', userSchema);
