export interface LineChartProps {
  xKey: string
  yKey: string
  height: number
  width: number
  margin: MarginObject
}

type MarginObject = {
  top: number
  bottom: number
  left: number
  right: number
}
export interface SensorDataObject {
  temperature?: string
  humidity?: string
  timeStamp?: number
}
