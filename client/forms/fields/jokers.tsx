export default function Jokers() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-xl bg-black/50 border-white/20">
        <FormLabel className="text-base">
          <p>Jokers (5x5 Grid only)*</p>
        </FormLabel>
        <FormField
          control={form.control}
          name="jokers"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  className="data-[state=checked]:bg-emerald-700 data-[state=unchecked]:bg-rose-600 items-center rounded-full transition-colors mt-2"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateSettings({
                      ...settings,
                      jokers: checked,
                    });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <p className="text-sm text-white/50 p-4 rounded-xl bg-black/50 border-white/20">
        * Coming soon
      </p>
    </div>
  );
}
