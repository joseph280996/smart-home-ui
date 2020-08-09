import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { RootStore } from '../reducers'
import { stddev, average } from '../utils/Math'
import { StatisticProps } from './types/Statistic.types'

export default function Statistic(props: StatisticProps): ReactElement {
  const { selectedZone } = props
  const [avg, setAvg] = React.useState<number>(0)
  const [std, setStd] = React.useState<number>(0)
  const data = useSelector((state: RootStore) => {
    if (state.sensorData && state.sensorData.length !== 0) return state.sensorData
    return []
  })
  const [zone1, zone2] = data
  React.useEffect(() => {
    let selectedZoneData
    if (zone1 && zone2) {
      switch (selectedZone) {
        case 'zone 2':
          selectedZoneData = zone1.sensorData
          break
        case 'zone 1':
        default:
          selectedZoneData = zone2.sensorData
      }
    }
    if (selectedZoneData) {
      const newAvg = average(selectedZoneData)
      setAvg(newAvg)
      setStd(stddev(selectedZoneData, newAvg))
    }
  }, [data, avg, selectedZone, zone1, zone2])

  if (!data || data.length === 0) return <Spinner animation="border" role="status" />
  return (
    <div>
      <div>
        Average:
        <span className="ml-1">{avg.toFixed(1)}</span>
      </div>
      <div>
        Std. Dev:
        <span className="ml-1">{std.toFixed(1)}</span>
      </div>
    </div>
  )
}
