import mongoose from 'mongoose';
import validador from 'validator';
import bcrypt from 'bcryptjs'

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
    unique: true,
    validate: {
      validator(v) {
        return validador.isEmail(v);
      },
      message: 'Formato de e-mail inválido',
    },
  },

  password: {
    type: String,
    required: true,
    select: false
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // console.log(email,password)

  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log('achado')
      console.log(user)
      // Se o usuário não for encontrado, rejeita a promessa com erro
      if (!user) {
        return Promise.reject(new Error('Usuário não encontrado'));
      }

      // Se encontrado, compara o hash da senha fornecida com a salva no banco
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // Se a comparação falhar, rejeita a promessa com erro
          if (!matched) {
            return Promise.reject(new Error('E-mail ou senha incorretos'));
          }

          // Autenticação bem-sucedida — retorna o objeto do usuário
          return user;
        });
    });
};


export default mongoose.model('user', userSchema);
