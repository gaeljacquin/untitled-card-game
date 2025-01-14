'use client';

import { ABCardPreview } from '@annabelle/shared/core/card';
import { Rank, RankId } from '@annabelle/shared/core/rank';
import { Suit, SuitId } from '@annabelle/shared/core/suit';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ABCardPreviewComp from '@/components/ab-card-preview';
import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import settingsStore, { abDesigns, initialSettings } from '@/stores/settings';
import { FormData, settingsSchema } from '@/types/settings';

export default function Settings() {
  const { _hasHydrated, getSettings, updateSettings, resetSettings } = settingsStore();
  const settings = getSettings();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const previewRank = Rank.getById(settings.previewCard.rank as RankId);
  const previewSuit = Suit.getById(settings.previewCard.suit as SuitId);
  const previewCard = new ABCardPreview();
  previewCard.setRank(previewRank);
  previewCard.setSuit(previewSuit);

  function onSubmit(data: FormData) {
    updateSettings(data);
    toast({
      variant: 'default',
      title: 'Settings saved',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn('top-right-toaster'),
    });
  }

  function confirmResetSettings() {
    resetSettings();
    form.reset({ ...initialSettings });
    toast({
      variant: 'default',
      title: 'Settings reset to default',
      duration: 3000,
      action: <ToastAction altText="Clear">Clear</ToastAction>,
      className: cn('top-right-toaster'),
    });
  }

  if (!(_hasHydrated && previewCard)) {
    return <Placeholder />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-7 mb-12">
          <div className="flex flex-col flex-1 gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="abDesignIndex"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2 h-auto">
                        <CommandGroup>
                          {abDesigns.map((item, index) => {
                            return (
                              <CommandItem
                                className="flex items-center justify-between text-white aria-selected:text-black text-md"
                                key={item.id + '-' + index}
                                value={item.id}
                                onSelect={() => {
                                  form.setValue('abDesignIndex', index);
                                  updateSettings({
                                    ...settings,
                                    abDesignIndex: index,
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
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-xl bg-black/50 border-white/20 w-full">
                <FormLabel className="text-base">
                  <div className="flex h-5 items-center justify-between space-x-2 text-sm">
                    <div className="text-center">1</div>
                    <div className="text-center">11</div>
                  </div>
                  <Separator />
                  <div className="flex h-5 items-center justify-between space-x-4 text-sm">
                    <div className="text-center">12</div>
                    <div className="text-center">13</div>
                  </div>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="rankLabel"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          className="data-[state=checked]:bg-emerald-700 data-[state=unchecked]:bg-rose-600 items-center rounded-full transition-colors"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            updateSettings({
                              ...settings,
                              rankLabel: checked,
                            });
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel className="text-base">
                  <div className="flex h-5 items-center justify-between space-x-2 text-sm">
                    <div className="text-center">(A)ce</div>
                    <div className="text-center">(J)ack</div>
                  </div>
                  <Separator />
                  <div className="flex h-5 items-center justify-between space-x-4 text-sm">
                    <div className="text-center">(Q)ueen</div>
                    <div className="text-center">(K)ing</div>
                  </div>
                </FormLabel>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-center justify-center p-4 rounded-xl">
            <ABCardPreviewComp card={previewCard} rankLabel={!settings.rankLabel} />
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="previewCard.rank"
                render={({ field }) => (
                  <FormItem className="flex">
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2">
                        <CommandGroup>
                          {Rank.getAllValues()
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
            </div>
            <div>
              <FormField
                control={form.control}
                name="previewCard.suit"
                render={({ field }) => (
                  <FormItem>
                    <Command className="bg-black/50 border-white/20">
                      <CommandList className="w-full mt-2 h-auto">
                        <CommandGroup>
                          {Suit.getAllValues().map((item, index) => {
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
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className="w-48 h-12 bg-white/20 hover:bg-white/30 border-white/20 text-md mt-8"
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
                      onClick={() => {
                        confirmResetSettings();
                      }}
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
