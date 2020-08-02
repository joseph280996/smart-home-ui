export interface SignUpFormValues {
  email: string
  password: string
  confirmPass: string
  zoneId: string
  home: Array<string>
  firstName: string
  lastName: string
}

export interface SignUpFormError {
  email?: string
  password?: string
  confirmPass?: string
  zoneId?: string
  firstName?: string
  lastName?: string
}
