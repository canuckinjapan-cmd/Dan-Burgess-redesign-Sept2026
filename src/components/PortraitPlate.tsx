import headshot from "@/assets/DJB-headshot01.jpg";

export const PortraitPlate = () => {
  return (
    <div className="relative w-full h-full bg-surface-soft overflow-hidden">
      <div
        className="absolute inset-6 border border-dashed border-ink/15 rounded-full animate-spin-slow pointer-events-none"
        aria-hidden
      />
      
      {/* Photo Portrait */}
      <img
        src={headshot}
        alt="Photo portrait of Dan Burgess"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
};

