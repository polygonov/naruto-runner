import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { Form } from '../../../../components/Form'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { AvatarUpload } from '../AvatarUpload'
import {
  formInputNames,
  FormMode,
  ProfileFormFields,
  ProfileFormSchema,
  texts,
} from './constants'
import './index.css'

const user = {
  login: 'ivaivan',
  email: 'ivanovivan@gmail.com',
  avatar: '',
}

type ProfileFormProps = {
  onSecondaryButtonClick: () => void
}

export const ProfileForm: FC<ProfileFormProps> = memo(
  ({ onSecondaryButtonClick }) => {
    const [formMode, setFormMode] = useState<FormMode>(FormMode.Read)
    const isReadMode = formMode === FormMode.Read

    const formik = useFormik<ProfileFormFields>({
      initialValues: user,
      onSubmit: (values, actions) => {
        actions.setSubmitting(false)
        setFormMode(FormMode.Read)
      },
      validationSchema: ProfileFormSchema,
    })

    const onFileUpload = useCallback(
      (file: File) => {
        formik.setFieldValue('avatar', file)
      },
      [formik.setFieldValue]
    )

    const setEditMode = useCallback(() => setFormMode(FormMode.Edit), [])

    const resetForm = useCallback(() => {
      formik.resetForm()
      setFormMode(FormMode.Read)
    }, [formik.resetForm])

    return (
      <Form
        title={texts[formMode].title}
        name="profileForm"
        onSubmit={formik.handleSubmit}
        className="profile-form"
        formActions={
          <>
            {isReadMode && (
              <Button text={texts[formMode].mainButton} onClick={setEditMode} />
            )}
            {!isReadMode && (
              <Button
                text={texts[formMode].mainButton}
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              />
            )}
            <Button
              text={texts[formMode].secondaryButton}
              view="secondary"
              onClick={isReadMode ? onSecondaryButtonClick : resetForm}
              disabled={formik.isSubmitting}
            />
          </>
        }>
        <div className="profile-form__header">
          <AvatarUpload
            onUpload={onFileUpload}
            disabled={isReadMode || formik.isSubmitting}
            src={formik.values.avatar}
          />
          <h3 className="profile-form__username">{`@${user.login}`}</h3>
        </div>

        {formInputNames.map(name => (
          <Input
            {...formik.getFieldProps(name)}
            key={name}
            label={texts[formMode][name].label}
            readOnly={isReadMode}
            disabled={formik.isSubmitting}
            error={formik.errors[name]}
            isValid={!formik.errors[name]}
          />
        ))}
      </Form>
    )
  }
)
