import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/._~:/?%#[@!$&'()*+,;=]*)?/.test(v);
      },
      message: (props) => `${props.value} não é uma mensagem válida`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('card', cardSchema);
