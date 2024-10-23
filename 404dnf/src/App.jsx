import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';
import ImageUpload from './upload_image/ImageUpload';

import Statistics from './Statistics/Statistics';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Statistics />
      <ImageUpload/>

      <Button variant="ghost">Click me</Button>
    </div>
  );
}

export default App;
