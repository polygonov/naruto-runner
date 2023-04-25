import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../../../components/Button'
import { Input, InputProps } from '../../../../components/Input'
import './index.css'
import { CreateTopicPayload } from '../../../../api/forum/types'
import { useFormik } from 'formik'
import { fieldsTypes, getValidationSchema } from '../../../../utils/validation'

export type AddTopicFormFields = Pick<CreateTopicPayload, 'title'>

type FormInputNames = Extract<fieldsTypes, 'title'>

const formInputNames: FormInputNames = 'title'

const AddTopicFormSchema =
  getValidationSchema<AddTopicFormFields>(formInputNames)

type AddTopicFormProps = {
  handleAddTopic: (data: AddTopicFormFields) => void
  serverError?: string | null
}

export const AddTopic: FC<AddTopicFormProps> = ({
  handleAddTopic,
  serverError,
}) => {
  const [shouldShowAddTopicForm, setShouldShowAddTopicForm] = useState(false)
  const toggleShowAddTopicForm = useCallback(() => {
    setShouldShowAddTopicForm(!shouldShowAddTopicForm)
  }, [shouldShowAddTopicForm])

  const inputProps: InputProps = {
    name: 'title',
    placeholder: 'Введите название темы...',
    className: 'big-box-size',
    type: 'text',
  }

  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)
  const initialValues: AddTopicFormFields = {
    title: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      await handleAddTopic(values)
      helpers.resetForm()
      setShouldShowAddTopicForm(false)
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: shouldValidateOnChange,
    validationSchema: AddTopicFormSchema,
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
  }, [serverError, formik.setSubmitting, formik])

  return (
    <div className="add-topic">
      {!shouldShowAddTopicForm && (
        <Button
          text="Создать новую тему"
          onClick={toggleShowAddTopicForm}
          className="add-topic__btn"
        />
      )}
      {shouldShowAddTopicForm && (
        <form className="add-topic__form" onSubmit={formik.handleSubmit}>
          <Input
            {...inputProps}
            isValid={!formik.errors.title}
            error={formik.errors.title}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Button text="Создать тему" type="submit" onClick={submitHandler} />
        </form>
      )}
    </div>
  )
}
