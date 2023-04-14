import { useCallback, useState } from 'react'
import { ProfileForm } from './components/ProfileForm'
import { ChangePasswordForm } from './components/ChangePasswordForm'

enum FormType {
  Profile = 'Profile',
  ChangePassword = 'ChangePassword',
}

export function Profile() {
  const [formType, setFormType] = useState<FormType>(FormType.Profile)

  const changeToPasswordForm = useCallback(
    () => setFormType(FormType.ChangePassword),
    []
  )
  const changeToProfileForm = useCallback(
    () => setFormType(FormType.Profile),
    []
  )

  switch (formType) {
    case FormType.ChangePassword:
      return <ChangePasswordForm onCancel={changeToProfileForm} />

    default:
      return <ProfileForm onSecondaryButtonClick={changeToPasswordForm} />
  }
}
