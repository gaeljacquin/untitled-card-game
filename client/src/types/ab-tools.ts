import { Hydrate } from '@/types/hydrate';

export type ABToolsStore = Hydrate & {
  abCheckStatus: { [key: string]: string | boolean };
  setAbCheckStatus: (arg0: { [key: string]: string | boolean }) => void;
};
