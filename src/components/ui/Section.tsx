import { cn } from '../../lib/utils';
export default function Section({
  children,
  className,
  id,
  decoration,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  decoration?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'py-12 bg-white',
        decoration && 'relative overflow-hidden',
        className
      )}
      id={id}
    >
      {decoration}
      <div className={cn('portal-container', decoration && 'relative')}>
        {children}
      </div>
    </section>
  );
}
