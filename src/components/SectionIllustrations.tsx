import React from 'react';
import origamiEnvelope from "@/assets/origami+envelope.svg";

export const ContactIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src={origamiEnvelope} 
      alt="Origami crane and envelope"
      className={className}
      style={{ imageRendering: "-webkit-optimize-contrast" }}
      loading="lazy"
    />
  );
};
