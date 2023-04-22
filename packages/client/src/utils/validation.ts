import type { Schema } from 'yup'
import { object, ObjectSchema, ref, string } from 'yup'

const regExps = {
  hasNoSpecialCharsExHyphen: /^[а-яА-ЯёЁa-zA-Z-]+$/g,
  hasLatinCharsDigitsHyphens: /^[a-zA-Z][a-zA-Z-_\d]{3,20}$/g,
  hasUppercaseLatinChars: /[A-Z]+/g,
  hasUppercaseFirstChar: /^[А-ЯЁA-Z].+$/g,
  hasDigits: /\d+/g,
  phone: /^\+?[\d+]{10,15}$/g,
}

const messages = {
  required: 'Это поле обязательно',
  email: 'Введите действительный email адрес',
  min: (field: string, num: number) =>
    `Длина ${field} должна быть не менее ${num} символов`,
  max: (field: string, num: number) =>
    `Длина ${field} должна быть не более ${num} символов`,
  hasLatinCharsDigitsHyphens:
    'Допускаются латинские буквы, цифры, символы "-" и "_", должен начинаться с буквы',
  hasUppercaseLatinChars: 'Обязательна хотя бы одна заглавная буква',
  hasUppercaseFirstChar: (field: string) =>
    `${field} необходимо писать с большой буквы`,
  hasDigits: 'Обязательна хотя бы одна цифра',
  hasNoSpecialCharsExHyphen:
    'Не допускаются пробелы, цифры и спецсимволы, кроме "-"',
  phone: 'Телефон должен состоять только из цифр, в начале допускается "+"',
  confirmPassword: 'Пароли должны совпадать',
}

type validationRule = {
  [key: string]: Schema
}

function createValidationSchema<T extends validationRule>(rule: T) {
  return rule
}

export const validationSchema = createValidationSchema({
  login: string()
    .trim()
    .min(3, messages.min('логина', 3))
    .max(20, messages.max('логина', 20))
    .matches(
      regExps.hasLatinCharsDigitsHyphens,
      messages.hasLatinCharsDigitsHyphens
    )
    .required(messages.required),
  password: string()
    .trim()
    .min(8, messages.min('пароля', 8))
    .max(40, messages.min('пароля', 40))
    .matches(regExps.hasUppercaseLatinChars, messages.hasUppercaseLatinChars)
    .matches(regExps.hasDigits, messages.hasDigits)
    .required(messages.required),
  oldPassword: string()
    .trim()
    .min(8, messages.min('пароля', 8))
    .max(40, messages.min('пароля', 40))
    .matches(regExps.hasUppercaseLatinChars, messages.hasUppercaseLatinChars)
    .matches(regExps.hasDigits, messages.hasDigits)
    .required(messages.required),
  newPassword: string()
    .trim()
    .min(8, messages.min('пароля', 8))
    .max(40, messages.min('пароля', 40))
    .matches(regExps.hasUppercaseLatinChars, messages.hasUppercaseLatinChars)
    .matches(regExps.hasDigits, messages.hasDigits)
    .required(messages.required),
  repeatPassword: string()
    .trim()
    .min(8, messages.min('пароля', 8))
    .max(40, messages.min('пароля', 40))
    .matches(regExps.hasUppercaseLatinChars, messages.hasUppercaseLatinChars)
    .matches(regExps.hasDigits, messages.hasDigits)
    .oneOf([ref('newPassword'), ref('password')], messages.confirmPassword)
    .required(messages.required),
  first_name: string()
    .trim()
    .matches(
      regExps.hasNoSpecialCharsExHyphen,
      messages.hasNoSpecialCharsExHyphen
    )
    .matches(
      regExps.hasUppercaseFirstChar,
      messages.hasUppercaseFirstChar('Имя')
    )
    .required(messages.required),
  second_name: string()
    .trim()
    .matches(
      regExps.hasNoSpecialCharsExHyphen,
      messages.hasNoSpecialCharsExHyphen
    )
    .matches(
      regExps.hasUppercaseFirstChar,
      messages.hasUppercaseFirstChar('Фамилию')
    )
    .required(messages.required),
  email: string().trim().email(messages.email).required(messages.required),
  phone: string()
    .trim()
    .matches(regExps.phone, messages.phone)
    .min(10, messages.min('телефона', 10))
    .max(15, messages.max('телефона', 20))
    .required(messages.required),
  title: string()
    .trim()
    .max(100, messages.max('названия', 100))
    .required(messages.required),
})

export type fieldsTypes = keyof typeof validationSchema

export const getValidationSchema = <
  T extends Partial<Record<fieldsTypes, T[keyof T]>>
>(
  ...fields: fieldsTypes[]
): ObjectSchema<T> => {
  const schema: Partial<typeof validationSchema> = {}

  fields.forEach(field => {
    schema[field] = validationSchema[field]
  })

  return object(schema) as ObjectSchema<T>
}
