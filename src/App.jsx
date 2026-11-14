import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { useEffect } from 'react'
import { fetchWeather } from './store/actions/weatherActions'
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'


const App = () => {
  const state = useSelector((state)=>state)
  console.log(state);
  return (
    <div className='p-10 flex flex-col items-center'>
      <Search/>
      <CurrentWeather/>
      <ForecastWeather/>
    </div>
  )
}

export default App
