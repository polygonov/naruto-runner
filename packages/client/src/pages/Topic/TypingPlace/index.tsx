import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import './index.css'

export function TypingPlace() {
  return (
    <form className="typing-place">
      <Input name="text-message" className="full-width" />
      <Button text="" className="send-message-btn" type="submit" />
    </form>
  )
}
