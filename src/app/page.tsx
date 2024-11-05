'use client'
import { useEffect, useRef } from "react";
import sundialModule from '@/sundial'

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current && sundialModule.rendererDomElement) {
      mainRef.current.appendChild(sundialModule.rendererDomElement)
      sundialModule.animate()
    }

  }, [mainRef])

  return (
    <div className="w-full h-full">
      <main className="w-full -h-full" ref={mainRef} />
    </div>
  );
}
