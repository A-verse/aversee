import Image from 'next/image'

export function PhoneMockup({
  src,
  alt,
  gradient,
}: {
  src: string
  alt: string
  gradient: string
}) {
  return (
    <div
      className="phone-frame relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
      style={{ background: gradient, height: '190.41px' }}
    >
      <div className="absolute inset-x-0 top-4 sm:top-5 flex justify-center">
        <div className="relative w-[55%] max-w-[190px]" style={{ padding: '2px' }}>
          {/* Metallic frame */}
          <div
            className="absolute inset-0 rounded-[18px] sm:rounded-[22px]"
            style={{
              background:
                'linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)',
            }}
          />
          {/* Side rails */}
          <div
            className="absolute left-0 top-[10%] bottom-0 w-[2px] rounded-l-full"
            style={{
              background:
                'linear-gradient(180deg, #666 0%, #999 20%, #777 40%, #aaa 60%, #888 80%, #555 100%)',
            }}
          />
          <div
            className="absolute right-0 top-[10%] bottom-0 w-[2px] rounded-r-full"
            style={{
              background:
                'linear-gradient(180deg, #555 0%, #888 20%, #666 40%, #999 60%, #777 80%, #666 100%)',
            }}
          />
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-t-full"
            style={{
              background: 'linear-gradient(90deg, #444 0%, #888 30%, #bbb 50%, #888 70%, #444 100%)',
            }}
          />
          {/* Buttons */}
          <div
            className="absolute top-[18%] -left-[1.5px] w-[3px] h-[8%] rounded-l-sm"
            style={{ background: 'linear-gradient(90deg, #777, #333)' }}
          />
          <div
            className="absolute top-[30%] -left-[1.5px] w-[3px] h-[12%] rounded-l-sm"
            style={{ background: 'linear-gradient(90deg, #777, #333)' }}
          />
          <div
            className="absolute top-[25%] -right-[1.5px] w-[3px] h-[15%] rounded-r-sm"
            style={{ background: 'linear-gradient(270deg, #777, #333)' }}
          />
          {/* Dynamic island */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2.5 sm:h-3 bg-black rounded-full z-20"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }}
          />
          {/* Screen */}
          <div
            className="relative bg-white rounded-[14px] sm:rounded-[18px] overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.8)' }}
          >
            <Image
              src={src || '/placeholder.svg'}
              alt={alt}
              width={280}
              height={580}
              className="w-full h-auto object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
