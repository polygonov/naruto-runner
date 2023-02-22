import './index.css'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

export function TypingPlace() {
  return (
    <form className="typing-place" action="#">
      <Input
        name="text-message"
        className="full-width"
        onClick={e => e.preventDefault}
      />
      <Button text="" className="send-message-btn" type="submit" />
    </form>
  )
}
