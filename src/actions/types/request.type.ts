export interface Authentication {
  email: string
}

export interface SignUp extends Authentication {
  password: string
  firstName: string
  lastName: string
  home: Array<string>
}

export interface SignIn extends Authentication {
  password: string
}
