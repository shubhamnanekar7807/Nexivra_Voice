import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({
  showText = true,
  className = "",
  size = "md",
  href = "/",
}: LogoProps) {
  const sizeMap = {
    sm: { img: 28, text: "text-base", sub: "text-[10px]" },
    md: { img: 36, text: "text-lg", sub: "text-xs" },
    lg: { img: 48, text: "text-2xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative overflow-hidden rounded-xl bg-white p-0.5 shadow-md shadow-violet-500/20 ring-1 ring-white/20 transition-transform duration-200 hover:scale-105">
        <Image
          src="/logo.png"
          alt="Nexivra Tech Logo"
          width={currentSize.img}
          height={currentSize.img}
          className="rounded-lg object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-tight text-white ${currentSize.text}`}>
            NEXIVRA <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">TECH</span>
          </span>
          <span className={`font-medium tracking-wider uppercase text-zinc-400 ${currentSize.sub}`}>
            Voice AI Platform
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-block transition-opacity hover:opacity-90">{content}</Link>;
  }

  return content;
}
