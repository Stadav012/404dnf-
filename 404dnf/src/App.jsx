import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';
import ImageUpload from './upload_image/ImageUpload';

import Statistics from './Statistics/Statistics';

import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="App">
        <Sidebar/>
        <Statistics />

        <Button variant="outline">Click me</Button>
        <ImageUpload />
    </div>
    </ThemeProvider>
  );
}

export default App;
