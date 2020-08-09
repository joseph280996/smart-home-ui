import React, { useState, ChangeEvent } from 'react'
import { Button, Spinner, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import LineChart from '../../components/RTChart'
import Statistic from '../../components/Statistic'
import { DashboardUseSelectorType } from './Dashboard.types'
import { RootStore } from '../../reducers'
import { useWebSocketState } from '../../contexts/WebSocketContext'
import { DATA_RECEIVED } from '../../actions/types/variables'

const Dashboard: React.FC = () => {
  const { ws, setWs } = useWebSocketState()
  const [selectedZone, setSelected] = useState<string>('zone 1')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const dispatch = useDispatch()
  const SetTemperatureFormik = useFormik({
    initialValues: { temperature: 0 },
    onSubmit: (value) => {
      SetTemperatureFormik.resetForm()
      // eslint-disable-next-line no-console
      console.log(`Sending: temperature: ${JSON.stringify({ zone: selectedZone, temperature: value.temperature })}`)
      if (ws) ws.send(`temperature:${JSON.stringify({ zone: selectedZone, temperature: value.temperature })}`)
    },
  })
  const auth = useSelector(
    (state: RootStore): DashboardUseSelectorType => {
      return { user: state.auth }
    },
  )
  const zones = useSelector((state: RootStore) => {
    return state.sensorData
  })
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
  }
  React.useEffect(() => {
    if (!ws) {
      const newWs = new WebSocket(`ws://localhost:5000/?uuid=${auth.user.uuid}`)
      newWs.onopen = () => {
        setWs(newWs)
        // eslint-disable-next-line no-console
        console.log('Connection to WS established')
      }
      newWs.onmessage = (message: MessageEvent) => {
        setLoading(false)
        const dataJSON = JSON.parse(message.data)
        dispatch({
          type: DATA_RECEIVED,
          payload: dataJSON,
        })
      }
      newWs.onerror = (err: Event) => {
        setError(true)
        // eslint-disable-next-line no-console
        console.error(err)
      }
      newWs.onclose = () => {
        // eslint-disable-next-line no-console
        console.log('closing')
      }
    }
    return function cleanup() {
      if (ws) ws.close()
    }
  }, [dispatch, setWs, ws, auth.user.uuid])
  if (loading) return <Spinner animation="border" role="status" />
  if (error) return <Alert variant="danger">Cannot connect with server. Please refresh the page.</Alert>
  return (
    <div>
      <LineChart
        height={600}
        width={1200}
        yKey="temperature"
        xKey="timeStamp"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      />
      <div className="ml-5">
        <div className="input-group mb-3">
          <form>
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Options
              <select
                className="custom-select ml-2"
                defaultValue="zone 1"
                id="inputGroupSelect01"
                onChange={onChangeHandler}
              >
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
        <Statistic selectedZone={selectedZone} />
        <form onSubmit={SetTemperatureFormik.handleSubmit}>
          <input
            type="number"
            name="temperature"
            value={SetTemperatureFormik.values.temperature}
            onChange={SetTemperatureFormik.handleChange}
          />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
