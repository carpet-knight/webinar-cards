import React, { useEffect, useRef } from 'react';

interface OverlayProps {
  visible: boolean;
  style?: React.CSSProperties;
}

const defaultStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: 100,
};

const Overlay: React.FC<OverlayProps> = ({ children, visible, style }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef!.current!;

    if (visible) {
      overlay.style.visibility = 'visible';
      return;
    }

    overlay.style.visibility = 'hidden';
  }, [visible]);

  return (
    <div className="overlay" ref={overlayRef} style={{ ...defaultStyles, ...style }}>
      {children}
    </div>
  );
};

export default Overlay;
