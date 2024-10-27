import './App.css';
import { Button } from "@/components/ui/button"
import Sidebar from './sidebar/Sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from "@/components/theme-provider"

import Section from './Sections/Sections';

import Statistics from './Statistics/Statistics';

// import { LampVideo } from '@/components/ui/lamp';

import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

import Video from './Video/video';

import { LampContainer } from "@/components/ui/lamp";





function App() {
  const awards = [
    { label: 'Top Contributor', description: 'You have helped 100 users find their lost items.', icon: 'trophy' },
    { label: 'Best Finder', description: 'You have found 50 lost items.', icon: 'medal' }
  ];

  const lockers = [
    { label: 'View available lockers', description: 'Locker number: 12', icon: 'bars' },
    { label: 'View available lockers', description: 'Locker number: 12', icon: 'compass' }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Sidebar />
        
        <div className='content'>
        {/* <ImageUpload/> */}       {/* I believe this was meant for testing, I removed to run a few tests*/}
          <Video />
            {/* <LampVideo className="lamp-video"/> */}

          <div className='stats'>
            <Statistics title="Total Items Found" stats="100" />
            <Statistics title="Total Items Lost" stats="30" />
          </div>

  
          <div className='sections z-20'>
            <Section heading="Awards" pills={awards} />
              <Section heading="Smart Locker" pills={lockers} />
          </div>
          

          
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
