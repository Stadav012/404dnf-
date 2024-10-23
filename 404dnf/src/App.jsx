import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';

import Statistics from './Statistics/Statistics';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Statistics />
    </div>
  );
}

export default App;
