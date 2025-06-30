import validator from 'validator'

export const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }

  return helpers.error('string.uri')
}