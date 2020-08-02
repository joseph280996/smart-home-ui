import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner, Alert, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import LineChart from '../../components/RTChart'
import { RootStore } from '../../reducers'
import { DashboardUseSelectorType } from './Dashboard.types'
import Statistic from '../Statistic'
import { DATA_RECEIVED } from '../../actions/types/variables'

const Dashboard: React.FC = () => {
  const auth = useSelector(
    (state: RootStore): DashboardUseSelectorType => {
      return { user: state.auth }
    },
  )
  console.log('Dashboard Rendering')
  const [ws, setWs] = React.useState<WebSocket | null>()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<Event | null>(null)
  const dispatch = useDispatch()
  const SetTemperatureFormik = useFormik({
    initialValues: {
      temperature: 0,
    },
    onSubmit: (value) => {
      console.log(value)
    },
  })

  React.useEffect(() => {
    const newWs = new WebSocket(`ws://localhost:5000/?uuid=${auth.user.uuid}`)
    newWs.onopen = () => {
      setWs(ws)
      setLoading(false)
      // eslint-disable-next-line no-console
      console.log('Connection to WS established')
    }
    newWs.onmessage = (message: MessageEvent) => {
      const dataJSON = JSON.parse(message.data)
      dispatch({
        type: DATA_RECEIVED,
        payload: dataJSON,
      })
    }
    newWs.onerror = (err: Event) => {
      setLoading(false)
      setError(err)
    }
  }, [ws, dispatch])

  if (loading) return <Spinner animation="border" role="status" />
  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <LineChart
        height={600}
        width={1200}
        yKey="temperature"
        xKey="timeStamp"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      />
      <div>
        <Statistic />
      </div>
      <div>
        <form onSubmit={SetTemperatureFormik.handleSubmit}>
          <input type="number" name="temperature" onChange={SetTemperatureFormik.handleChange} />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
