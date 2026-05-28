import { cn } from '@/domain/shared/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'wide' | 'narrow';
}

const sizeMap = {
  normal: 'max-w-[1200px]',
  wide: 'max-w-[1440px]',
  narrow: 'max-w-[800px]',
};

export function Container({
  children,
  className,
  size = 'normal',
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto px-4 md:px-6 lg:px-10', sizeMap[size], className)}
    >
      {children}
    </div>
  );
}
