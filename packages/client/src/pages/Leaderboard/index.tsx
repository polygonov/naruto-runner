import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectUserData } from '../../store/user/selectors'
import { selectLeaderboardData } from '../../store/leaderboard/selectors'
import { requestLeaderboard } from '../../store/leaderboard/thunk'
import { LeaderboardTable } from '../../components/Leaderboard'

export function Leaderboard() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUserData)
  const { leaderboardList, leaderboardError } = useAppSelector(
    selectLeaderboardData
  )

  const userRecord = useMemo(() => {
    return leaderboardList.find(player => player.id === user?.id)
  }, [leaderboardList, user])

  useEffect(() => {
    dispatch(requestLeaderboard())
  }, [dispatch])

  useEffect(() => {
    if (leaderboardError) {
      // TODO показать тостъ
      alert(leaderboardError)
    }
  }, [leaderboardError])

  return (
    <LeaderboardTable user={userRecord} leaderboardList={leaderboardList} />
  )
}
