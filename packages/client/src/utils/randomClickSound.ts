import ClickSound from '../assets/sounds/ClickSound.mp3'
import StartGame from '../assets/sounds/StartGame.mp3'
import Yooo from '../assets/sounds/Yooo.mp3'
import NarutoKun from '../assets/sounds/NarutoKun.mp3'
import Jutsu from '../assets/sounds/Jutsu.mp3'

export default function randomClickSound() {
  const soundsList = [ClickSound, StartGame, Yooo, NarutoKun, Jutsu]
  const sound = soundsList[Math.floor(Math.random() * soundsList.length)]
  new Audio(sound).play()
}
