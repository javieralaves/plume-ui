"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Available sizes for the avatar component
 */
type AvatarSize = "sm" | "md" | "lg" | "xl";

/**
 * A versatile avatar component that displays either an image or initials.
 * Supports different sizes and provides a fallback display when image loading fails.
 *
 * @example
 * ```tsx
 * // Basic usage with image
 * <Avatar
 *   src="/path/to/image.jpg"
 *   alt="User Name"
 *   size="md"
 * />
 *
 * // With initials fallback
 * <Avatar
 *   initials="JD"
 *   size="lg"
 * />
 *
 * // Different sizes
 * <Avatar src="/user1.jpg" size="sm" />
 * <Avatar src="/user2.jpg" size="xl" />
 * ```
 */
interface AvatarProps {
  /** URL of the avatar image */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Initials to display when no image is available */
  initials?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Additional CSS classes */
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
  xl: {
    container: "w-18 h-18 text-app-body-xl",
    icon: "w-9 h-9",
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
