import { AlarmClock } from './components/clock'
import { AlarmContextProvider } from './context/alarm'

function App() {

  return (
    <div className='bg-slate-200'>
      <AlarmContextProvider>
        <AlarmClock />
      </AlarmContextProvider>
    </div>
  )
}

export default App
