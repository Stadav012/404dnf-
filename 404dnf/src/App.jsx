import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';

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
