import { FC, FormEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Form } from '../../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { YandexOAuthButton } from '../../YandexOAuthButton'
import { RoutesNameList } from '../../../constant'
import { getValidationSchema } from '../../../utils/validation'
import type { AuthPayload } from '../../../api/auth/types'

type LoginFields = AuthPayload

const LoginSchema = getValidationSchema<LoginFields>('login', 'password')

type LoginFormProps = {
  handleAuth: (data: AuthPayload) => void
  serverError?: string | null
}

export const LoginForm: FC<LoginFormProps> = ({ handleAuth, serverError }) => {
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
    onSubmit: handleAuth,
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!shouldValidateOnChange) {
      setShouldValidateOnChange(true)
    }
    return formik.handleSubmit()
  }

  useEffect(() => {
    if (serverError) {
      formik.setSubmitting(false)
      alert(serverError)
    }
  }, [serverError, formik.setSubmitting])

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
          <YandexOAuthButton />
        </>
      }>
      <Input
        name="login"
        placeholder="LOGIN"
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
