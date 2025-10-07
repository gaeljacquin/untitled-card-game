// Load Google Fonts
import '@fontsource/saira/400.css';

import { AnimatePresence } from 'motion/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Route, Routes, useLocation } from 'react-router-dom';

import MaintenanceModeBanner from '@/components/maintenance-mode-banner';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { isMaintenanceMode } from '@/utils/maintenance-mode';
import ABMode from '@/views/ab-mode';
import Credits from '@/views/credits';
import GameModeSelect from '@/views/game-mode-select';
// Pages
import Home from '@/views/home';
import HowToPlay from '@/views/how-to-play';
import NotFound from '@/views/not-found';
import Settings from '@/views/settings';

function App() {
  const location = useLocation();

  return (
    <div className={cn('font-saira antialiased')}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-col min-h-screen">
          {isMaintenanceMode && <MaintenanceModeBanner />}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<GameModeSelect />} />
              <Route
                path="/game/four"
                element={
                  <ABMode
                    modeSlug="four"
                    gridClass="grid grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4 max-w-[min(100%,600px)] md:max-w-[min(100%,700px)] lg:max-w-[min(100%,800px)] mx-auto"
                  />
                }
              />
              <Route
                path="/game/five"
                element={
                  <ABMode
                    modeSlug="five"
                    gridClass="grid grid-cols-6 gap-2 sm:gap-4 p-2 sm:p-4 max-w-[min(100%,650px)] md:max-w-[min(100%,750px)] lg:max-w-[min(100%,850px)] mx-auto"
                  />
                }
              />
              <Route path="/how-to-play" element={<HowToPlay />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Toaster />
      </NextThemesProvider>
    </div>
  );
}

export default App;
