import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { AuthWrapperProps } from './types/MiddleCard.types'

const MiddleCard: React.FC<AuthWrapperProps> = (props: AuthWrapperProps) => {
  const { title, children, width } = props
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className="border rounded-lg p-3" xs={width}>
          <div className="d-flex justify-content-center">{title}</div>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default MiddleCard
