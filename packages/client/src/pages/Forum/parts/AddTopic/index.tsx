import { useCallback, useState } from 'react'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { CreateTopicPayload } from '../../../../api/forum/types'
import { useFormik } from 'formik'
import { createTopic } from '../../../../store/forum/thunk'
import { selectUserData } from '../../../../store/user/selectors'
import { fieldsTypes, getValidationSchema } from '../../../../utils/validation'

type AddTopicFormFields = Pick<CreateTopicPayload, 'title'>

type FormInputNames = Extract<fieldsTypes, 'title'>

const formInputNames: FormInputNames = 'title'

const AddTopicFormSchema =
  getValidationSchema<AddTopicFormFields>(formInputNames)

export function AddTopic() {
  const inputProps = {
    name: 'add-topic',
    placeholder: 'Введите название темы...',
    className: 'big-box-size',
  }
  const [shouldShowAddTopicForm, setShouldShowAddTopicForm] = useState(false)
  const { user } = useAppSelector(selectUserData)

  const dispatch = useAppDispatch()
  const formik = useFormik<AddTopicFormFields>({
    initialValues: {
      title: '',
    },
    enableReinitialize: true,
    onSubmit: values => {
      const { title } = values
      dispatch(createTopic({ title, authorId: user!.id }))
    },
    validationSchema: AddTopicFormSchema,
  })

  const toggleShowAddTopicForm = useCallback(() => {
    setShouldShowAddTopicForm(!shouldShowAddTopicForm)
  }, [shouldShowAddTopicForm])

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
          <Input {...formik.getFieldProps('title')} />
          <Button text="Создать тему" type="submit" />
        </form>
      )}
    </div>
  )
}
