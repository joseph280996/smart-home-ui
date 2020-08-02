export interface FormGroupProps {
  controlId: string
  label: string
  name: string
  isValid: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  type: string
  placeholder: string
  error?: string
}
