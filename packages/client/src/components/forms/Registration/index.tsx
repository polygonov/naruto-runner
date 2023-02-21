import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Form } from '../../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { RoutesNameList } from '../../../constant'
import { getValidationSchema } from '../../../utils/validation'
import type { RegisterPayload } from '../../../api/auth/types'

type RegistrationFields = {
  login: string
  email: string
  password: string
  repeatPassword: string
}

const RegistrationSchema = getValidationSchema<RegistrationFields>(
  'login',
  'email',
  'password',
  'repeatPassword'
)

type RegistrationFormProps = {
  handleRegister: (data: RegisterPayload) => Promise<void>
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  handleRegister,
}) => {
  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)

  const initialValues: RegistrationFields = {
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    validateOnBlur: false,
    validateOnChange: shouldValidateOnChange,
    onSubmit: async (values, actions) => {
      try {
        await handleRegister(values)
        actions.setSubmitting(false)
      } catch (err) {
        // TODO показать тост
        alert(err)
      }
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
      title="Регистрация"
      name="registration-form"
      formActions={
        <>
          <Button
            text="Зарегистрироваться"
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit"
            onClick={submitHandler}
          />
          <Link text="Войти" view="ghost" href={RoutesNameList.Login} />
        </>
      }>
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
        name="email"
        placeholder="ivanovivan@gmail.com"
        label="Введите вашу почту"
        isValid={!formik.errors.email}
        error={formik.errors.email}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Input
        name="password"
        placeholder="password"
        label="Введите ваш пароль"
        type="password"
        isValid={!formik.errors.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Input
        name="repeatPassword"
        placeholder="repeat password"
        label="Подтвердите пароль"
        type="password"
        isValid={!formik.errors.repeatPassword}
        error={formik.errors.repeatPassword}
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
      />
    </Form>
  )
}
