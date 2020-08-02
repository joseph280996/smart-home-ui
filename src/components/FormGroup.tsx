import React from 'react'
import { Form } from 'react-bootstrap'
import { FormGroupProps } from './types/FormGroup.types'

const FormGroup: React.FC<FormGroupProps> = (props: FormGroupProps) => {
  const { controlId, label, name, isValid, onChange, value, type, placeholder, error } = props

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        isValid={isValid}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {Boolean(error) && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  )
}
export default FormGroup
