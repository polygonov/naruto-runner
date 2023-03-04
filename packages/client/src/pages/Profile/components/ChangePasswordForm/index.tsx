import type { FC } from 'react'
import { memo, useCallback, useEffect } from 'react'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { changeUserPassword } from '../../../../store/user/thunk'
import {
  selectIsSuccess,
  selectUserError,
} from '../../../../store/user/selectors'
import { resetErrorsAndStatuses } from '../../../../store/user/slice'
import { Form } from '../../../../components/Form'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import {
  ChangePasswordFormFields,
  ChangePasswordFormSchema,
  formInputNames,
  texts,
} from './constants'

type ChangePasswordFormProps = {
  onCancel: () => void
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = memo(
  ({ onCancel }) => {
    const dispatch = useAppDispatch()
    const isSuccess = useAppSelector(selectIsSuccess)
    const error = useAppSelector(selectUserError)

    const formik = useFormik<ChangePasswordFormFields>({
      initialValues: { oldPassword: '', newPassword: '', repeatPassword: '' },
      onSubmit: ({ oldPassword, newPassword }) =>
        dispatch(changeUserPassword({ oldPassword, newPassword })),
      validationSchema: ChangePasswordFormSchema,
    })

    const isAllValuesSet =
      Object.keys(formik.values).length === Object.keys(formik.touched).length

    const cancel = useCallback(() => {
      dispatch(resetErrorsAndStatuses())
      onCancel()
    }, [onCancel, dispatch])

    useEffect(() => {
      formik.setSubmitting(false)

      if (isSuccess && !error) {
        cancel()
      }

      if (error) {
        // TODO показать тостъ
        alert(error)
      }
    }, [isSuccess, error, formik.setSubmitting, cancel])

    return (
      <Form
        title={texts.title}
        name="changePasswordForm"
        onSubmit={formik.handleSubmit}
        formActions={
          <>
            <Button
              text={texts.mainButton}
              type="submit"
              disabled={
                (isAllValuesSet && !formik.isValid) || formik.isSubmitting
              }
            />
            <Button
              text={texts.secondaryButton}
              view="secondary"
              onClick={cancel}
              disabled={formik.isSubmitting}
            />
          </>
        }>
        {formInputNames.map(name => (
          <Input
            {...formik.getFieldProps(name)}
            key={name}
            type="password"
            label={texts[name].label}
            disabled={formik.isSubmitting}
            error={formik.errors[name]}
            isValid={!formik.touched[name] || !formik.errors[name]}
          />
        ))}
      </Form>
    )
  }
)
