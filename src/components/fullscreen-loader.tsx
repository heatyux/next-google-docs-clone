import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

type FullscreenLoaderProps = {
  label?: string
  className?: string
}

export const FullscreenLoader = ({
  label,
  className,
}: FullscreenLoaderProps) => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-2',
        className,
      )}
    >
      <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
      {label && <p className="text-muted-foreground text-sm">{label}</p>}
    </div>
  )
}
