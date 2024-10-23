import './App.css';

import Statistics from './Statistics/Statistics';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Statistics />

      <Button variant="ghost">Click me</Button>
    </div>
  );
}

export default App;
