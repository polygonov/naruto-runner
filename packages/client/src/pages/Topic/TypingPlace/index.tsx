import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import './index.css'
import { CreateCommentPayload } from '../../../api/forum/types'
import { fieldsTypes, getValidationSchema } from '../../../utils/validation'
import { FC, FormEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useAppSelector } from '../../../store'
import { selectIsAuth } from '../../../store/auth/selectors'

export type commentFormFields = Pick<CreateCommentPayload, 'message'>
type FormInputNames = Extract<fieldsTypes, 'message'>

const formInputNames: FormInputNames = 'message'
const commentFormSchema = getValidationSchema<commentFormFields>(formInputNames)
type commentFormProps = {
  handleAddComment: (data: commentFormFields) => void
  serverError?: string | null
}

export const TypingPlace: FC<commentFormProps> = ({
  handleAddComment,
  serverError,
}) => {
  const isAuth = useAppSelector(selectIsAuth)

  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)
  const initialValues: commentFormFields = {
    message: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      await handleAddComment(values)
      helpers.resetForm()
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: shouldValidateOnChange,
    validationSchema: commentFormSchema,
  })

  useEffect(() => {
    if (serverError) {
      formik.setSubmitting(false)
      alert(serverError)
    }
  }, [serverError, formik.setSubmitting, formik])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!isAuth) {
      alert('Вы не авторизованы')
      return
    }

    if (!shouldValidateOnChange) {
      setShouldValidateOnChange(true)
    }
    return formik.handleSubmit()
  }

  return (
    <form className="typing-place" onSubmit={formik.handleSubmit}>
      <Input
        name="message"
        type="text"
        placeholder="Введите текст комментария"
        className="full-width"
        disabled={!isAuth}
        isValid={!formik.errors.message}
        error={formik.errors.message}
        onChange={formik.handleChange}
        value={formik.values.message}
      />
      <Button
        text=""
        className="send-message-btn"
        type="submit"
        disabled={!isAuth}
        withSound={true}
        onClick={submitHandler}
      />
    </form>
  )
}
