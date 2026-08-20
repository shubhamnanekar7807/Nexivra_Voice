import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  dark?: boolean;
}

export function Logo({
  showText = true,
  className = "",
  size = "md",
  href = "/",
  dark = false,
}: LogoProps) {
  const sizeMap = {
    sm: { img: 28, text: "text-base", sub: "text-[10px]" },
    md: { img: 36, text: "text-lg", sub: "text-xs" },
    lg: { img: 48, text: "text-2xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative overflow-hidden rounded-xl bg-white p-0.5 shadow-sm ring-1 ring-zinc-200 transition-transform duration-200 hover:scale-105">
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
          <span className={`font-bold tracking-tight ${dark ? "text-white" : "text-zinc-900"} ${currentSize.text}`}>
            NEXIVRA <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TECH</span>
          </span>
          <span className={`font-medium tracking-wider uppercase ${dark ? "text-zinc-400" : "text-zinc-500"} ${currentSize.sub}`}>
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
