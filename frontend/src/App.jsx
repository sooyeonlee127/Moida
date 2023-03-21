import NavBar from './components/NavBar'
import DonationPage from './pages/DonationPage/index'
import './App.css'
import ReviewList from './pages/ReviewPage/components/ReviewList'



function App() {
  return (
    <div className="App">
      <NavBar/>
      <ReviewList/>
      <DonationPage/>
    </div>

  )
}

export default App;
