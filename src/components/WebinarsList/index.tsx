import React, { useState, useEffect } from 'react';
import WebinarCard from '../WebinarCard';
import './WebinarsList.scss';

interface WebinarsListProps {
  webinars: Webinar[];
}

const WebinarsList: React.FC<WebinarsListProps> = ({ webinars }) => {
  const [hoverSupport, setHoverSupport] = useState<boolean>();

  useEffect(() => {
    // determine if user device supports hover
    const mql = window.matchMedia('(hover: hover)');
    setHoverSupport(mql.matches);

    mql.addEventListener('change', () => {
      setHoverSupport((prev) => !prev);
    });
  }, []);

  return (
    <div className="webinars-list">
      {webinars.map((webinar) => (
        <WebinarCard
          key={webinar.dateTimestamp}
          webinar={webinar}
          // render special version of the component for devices
          // that do not support hover
          shortForm={!hoverSupport}
        />
      ))}
    </div>
  );
};

export default WebinarsList;
