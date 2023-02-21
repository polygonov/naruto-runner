import { Form } from '../../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useFormik } from 'formik'
import { FC, FormEvent, useState } from 'react'
import { RoutesNameList } from '../../../constant'
import { getValidationSchema } from '../../../utils/validation'
import { Link } from '../../Link'

type LoginFields = {
  login: string
  password: string
}

const LoginSchema = getValidationSchema<LoginFields>('login', 'password')

export const LoginForm: FC = props => {
  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)
  const initialValues: LoginFields = {
    login: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: shouldValidateOnChange,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        console.log(JSON.stringify(values))
        actions.setSubmitting(false)
      }, 1000)
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
      formActions={
        <>
          <Button
            text="Авторизация"
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit"
            onClick={submitHandler}
          />
          <Link
            text="Нет аккаунта?"
            view="ghost"
            href={RoutesNameList.Registration}
          />
        </>
      }
      {...props}>
      <Input
        name="login"
        placeholder="ivaivan"
        label="Введите ваш логин"
        isValid={!formik.errors.login}
        error={formik.errors.login}
        onChange={formik.handleChange}
        value={formik.values.login}
      />
      <Input
        name="password"
        label="Введите ваш пароль"
        placeholder="password"
        type="password"
        isValid={!formik.errors.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
    </Form>
  )
}
