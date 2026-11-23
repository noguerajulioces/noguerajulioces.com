"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className: string;
  // Class that means "showing the image"; dropped when it fails, so the monogram shows instead.
  loadedClass: "has-img" | "has-photo";
  mono: string;
  src: string;
  srcSet?: string;
  sizes?: string;
  size: number;
  lazy?: boolean;
  ariaHidden?: boolean;
};

// A logo or avatar tile: the image when it loads, the monogram when it doesn't.
export function Tile({ className, loadedClass, mono, src, srcSet, sizes, size, lazy, ariaHidden }: Props) {
  const img = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  // An image that failed before hydration never fires onError, so check once on mount.
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className={failed ? className : `${className} ${loadedClass}`} aria-hidden={ariaHidden || undefined}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element -- fixed-size tiles; next/image would resample the files
        <img ref={img} src={src} srcSet={srcSet} sizes={sizes} alt="" width={size} height={size} loading={lazy ? "lazy" : undefined} onError={() => setFailed(true)} />
      )}
      {mono}
    </div>
  );
}
