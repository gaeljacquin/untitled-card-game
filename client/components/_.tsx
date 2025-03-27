import { cn } from 'lib/utils';
import appinfo from 'utils/appinfo';

type Props = {
  className?: string;
};

export default function _(props: Props) {
  const { className = 'bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500' } =
    props;

  return <span className={cn(className)}>{appinfo.title}</span>;
}
