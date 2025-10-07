'use client';

import { motion } from 'motion/react';

import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import SectionCard from '@/components/section-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function Credits() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(61, 4, 34, 0.77)"
      gradientBackgroundEnd="rgb(49, 20, 13)"
    >
      <div className="absolute z-50 inset-0 flex flex-col">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 flex-1 overflow-auto p-4"
        >
          <BackgroundLogo />

          <div className="max-w-4xl mx-auto space-y-4 mt-16 relative z-10">
            <SectionCard title="" className="text-center text-white p-1 md:p-4">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-6">Credits</h3>

                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-xl space-y-8 md:space-y-0 md:space-x-12">
                  <div className="flex flex-col md:flex-row-2 items-center justify-center space-x-4">
                    <div className="flex flex-col md:flex-row-1 items-center justify-center space-y-1">
                      <Avatar className="text-center h-16 w-16">
                        <AvatarImage src={import.meta.env.VITE_PROFILE_PIC ?? ''} />
                        <AvatarFallback>GJ</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold">Developer</h4>
                      <p className="text-center">{import.meta.env.VITE_AUTHOR ?? 'Gael Jacquin'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex flex-col md:flex-row-1 items-center justify-center space-y-1">
                      <Avatar className="text-center h-16 w-16">
                        <AvatarImage src="/fireworks.jpg" />
                        <AvatarFallback>Fireworks</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold">Testers</h4>
                      <p className="text-center">Friends & Family</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-white mt-8 mb-7">Thank you for playing!</p>
              </div>
            </SectionCard>
          </div>

          <div className="flex justify-center my-8">
            <ReturnMainMenu />
          </div>
          <div className="mt-48">
            <Footer />
          </div>
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}
