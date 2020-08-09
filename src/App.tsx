import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HomePage />
      </BrowserRouter>
    </div>
  )
}

export default App
