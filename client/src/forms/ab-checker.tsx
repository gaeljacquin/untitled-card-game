'use client';

import { ABCard } from '@annabelle/shared/src/core/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import { abCheckSchema, FormData } from '@/types/ab-check';
import allConstants from '@/utils/constants';

type Props = {
  wsConnect: () => void;
  abSend: (arg0: ABCard[]) => void;
};

export default function ABChecker(props: Props) {
  const { wsConnect, abSend } = props;
  const { toast } = useToast();
  const { abCheckStatus } = settingsStore();
  const { topRightToaster } = allConstants;

  const form = useForm<FormData>({
    resolver: zodResolver(abCheckSchema),
    defaultValues: {
      abWord: '',
    },
  });

  function onSubmit(data: FormData) {
    const abWord = data.abWord.toLowerCase();
    const abCards = Array.from({ length: abWord.length }, (_, index) => {
      const abCard = new ABCard(false);
      abCard._letter = abWord[index];

      return abCard;
    });
    abSend(abCards);
    toast({
      variant: 'default',
      title: 'AB Checker',
      description: "Sent '" + data.abWord + "' for AB Checking",
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn(topRightToaster),
    });
    wsConnect();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8')}>
        <div className="grid grid-row-1 gap-4">
          {' '}
          <FormField
            control={form.control}
            name="abWord"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel
                  className={cn(
                    form.formState.errors.abWord ? 'bg-red-500 p-1 rounded-xl' : '',
                    'text-white'
                  )}
                >
                  AB Word
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="text-center bg-black/50 border-white/20 uppercase placeholder:text-white/70"
                    placeholder="Type here"
                  />
                </FormControl>
                <FormMessage className="text-white bg-red-500 p-4 rounded-xl" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center bg-white/80 backdrop-sm-blur border-black/20 rounded-md p-5">
          <p className="text-center text-black uppercase pointer-events-none">
            {!abCheckStatus.abWord ? (
              <span className="text-sky-600 text-lg font-bold">?</span>
            ) : abCheckStatus.valid ? (
              <span className="text-green-700 text-lg font-bold">Valid</span>
            ) : (
              <span className="text-red-700 text-lg font-bold">Invalid</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 border-white/20">
            Check
          </Button>
        </div>
      </form>
    </Form>
  );
}
