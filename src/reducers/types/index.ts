export type AuthReducerType = {
  _id?: string
  uuid?: string
  email?: string
  firstName?: string
  lastName?: string
  isSignedIn?: boolean
}

export type SensorValueType = {
  [key: string]: string
}

export type ZonesData = {
  name: string
  sensorData: SensorValueData[]
}
export type SensorValueData = {
  temperature: string
  timeStamp: string
  humidity?: string
}
