import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useSelector } from 'react-redux'
import { LineChartProps } from './types/RTChart.types'
import { RootStore } from '../reducers'
import { SensorValueType } from '../reducers/types'

function twentyElemMaintainer(arr: ReadonlyArray<SensorValueType>) {
  const subArr = arr.slice(arr.length - 21)
  if (typeof subArr === 'object') {
    console.log(typeof subArr)
    console.log(subArr)
    return subArr
  }
  return subArr
}

function colorPicker(zoneName: string) {
  switch (zoneName) {
    case 'zone 1':
      return '#fc6879'
    case 'zone 2':
      return '#28a4a8'
    default:
      return '#000000'
  }
}

const RTChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const data = useSelector((state: RootStore) => {
    if (state.data && state.data.length > 20) {
      const res = twentyElemMaintainer(state.data)
      console.log(res)
      return res
    }
    return state.data
  })
  const zoneData = useSelector((state: RootStore) => {
    return state.sensorData
  })
  const { height, width, margin } = props

  return (
    <LineChart width={width} height={height} data={data} margin={margin}>
      {zoneData.map((zone, idx) => {
        return <Line key={zone.name} type="monotone" dataKey={zone.name} stroke={colorPicker(zone.name)} />
      })}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="timeStamp" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  )
}

export default RTChart
