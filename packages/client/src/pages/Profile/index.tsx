import { AvatarUpload } from './components/AvatarUpload'

export function Profile() {
  return (
    <>
      <AvatarUpload onUpload={console.log} />
    </>
  )
}
