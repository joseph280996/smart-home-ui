import React, { createContext, ReactNode, ReactElement } from 'react'

const WebSocketContext = createContext<WebSocket | null>(null)
const SetWebSocketContext = createContext<null | React.Dispatch<React.SetStateAction<WebSocket | null>>>(null)
type WebSocketType = {
  children: ReactNode
}

type WebSocketContextType = {
  ws: WebSocket | null
  setWs: React.Dispatch<React.SetStateAction<WebSocket | null>>
}
function WebSocketProvider({ children }: WebSocketType): ReactElement {
  const [socket, setSocket] = React.useState<WebSocket | null>(null)

  return (
    <WebSocketContext.Provider value={socket}>
      <SetWebSocketContext.Provider value={setSocket}>{children}</SetWebSocketContext.Provider>
    </WebSocketContext.Provider>
  )
}
function useWebSocketState(): WebSocketContextType {
  const ws = React.useContext(WebSocketContext)
  const setWs = React.useContext(SetWebSocketContext)
  if (ws === undefined) {
    throw new Error('useWebSocketState must be used within a CountProvider')
  }
  if (setWs === null) {
    throw new Error('useSetWebSocketState must be used within a CountProvider')
  }
  return { ws, setWs }
}
export { useWebSocketState, WebSocketProvider }
