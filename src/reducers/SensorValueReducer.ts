import * as types from '../actions/types/variables'
import { DispatchType, DataReceivedDispatchType } from '../actions/types/action.types'
import { SensorValueType, SensorDataType } from './types'

export const sensorData = (
  state: Array<SensorDataType> = [],
  action: DispatchType<DataReceivedDispatchType>,
): ReadonlyArray<SensorDataType> => {
  switch (action.type) {
    case types.DATA_RECEIVED: {
      const newDatum = action.payload.sensorData.map((zone, idx) => {
        return {
          name: zone.name,
          sensorData: state[idx]
            ? [
                ...state[idx].sensorData,
                {
                  timeStamp: new Date(action.payload.timeStamp * 1000).toLocaleTimeString('en-US'),
                  temperature: zone.temperature,
                  humidity: zone.humidity,
                },
              ]
            : [
                {
                  timeStamp: new Date(action.payload.timeStamp * 1000).toLocaleTimeString('en-US'),
                  temperature: zone.temperature,
                  humidity: zone.humidity,
                },
              ],
        }
      })
      return newDatum
    }

    default:
      return state
  }
}
export const sensorValueData = (
  state: Array<SensorValueType> = [],
  action: DispatchType<DataReceivedDispatchType>,
): ReadonlyArray<SensorValueType> => {
  switch (action.type) {
    case types.DATA_RECEIVED: {
      const newDatum = action.payload.sensorData.reduce((res, zone, idx) => {
        return {
          ...res,
          timeStamp: new Date(action.payload.timeStamp * 1000).toLocaleTimeString('en-US'),
          [zone.name]: zone.temperature,
        }
      }, {})
      return [...state, newDatum]
    }

    default:
      return state
  }
}
