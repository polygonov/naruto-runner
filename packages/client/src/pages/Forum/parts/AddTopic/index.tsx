import './index.css'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import { useState } from 'react'

export function AddTopic() {
  const inputProps = {
    name: 'add-topic',
    placeholder: 'Введите название темы...',
    className: 'big-box-size',
  }
  const [isShowAddTopicForm, setIsShowAddTopicForm] = useState(false)
  const toggleShowAddTopicForm = () => {
    setIsShowAddTopicForm(!isShowAddTopicForm)
  }

  return (
    <div className="add-topic">
      {!isShowAddTopicForm && (
        <Button text="Создать новую тему" onClick={toggleShowAddTopicForm} className="add-topic__btn"/>
      )}
      {isShowAddTopicForm && (
        <form action="#" method="post" className="add-topic__form">
          <Input {...inputProps} />
          <Button text="Создать тему" onClick={toggleShowAddTopicForm} />
        </form>
      )}
    </div>
  )
}
