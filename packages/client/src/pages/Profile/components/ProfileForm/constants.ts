import { fieldsTypes, getValidationSchema } from '../../../../utils/validation'

export enum FormMode {
  Edit = 'Edit',
  Read = 'Read',
}

export const texts = {
  [FormMode.Edit]: {
    title: 'Изменение профиля',
    login: { label: 'Введите логин' },
    email: { label: 'Введите почту' },
    mainButton: 'Сохранить',
    secondaryButton: 'Отмена',
  },
  [FormMode.Read]: {
    title: '',
    login: { label: 'Логин' },
    email: { label: 'Почта' },
    mainButton: 'Изменить данные',
    secondaryButton: 'Изменить пароль',
  },
}

export type ProfileFormFields = {
  login: string
  email: string
  avatar: string | File
}

type FormInputNames = Extract<fieldsTypes, 'login' | 'email'>[]

export const formInputNames: FormInputNames = ['login', 'email']

export const ProfileFormSchema = getValidationSchema<ProfileFormFields>(
  ...formInputNames
)
