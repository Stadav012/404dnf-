import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';
import ImageUpload from './upload_image/ImageUpload';

import Statistics from './Statistics/Statistics';

import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Statistics />

        <Button variant="ghost">Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
