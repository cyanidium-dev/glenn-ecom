export default function PageDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Starts at Live section title
            ends at Journal form input
            First 3 gradients are together and layered on top of each other
            Last is continuation of first 3 gradients
       */}
      <div
        className="absolute z-10 top-[-24%] bottom-[26%] lg:top-[-60%] lg:bottom-[-30%] left-1/2 -translate-x-1/2 w-full"
        style={{
          background:
            "linear-gradient(180deg, #92001D 8.27%, rgba(146, 0, 29, 0) 41.52%)",
        }}
      />
      <div
        className="absolute z-10 top-[-24%] bottom-[26%] lg:top-[-60%] lg:bottom-[-30%] left-1/2 -translate-x-1/2 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 68.92%, #000000 88.35%)",
        }}
      />
      <div
        className="absolute z-0 top-[-24%] bottom-[26%] lg:top-[-60%] lg:bottom-[-30%] left-1/2 -translate-x-1/2 w-full"
        style={{
          background:
            "radial-gradient(66.94% 28.37% at 57.5% 56.12%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
      <div
        className="absolute z-10 top-[73%] bottom-[-142%] lg:top-[129%] lg:bottom-[-182%] left-1/2 -translate-x-1/2 w-full"
        style={{
          background:
            "linear-gradient(180.31deg, #010101 0.28%, #830019 62.26%, #93001C 89.33%)",
        }}
      />
    </div>
  );
}
