import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden relative",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
