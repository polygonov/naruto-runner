import ClickSound from '../assets/sounds/ClickSound.mp3'
import StartGame from '../assets/sounds/StartGame.mp3'
import Yooo from '../assets/sounds/Yooo.mp3'
import NarutoKun from '../assets/sounds/NarutoKun.mp3'
import Jutsu from '../assets/sounds/Jutsu.mp3'

let prevSoundNum = 0

export default function randomClickSound() {
  const soundsList = [ClickSound, StartGame, Yooo, NarutoKun, Jutsu]
  const numberOfSound = generateNumOfSound(soundsList.length)
  prevSoundNum = numberOfSound
  const sound = soundsList[numberOfSound]
  new Audio(sound).play()
}

function generateNumOfSound(range: number): number {
  const randomNum = Math.floor(Math.random() * range)
  return prevSoundNum === randomNum ? generateNumOfSound(range) : randomNum
}
