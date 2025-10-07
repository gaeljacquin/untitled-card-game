'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';

export default function NotFound() {
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

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-foreground">
              Nothing to see here...
            </h1>
            <p className="text-xl text-muted-foreground">Page not found</p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}
