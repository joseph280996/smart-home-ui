import { combineReducers } from 'redux'
import AuthReducers from './AuthReducers'
import { sensorValueData, sensorData } from './SensorValueReducer'
import { AuthReducerType, SensorValueType, ZonesData } from './types'

export const rootReducer = combineReducers({
  auth: AuthReducers,
  data: sensorValueData,
  sensorData,
})

export type RootStore = {
  auth: AuthReducerType
  data: ReadonlyArray<SensorValueType>
  sensorData: ReadonlyArray<ZonesData>
}
