'use client';

import { motion } from 'motion/react';

import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import SectionCard from '@/components/section-card';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import SettingsForm from '@/forms/settings';

export default function Settings() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(4, 34, 61, 0.77)"
      gradientBackgroundEnd="rgb(13, 49, 20)"
    >
      <div className="absolute z-50 inset-0 flex flex-col">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 flex-1 overflow-auto p-4"
        >
          <BackgroundLogo />

          <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
            <SectionCard title="Settings" className="flex flex-col text-center text-white p-4">
              <SettingsForm />
            </SectionCard>
          </div>

          <div className="flex justify-center my-8">
            <ReturnMainMenu />
          </div>

          <Footer />
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}
