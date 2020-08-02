import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { RootStore } from '../../reducers'

const Statistic: React.FC = () => {
  const [avg, setAvg] = React.useState<number>(0)
  const [selectedZone, setZone] = React.useState<string>('zone 1')
  const [std, setStd] = React.useState<number>(0)
  const data = useSelector((state: RootStore) => {
    if (state.data && state.data[0]) return state.data
    return []
  })
  const zones = useSelector((state: RootStore) => {
    return state.sensorData
  })

  React.useEffect(() => {
    // Calculate Sum
    let sum = 0
    let avgSquaredDiff = 0
    const parsedData = data.map((datum) => {
      sum += parseFloat(datum[selectedZone])
      return parseFloat(datum[selectedZone])
    })
    setAvg(sum / data.length)

    // Calculate Standard Deviation
    const diffSquaredSum = parsedData.reduce((total, temperature) => {
      const diff = temperature - avg
      const diffSquared = diff * diff
      return diffSquared
    }, 0)
    avgSquaredDiff = diffSquaredSum / parsedData.length
    setStd(Math.sqrt(avgSquaredDiff))
  }, [data, avg, selectedZone])

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setZone(e.target.value)
  }

  if (!data) return <Spinner animation="border" role="status" />
  return (
    <div>
      <div className="input-group mb-3">
        <form>
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Options
            <select className="custom-select" defaultValue="zone 1" id="inputGroupSelect01" onChange={onChangeHandler}>
              {zones.map((zone) => {
                return (
                  <option key={zone.name} value={zone.name}>
                    {zone.name}
                  </option>
                )
              })}
            </select>
          </label>
        </form>
      </div>
      <div>
        Average:
        {avg.toFixed(1)}
      </div>
      <div>
        Std. Dev:
        {std.toFixed(1)}
      </div>
    </div>
  )
}

export default Statistic
