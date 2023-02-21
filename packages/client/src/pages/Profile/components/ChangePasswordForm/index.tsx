import type { FC } from 'react'
import { memo } from 'react'
import { useFormik } from 'formik'
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
    const formik = useFormik<ChangePasswordFormFields>({
      initialValues: { oldPassword: '', newPassword: '', repeatPassword: '' },
      onSubmit: (values, actions) => {
        actions.setSubmitting(false)
        onCancel()
      },
      validationSchema: ChangePasswordFormSchema,
    })

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
              disabled={!formik.isValid || formik.isSubmitting}
            />
            <Button
              text={texts.secondaryButton}
              view="secondary"
              onClick={onCancel}
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
            isValid={!formik.errors[name]}
          />
        ))}
      </Form>
    )
  }
)
