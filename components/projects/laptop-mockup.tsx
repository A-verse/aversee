import Image from "next/image";

export function LaptopMockup({
  src,
  alt,
  gradient,
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  gradient: string;
  fit?: "cover" | "fill";
  priority?: boolean;
}) {
  return (
    <div
      className="laptop-frame relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full"
      style={{ background: gradient }}
    >
      <div className="p-3 sm:p-4 lg:p-5 h-full flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-lg sm:rounded-xl shadow-2xl p-[1.5%] sm:p-[1.2%] ring-1 ring-white/10 group transform-gpu">
            <div className="relative w-full h-full bg-black rounded-md sm:rounded-lg overflow-hidden ring-1 ring-white/5">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[14%] sm:w-[12%] h-[6%] sm:h-[7%] bg-black rounded-b-md sm:rounded-b-lg z-20 flex items-end justify-center pb-1 border-b border-x border-white/10 shadow-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#111] ring-1 ring-white/20 opacity-80 shadow-inner" />
                <div className="absolute right-[25%] top-[50%] w-0.5 h-0.5 rounded-full bg-blue-900/40" />
              </div>
              {/* Screen */}
              <div className="relative w-full h-full bg-white">
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={750}
                  priority={priority}
                  className={`w-full h-full ${fit === "fill" ? "object-fill" : "object-cover"} object-top`}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay z-10 opacity-50" />
              </div>
            </div>
            {/* Base */}
            <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-[#333] rounded-b-lg opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
