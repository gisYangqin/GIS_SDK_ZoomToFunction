
// 传入两个数，返回一个位于两个数之间的随机数
function getRandomByRange (min:number, max:number):number {
  const minValue = max > min ? min : max
  const randomNumber = Math.random() * Math.abs(max - min) + minValue
  return randomNumber
}

// 传入一个枚举，随机返回其中一个枚举值
function randomEnum<T> (anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum)
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

export { getRandomByRange, randomEnum }
