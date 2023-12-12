import RoutesApp from "./routes/RoutesApp"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
  )
}

export default App
