import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
  selectAvatarError,
  selectIsAvatarLoading,
  selectIsAvatarSuccess,
  selectIsLoading,
  selectIsSuccess,
  selectUser,
  selectUserError,
} from '../../../../store/user/selectors'
import { resetErrorsAndStatuses } from '../../../../store/user/slice'
import { changeUserAvatar, changeUserData } from '../../../../store/user/thunk'
import { Form } from '../../../../components/Form'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { AvatarUpload } from '../AvatarUpload'
import {
  formInputNames,
  FormMode,
  initialFormValues,
  ProfileFormFields,
  ProfileFormSchema,
  texts,
} from './constants'
import './index.css'

type ProfileFormProps = {
  onSecondaryButtonClick: () => void
}

export const ProfileForm: FC<ProfileFormProps> = memo(
  ({ onSecondaryButtonClick }) => {
    const [formMode, setFormMode] = useState<FormMode>(FormMode.Read)
    const isReadMode = formMode === FormMode.Read

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const isUserLoading = useAppSelector(selectIsLoading)
    const isAvatarLoading = useAppSelector(selectIsAvatarLoading)
    const isUserSuccess = useAppSelector(selectIsSuccess)
    const isAvatarSuccess = useAppSelector(selectIsAvatarSuccess)
    const avatarError = useAppSelector(selectAvatarError)
    const userError = useAppSelector(selectUserError)

    const formik = useFormik<ProfileFormFields>({
      initialValues: user ?? initialFormValues,
      enableReinitialize: true,
      onSubmit: values => {
        const { avatar, email, login } = values
        dispatch(changeUserData({ email, login }))

        if (avatar && typeof avatar !== 'string') {
          dispatch(changeUserAvatar({ avatar }))
        }
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
      dispatch(resetErrorsAndStatuses())
      setFormMode(FormMode.Read)
    }, [dispatch, formik.resetForm])

    useEffect(() => {
      if (
        ((isAvatarSuccess && !isUserLoading) ||
          (isUserSuccess && !isAvatarLoading)) &&
        !avatarError &&
        !userError
      ) {
        formik.setSubmitting(false)
        resetForm()
      }

      if (avatarError || userError) {
        formik.setSubmitting(false)
        // TODO показать тостъ
        alert(userError ?? avatarError)
      }
    }, [
      isAvatarSuccess,
      isAvatarLoading,
      isUserSuccess,
      isUserLoading,
      avatarError,
      userError,
      resetForm,
      formik.setSubmitting,
    ])

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
          <h3 className="profile-form__username">{`@${
            user?.login ?? 'login'
          }`}</h3>
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
