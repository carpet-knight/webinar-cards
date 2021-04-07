import React, { useRef, useEffect } from 'react';

interface PopoverProps {
  visible: boolean;
  style?: React.CSSProperties;
  parentRef: React.RefObject<HTMLElement>;
}

const defaultStyles: React.CSSProperties = {
  position: 'absolute',
  zIndex: 100,
};

// determine where to display popover based on a distance
// between parent element and edge of the screen
const getPopoverPosition = (
  parent: HTMLElement,
  windowHeight: number
): 'bottom' | 'top' => {
  const { top, bottom } = parent.getBoundingClientRect();

  return top > windowHeight - bottom ? 'top' : 'bottom';
};

const Popover: React.FC<PopoverProps> = ({ children, visible, style, parentRef }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef!.current!;
    const popover = popoverRef!.current!;
    const position = getPopoverPosition(parent, window.innerHeight);

    if (position === 'bottom') {
      popover.style.removeProperty('bottom');
      popover.style.top = '100%';
    } else {
      popover.style.removeProperty('top');
      popover.style.bottom = '100%';
    }

    if (visible) {
      popover.style.transform = `translateY(${position === 'bottom' ? 20 : -20}px)`;
      popover.style.visibility = 'visible';

      return;
    }

    popover.style.transform = `translateY(${position === 'bottom' ? -20 : 20}px)`;
    popover.style.visibility = 'hidden';
  }, [visible, parentRef]);

  return (
    <div className="popover" ref={popoverRef} style={{ ...defaultStyles, ...style }}>
      {children}
    </div>
  );
};

export default Popover;
