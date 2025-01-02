'use client';

import { useRef } from 'react';
import { ABCardPreview } from '@annabelle/shared/src/core/card';
import { Rank, RankId } from '@annabelle/shared/src/core/rank';
import { Suit, SuitId } from '@annabelle/shared/src/core/suit';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CardBackPreview from '@/components/card-back-preview';
import CardFrontPreview from '@/components/card-front-preview';
import Placeholder from '@/components/placeholder';
import SectionCard from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
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
  const {
    cardBacks,
    cardFronts,
    TIMER_MIN,
    TIMER_MAX,
    NUM_CARDS_IN_HAND_MIN,
    NUM_CARDS_IN_HAND_MAX,
    topRightToaster,
  } = allConstants;

  const form = useForm<FormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      cardBack: settings.cardBack,
      cardFront: settings.cardFront,
      previewCard: settings.previewCard,
      labelNotValue: settings.labelNotValue,
      timer: settings.timer,
      playerCards: settings.playerCards,
      showAudioPlayer: settings.showAudioPlayer,
    },
  });

  const previewRank = Rank.getRankById(settings.previewCard.rank as RankId);
  const previewSuit = Suit.getSuitById(settings.previewCard.suit as SuitId);
  const previewCard = new ABCardPreview();
  previewCard.setRank(previewRank);
  previewCard.setSuit(previewSuit);
  previewCard.setLetter(settings.previewCard.letter);

  const currentLetter = form.watch('previewCard.letter');
  const lastValidValueRef = useRef(settings.previewCard.letter);

  function onSubmit(data: FormData) {
    updateSettings(data);
    toast({
      variant: 'default',
      title: 'Settings saved',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn(topRightToaster),
    });
  }

  function confirmResetSettings() {
    resetSettings();
    toast({
      variant: 'default',
      title: 'Settings reset to default',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn(topRightToaster),
    });
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase();

    if (/^[A-Z]$/.test(value) || value === '') {
      form.setValue('previewCard.letter', value);

      if (value === '') {
        lastValidValueRef.current = lastValidValueRef.current;
      } else {
        lastValidValueRef.current = value;

        updateSettings({
          ...settings,
          previewCard: {
            ...settings.previewCard,
            letter: value,
          },
        });
      }
    }
  }

  function onBlur() {
    if (currentLetter === '') {
      form.setValue('previewCard.letter', lastValidValueRef.current);
      updateSettings({
        ...settings,
        previewCard: {
          ...settings.previewCard,
          letter: lastValidValueRef.current,
        },
      });
    }
  }

  if (!(_hasHydrated && previewCard)) {
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
                  <FormLabel>Card Back</FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  >
                    {cardBacks.map((item, index) => (
                      <div key={item + '-' + index} className="relative">
                        <RadioGroupItem
                          value={index.toString()}
                          className="sr-only"
                          id={'card-back-' + (index + 1)}
                        />
                        <label htmlFor={'card-back-' + (index + 1)}>
                          <CardBackPreview
                            cardBack={item}
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

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-7">
            <FormLabel>Card Front</FormLabel>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid grid-row-1 gap-4">
              <FormField
                control={form.control}
                name="cardFront"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2 h-auto">
                        <CommandGroup>
                          {cardFronts.map((item, index) => {
                            return (
                              <CommandItem
                                className="flex items-center justify-between text-white aria-selected:text-black text-md"
                                key={item.id + '-' + index}
                                value={item.id}
                                onSelect={() => {
                                  form.setValue('cardFront', index);
                                  updateSettings({
                                    ...settings,
                                    cardFront: index,
                                  });
                                }}
                              >
                                <span>{item.label}</span>
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value !== undefined &&
                                      field.value !== null &&
                                      index === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center bg-black/50 border-white/20 rounded-xl space-x-2">
                <FormField
                  control={form.control}
                  name="labelNotValue"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          className={`data-[state=checked]:bg-emerald-700 data-[state=unchecked]:bg-slate-400 items-center rounded-full transition-colors`}
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            updateSettings({
                              ...settings,
                              labelNotValue: checked,
                            });
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel className="text-base">A/J/Q/K</FormLabel>
              </div>
            </div>

            <div className="grid grid-row-1 gap-4">
              <FormField
                control={form.control}
                name="previewCard.rank"
                render={({ field }) => (
                  <FormItem className="space-y-4 flex">
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2">
                        <CommandGroup>
                          {Object.values(Rank.getAllRanks())
                            .filter(
                              (item) =>
                                item.id === 'ace' ||
                                item.id === 'queen' ||
                                item.id === 'ten' ||
                                item.id === 'two'
                            )
                            .map((item, index) => {
                              return (
                                <CommandItem
                                  className="flex items-center justify-between text-white aria-selected:text-black text-md"
                                  key={item.id + '-' + index}
                                  value={item.id}
                                  onSelect={() => {
                                    form.setValue('previewCard.rank', item.id);
                                    updateSettings({
                                      ...settings,
                                      previewCard: {
                                        ...settings.previewCard,
                                        rank: item.id,
                                      },
                                    });
                                  }}
                                >
                                  <span>{item.label}</span>
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value && item.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              );
                            })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previewCard.suit"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2 h-auto">
                        <CommandGroup>
                          {Object.values(Suit.getAllSuits()).map((item, index) => {
                            return (
                              <CommandItem
                                className="flex items-center justify-between text-white aria-selected:text-black text-md"
                                key={item.id + '-' + index}
                                value={item.id}
                                onSelect={() => {
                                  form.setValue('previewCard.suit', item.id);
                                  updateSettings({
                                    ...settings,
                                    previewCard: {
                                      ...settings.previewCard,
                                      suit: item.id,
                                    },
                                  });
                                }}
                              >
                                <span>{item.label}</span>
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value && item.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previewCard.letter"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={1}
                        type="text"
                        className="text-center bg-black/50 border-white/20 uppercase"
                        onChange={(e) => onChange(e)}
                        onBlur={() => onBlur()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-row-1 bg-black/40 border-white/20 rounded-xl">
              <SectionCard title="" classNameTitle="text-lg">
                <div className="flex justify-center">
                  <CardFrontPreview card={previewCard} valueNotLabel={!settings.labelNotValue} />
                </div>
              </SectionCard>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="timer"
            render={({ field }) => (
              <FormItem className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <FormLabel>Timer (minutes)</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={TIMER_MIN}
                    max={TIMER_MAX}
                    className="text-center bg-black/50 border-white/20"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="playerCards"
            render={({ field }) => (
              <FormItem className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <FormLabel>Player Cards</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={NUM_CARDS_IN_HAND_MIN}
                    max={NUM_CARDS_IN_HAND_MAX}
                    className="text-center bg-black/50 border-white/20"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center bg-black/50 border-white/20 rounded-xl">
            <FormField
              control={form.control}
              name="showAudioPlayer"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <FormLabel>Show Audio Player</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className={`data-[state=checked]:bg-emerald-700 data-[state=unchecked]:bg-slate-400 items-center rounded-full transition-colors`}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        updateSettings({
                          ...settings,
                          showAudioPlayer: checked,
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 border-white/20">
            Save
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className="w-full bg-white/20 hover:bg-white/30 border-white/20"
              >
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
