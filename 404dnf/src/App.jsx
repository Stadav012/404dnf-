import './App.css';
"use client";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from './sidebar/Sidebar';
import Video from './Video/video';
import Statistics from './Statistics/Statistics';
import Section from './Sections/Sections';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy, IconTrophy, IconBox } from "@tabler/icons-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { SparklesCore } from "@/components/ui/sparkles";




<div className="">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>

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
          <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[30rem] gap-y-44 p-5">
           
            {/* Video Item */}
            <BentoGridItem
              header={
                <div>
                 <Spotlight
                  className="-top-40 left-0 md:left-60 md:-top-20"
                  fill="#F58327"
                />
                  <Video />
                  <div>
                    <h1 className="md:text-4xl text-2xl lg:text-4xl font-bold text-center text-white relative z-20">
                      Welcome Rajesh
                    </h1>
                    <div className="w-[40rem] h-30 relative">
                      {/* Gradients */}
                      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              
                      {/* Core component */}
                      <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                      />
              
                      {/* Radial Gradient to prevent sharp edges */}
                      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>
                  </div>
                </div>
                
              }
              className="md:col-span-5 h-[40rem]"
              />
            
            {/* Combined Awards and Smart Locker Access Item */}
            <BentoGridItem
              className="md:col-span-5 h-[35rem]"
              header={
                <div className="flex flex-col md:flex-row gap-4 h-full">
                  
                  {/* Awards Section */}
                  <div className="flex-1">
                    <BentoGridItem
                      title="Awards"
                      description="Achievements and recognitions."
                      header={
                        <HeroHighlight>
                          <Section heading="Awards" pills={awards} />
                        </HeroHighlight>
                      }
                      className="h-full"
                      icon={<IconTrophy className="h-4 w-4 text-neutral-500" />}
                    />
                  </div>

                  {/* Smart Locker Access Section */}
                  <div className="flex-1">
                    <BentoGridItem
                      title="Smart Locker Access"
                      description="Access to smart locker details."
                      header={
                        <HeroHighlight>
                          <Section heading="Smart Locker" pills={lockers} />
                        </HeroHighlight>
                      }
                      className="h-full"
                      icon={<IconBox className="h-4 w-4 text-neutral-500" />}
                    />
                  </div>

                </div>
              }
            />

                        {/* Statistics Overview Item */}
          <BentoGridItem
            title="Statistics Overview"
            description="Statistics of items found and lost."
              header={
                <div>
                  <div className="absolute">
                    <SparklesCore
                      id="tsparticlesfullpage"
                      background="transparent"
                      minSize={0.6}
                      maxSize={1.4}
                      particleDensity={100}
                      className="w-full h-full"
                      particleColor="#FFFFFF"
                    />
                  </div>
                  <div className='stats'>
                    <Statistics title="Total Items Found" stats="100" />
                    <Statistics title="Total Items Lost" stats="30" />
                    </div>
                </div>
            }
            className="md:col-span-5 h-[18rem]"
            icon={<IconTrophy className="h-4 w-4 text-neutral-500" />}
            />
          </BentoGrid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;