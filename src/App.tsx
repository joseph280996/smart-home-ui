import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </div>
  )
}

export default App
