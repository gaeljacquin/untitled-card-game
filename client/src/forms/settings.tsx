'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { AudioLines, Image, Music4, RotateCcw, Save, Timer } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CardBackPreview from '@/components/card-back-preview';
import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import { FormData, settingsSchema } from '@/types/settings';
import allConstants from '@/utils/constants';

export default function Settings() {
  const { getSettings, _hasHydrated, updateSettings, resetSettings } = settingsStore();
  const settings = getSettings();
  const { toast } = useToast();
  const { cardBacks, timerMinutes } = allConstants;
  const toasterClass =
    'top-0 right-0 flex fixed md:backdrop-opacity-5 md:backdrop-invert md:bg-white/10 md:text-white md:max-w-[400px] md:top-4 md:right-4';

  const form = useForm<FormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      cardBack: settings.cardBack,
      music: settings.music,
      soundfx: settings.soundfx,
      timer: settings.timer,
    },
  });

  function onSubmit(data: FormData) {
    updateSettings(data);
    toast({
      variant: 'default',
      title: 'Settings saved',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn(toasterClass),
    });
  }

  function confirmResetSettings() {
    resetSettings();
    toast({
      variant: 'default',
      title: 'Settings reset to default',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn(toasterClass),
    });
  }

  if (!_hasHydrated) {
    return <Placeholder />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8')}>
        <div className="mb-12">
          <FormField
            control={form.control}
            name="cardBack"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-2 mb-7">
                  <Image className="w-5 h-5" />
                  <FormLabel>Card Back</FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  >
                    {cardBacks.map((cardBack, index) => (
                      <div key={cardBack + '-' + index} className="relative">
                        <RadioGroupItem
                          value={index.toString()}
                          className="sr-only"
                          id={'card-back-' + (index + 1)}
                        />
                        <label htmlFor={'card-back-' + (index + 1)}>
                          <CardBackPreview
                            cardBack={cardBack}
                            index={index}
                            isSelected={field.value === index}
                          />
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="music"
            render={({ field }) => (
              <FormItem className="space-y-4 mb-4">
                <div className="flex items-center gap-2">
                  <Music4 className="w-5 h-5" />
                  <FormLabel>Music</FormLabel>
                </div>
                <FormControl>
                  <Slider
                    className="cursor-pointer"
                    min={0}
                    max={100}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="soundfx"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-2">
                  <AudioLines className="w-5 h-5" />
                  <FormLabel>Sound FX</FormLabel>
                </div>
                <FormControl>
                  <Slider
                    className="cursor-pointer"
                    min={0}
                    max={100}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="timer"
            render={({ field }) => (
              <FormItem className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <FormLabel>Timer</FormLabel>
                </div>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue placeholder="Select game duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-transparent backdrop-blur-sm">
                    {timerMinutes.map((minutes, index) => (
                      <SelectItem
                        key={minutes + '-minutes-' + index}
                        value={index.toString()}
                        className="text-white"
                      >
                        {minutes} minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 border-white/20">
            <Save className="w-5 h-5" />
            Save
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className="w-full bg-white/20 hover:bg-white/30 border-white/20"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-transparent backdrop-blur-sm border-white/20">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Are you sure?</h4>
                  <p className="text-sm text-white">This action cannot be undone.</p>
                </div>
                <div className="flex items-center justify-center">
                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full text-md"
                      onClick={() => confirmResetSettings()}
                    >
                      Yes
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </Form>
  );
}
