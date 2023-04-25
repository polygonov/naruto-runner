import { Input } from '../../../../components/Input'
import { useAppDispatch } from '../../../../store'
import { requestTopics } from '../../../../store/forum/thunk'

export function SearchTopic() {
  const dispatch = useAppDispatch()

  const handleSearch = (value: string) => {
    dispatch(
      requestTopics({
        ...(value && { title: value }),
      })
    )
  }

  return (
    <Input
      name="search-topic"
      className="big-box-size"
      placeholder="Поиск..."
      onBlur={e => handleSearch(e.target.value)}
    />
  )
}
