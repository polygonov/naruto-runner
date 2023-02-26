import { useCallback, useState } from 'react'
import { ProfileForm } from './components/ProfileForm'
import { Button } from '../../components/Button'

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
      return (
        <Button
          text="Тут будет форма смены пароля, а пока вернемся назад..."
          view="secondary"
          onClick={changeToProfileForm}
        />
      )

    default:
      return <ProfileForm onSecondaryButtonClick={changeToPasswordForm} />
  }
}
