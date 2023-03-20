import SignupPage  from './pages/SignupPage/index'
import LoginPage  from './pages/LoginPage/index'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SignupPage/>
      <LoginPage/>
    </div>
  )
}

export default App
