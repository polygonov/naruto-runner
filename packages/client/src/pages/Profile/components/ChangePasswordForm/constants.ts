import { fieldsTypes, getValidationSchema } from '../../../../utils/validation'

export type ChangePasswordFormFields = {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}

export const texts = {
  title: 'Изменение пароля',
  oldPassword: { label: 'Введите старый пароль' },
  newPassword: { label: 'Введите новый пароль' },
  repeatPassword: { label: 'Повторите новый пароль' },
  mainButton: 'Сохранить',
  secondaryButton: 'Отмена',
}

type FormInputNames = Extract<
  fieldsTypes,
  'oldPassword' | 'newPassword' | 'repeatPassword'
>[]

export const formInputNames: FormInputNames = [
  'oldPassword',
  'newPassword',
  'repeatPassword',
]

export const ChangePasswordFormSchema =
  getValidationSchema<ChangePasswordFormFields>(...formInputNames)
