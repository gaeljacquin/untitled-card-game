'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';

export default function Credits() {
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
            className="self-start p-0 hover:bg-transparent"
          >
            <ArrowUp className="w-16 h-16 text-foreground" />
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
              Credits
            </h1>

            <div className="text-foreground space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={import.meta.env.VITE_PROFILE_PIC ?? ''} />
                    <AvatarFallback>GJ</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">Developer</h4>
                    <p className="text-muted-foreground">
                      {import.meta.env.VITE_AUTHOR ?? 'Gael Jacquin'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/fireworks.jpg" />
                    <AvatarFallback>Fireworks</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">Testers</h4>
                    <p className="text-muted-foreground">Friends & Family</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-xl text-foreground">Thank you for playing!</p>
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
