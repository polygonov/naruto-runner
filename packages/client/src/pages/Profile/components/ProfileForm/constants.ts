import { fieldsTypes, getValidationSchema } from '../../../../utils/validation'
import type { User } from '../../../../api/user/types'

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

export type ProfileFormFields = Pick<User, 'login' | 'email'> & {
  avatar: string | File | null
}

export const initialFormValues: ProfileFormFields = {
  login: '',
  email: '',
  avatar: null,
}

type FormInputNames = Extract<fieldsTypes, 'login' | 'email'>[]

export const formInputNames: FormInputNames = ['login', 'email']

export const ProfileFormSchema = getValidationSchema<ProfileFormFields>(
  ...formInputNames
)
