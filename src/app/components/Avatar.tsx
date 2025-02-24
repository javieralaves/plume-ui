"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; icon: string }> = {
  sm: {
    container: "w-8 h-8 text-app-body-sm",
    icon: "w-4 h-4",
  },
  md: {
    container: "w-10 h-10 text-app-body",
    icon: "w-5 h-5",
  },
  lg: {
    container: "w-14 h-14 text-app-body-lg",
    icon: "w-7 h-7",
  },
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Extract the numeric size from the container class and convert to number
  const numericSize = Number(
    sizeClasses[size].container.match(/\d+/)?.[0] || 40
  );

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-surface-secondary rounded-full overflow-hidden",
        sizeClasses[size].container,
        className
      )}
    >
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          width={numericSize}
          height={numericSize}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : initials ? (
        <span className="font-medium text-text-primary uppercase">
          {initials.slice(0, 2)}
        </span>
      ) : (
        <User className={cn("text-text-secondary", sizeClasses[size].icon)} />
      )}
    </div>
  );
}
