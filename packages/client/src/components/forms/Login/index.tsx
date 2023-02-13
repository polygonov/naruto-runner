import { Form } from '../../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useFormik } from 'formik'
import { object, string, ObjectSchema } from 'yup'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesNameList } from '../../../constant'

type LoginFields = {
  login: string
  password: string
}

const LoginSchema: ObjectSchema<LoginFields> = object().shape({
  login: string()
    .min(5, 'Минимальное кол-во символов: 5')
    .max(50, 'Максимальное кол-во символов: 50')
    .required('Поле обязательно для заполнения'),
  password: string()
    .min(6, 'Минимальное кол-во символов: 5')
    .max(50, 'Максимальное кол-во символов: 50')
    .required('Поле обязательно для заполнения'),
})

export const LoginForm: FC = props => {
  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)
  const navigate = useNavigate()
  const initialValues: LoginFields = {
    login: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: shouldValidateOnChange,
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      console.log(JSON.stringify(values))
      setTimeout(() => actions.setSubmitting(false), 1000)
    },
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!shouldValidateOnChange) {
      setShouldValidateOnChange(true)
    }
    return formik.handleSubmit()
  }

  return (
    <Form
      onSubmit={formik.handleSubmit}
      title="Вход"
      name="login-form"
      formItems={
        <>
          <Input
            name="login"
            label="Введите ваш логин"
            isValid={!formik.errors.login}
            error={formik.errors.login}
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <Input
            name="password"
            label="Введите ваш пароль"
            type="password"
            isValid={!formik.errors.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </>
      }
      formActions={
        <>
          <Button
            text="Авторизация"
            disabled={formik.isSubmitting || !formik.isValid}
            onClick={submitHandler}
            type="submit"
          />
          <Button
            text="Нет аккаунта?"
            view="ghost"
            onClick={() => navigate(RoutesNameList.Registration)}
          />
        </>
      }
      {...props}
    />
  )
}
