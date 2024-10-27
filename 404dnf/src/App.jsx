import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from './sidebar/Sidebar';
import Video from './Video/video';
import Statistics from './Statistics/Statistics';
import Section from './Sections/Sections';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy, IconTrophy, IconBox } from "@tabler/icons-react";

function App() {
  const awards = [
    { label: 'Top Contributor', description: 'You have helped 100 users find their lost items.', icon: 'trophy' },
    { label: 'Best Finder', description: 'You have found 50 lost items.', icon: 'medal' }
  ];

  const lockers = [
    { label: 'View available lockers', description: 'Locker number: 12', icon: 'box' },
    { label: 'View available lockers', description: 'Locker number: 12', icon: 'compass' }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Sidebar />
        
        <div className='content'>
          <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[30rem] gap-y-24 p-5">
            {/* Video Item */}
            <BentoGridItem
              title="Item Overview Video"
              description="Watch an overview of all features."
              header={<Video />}
              className="md:col-span-2 h-[35rem]"
              icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
            />

            {/* Awards Item */}
            <BentoGridItem
              title="Awards"
              description="Achievements and recognitions."
              header={<Section heading="Awards" pills={awards} />}
              className="md:col-span-1 h-[35rem]"
              icon={<IconTrophy className="h-4 w-4 text-neutral-500" />}
            />

            {/* Smart Locker Access Item */}
            <BentoGridItem
              title="Smart Locker Access"
              description="Access to smart locker details."
              header={<Section heading="Smart Locker" pills={lockers} />}
              className="md:col-span-1 h-[35rem]"
              icon={<IconBox className="h-4 w-4 text-neutral-500" />}
            />
            
          {/* Statistics Overview Item */}
          <BentoGridItem
            title="Statistics Overview"
            description="Statistics of items found and lost."
            header={
              <div className='stats'>
                <Statistics title="Total Items Found" stats="100" />
                <Statistics title="Total Items Lost" stats="30" />
              </div>
            }
            className="md:col-span-2 h-[35rem]"
            icon={<IconTrophy className="h-4 w-4 text-neutral-500" />}
            />
            </BentoGrid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;