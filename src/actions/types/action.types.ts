export interface DispatchType<T> {
  type: string
  payload: T
}

export type CreateUserDispatchType = {
  firebaseUID: string
  email: string
  firstName: string
  lastName: string
  home: Array<string>
}

export type GetUserDispatchType = {
  firebaseUID: string
  email: string
  firstName: string
  lastName: string
}

export type DataReceivedDispatchType = {
  sensorData: Array<SensorData>
  timeStamp: number
}

type SensorData = {
  name: string
  temperature: string
  humidity: string
}
