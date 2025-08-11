import React from 'react';

type AspectRatioProps = {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
};

// Minimal aspect-ratio wrapper that preserves child sizing using absolute fill
function AspectRatio({ ratio = 1, className, children }: AspectRatioProps) {
  return (
    <div
      className={`relative w-full ${className ?? ''}`}
      style={{ aspectRatio: String(ratio) }}
      data-slot="aspect-ratio"
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export { AspectRatio };
