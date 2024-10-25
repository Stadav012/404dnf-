import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';
import ImageUpload from './upload_image/ImageUpload';

import Statistics from './Statistics/Statistics';

import { ThemeProvider } from "@/components/theme-provider"

import Section from './Sections/Sections';

function App() {
  const awards = [
    { label: 'Top Contributor', description: 'You have helped 100 users find their lost items.' },
    { label: 'Best Finder', description: 'You have found 50 lost items.' }
  ];

  const lockers = [
    { label: 'View available lockers', description: 'Locker number: 12' },
    { label: 'View available lockers', description: 'Locker number: 12' }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Sidebar />
        
        <div className='content'>
          <Button variant="outline">Click me</Button>
          <ImageUpload />
        <Statistics />
        
        <div className='sections'>
          <Section heading="Awards" pills={awards} />
          <Section heading="Smart Locker" pills={lockers} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;