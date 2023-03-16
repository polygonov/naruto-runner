import ClickSound from '../assets/sounds/ClickSound.mp3'
import StartGame from '../assets/sounds/StartGame.mp3'
import Yooo from '../assets/sounds/Yooo.mp3'
import NarutoKun from '../assets/sounds/NarutoKun.mp3'
import Jutsu from '../assets/sounds/Jutsu.mp3'

let prevSoundNum = 0

export default function randomClickSound() {
  const soundsList = [ClickSound, StartGame, Yooo, NarutoKun, Jutsu]
  const sound = generateRandomSound(soundsList)
  prevSoundNum = soundsList.indexOf(sound)
  new Audio(sound).play()
}

function generateRandomSound(arr: string[]): string {
  const newSoundsArr = arr.filter(function (el: string) {
    return el !== arr[prevSoundNum]
  })
  const range = newSoundsArr.length
  const randomNum = Math.floor(Math.random() * range)
  return newSoundsArr[randomNum]
}
