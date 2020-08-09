import { SensorValueData } from '../reducers/types'

interface ReformatDataInputType {
  array: SensorValueData[]
  sum(array: number[]): number
}

export function sum(array: Array<SensorValueData>): number {
  return array.reduce((accum, item) => {
    return accum + parseFloat(item.temperature)
  }, 0)
}

export function average(array: Array<SensorValueData>): number {
  return sum(array) / array.length
}

export function reformatData(input: ReformatDataInputType): number[] {
  const reformattedData = input.array.map((item) => {
    return parseFloat(item.temperature)
  })
  return reformattedData
}

// Calculate Standard Deviation
export function stddev(array: Array<SensorValueData>, avg: number): number {
  const diffSquaredSum = array.reduce((total, item) => {
    const diff = parseFloat(item.temperature) - avg
    return total + diff * diff
  }, 0)
  const avgSquaredDiff = diffSquaredSum / array.length
  return Math.sqrt(avgSquaredDiff)
}
