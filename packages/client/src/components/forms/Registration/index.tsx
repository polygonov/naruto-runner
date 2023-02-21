import { Form } from '../../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useFormik } from 'formik'
import { FC, FormEvent, useState } from 'react'
import { RoutesNameList } from '../../../constant'
import { getValidationSchema } from '../../../utils/validation'
import { Link } from '../../Link'

type RegistrationFields = {
  login: string
  email: string
  newPassword: string
  repeatPassword: string
}

const RegistrationSchema = getValidationSchema<RegistrationFields>(
  'login',
  'email',
  'newPassword',
  'repeatPassword'
)

export const RegistrationForm: FC = props => {
  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)
  const initialValues: RegistrationFields = {
    login: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
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
        name="email"
        placeholder="ivanovivan@gmail.com"
        label="Введите вашу почту"
        isValid={!formik.errors.email}
        error={formik.errors.email}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Input
        name="newPassword"
        placeholder="password"
        label="Введите ваш пароль"
        type="password"
        isValid={!formik.errors.newPassword}
        error={formik.errors.newPassword}
        onChange={formik.handleChange}
        value={formik.values.newPassword}
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
