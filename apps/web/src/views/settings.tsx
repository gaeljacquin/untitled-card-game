'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import SettingsForm from '@/forms/settings';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
            className="self-start p-0 hover:bg-transparent cursor-pointer"
          >
            <ArrowUp className="size-20 text-foreground text-red" />
            <p>Return to Main Menu</p>
          </Button>
        </motion.div>

        <div className="flex-1 flex items-center justify-center overflow-auto">
          <motion.div
            className="max-w-4xl mx-auto space-y-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-foreground text-center mb-12">
              Settings
            </h1>

            <div className="text-foreground">
              <SettingsForm />
            </div>

            <div className="flex justify-center pt-8">
              <Footer />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
