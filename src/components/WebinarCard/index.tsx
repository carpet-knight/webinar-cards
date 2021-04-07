import React, { useRef, useState } from 'react';

import Popover from '../Popover';
import Overlay from '../Overlay';

import { InfoIcon, CloseIcon, TwitterIcon, WebIcon } from '../../svg';
import './WebinarCard.scss';

interface WebinarCardProps {
  webinar: Webinar;
  shortForm?: boolean;
}

const getLocalTimeString = (date: Date) => {
  return date.toLocaleTimeString().slice(0, 5);
};

const getUTCTimeString = (date: Date) => {
  return date.toUTCString().split(' ')[4].slice(0, 5);
};

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, shortForm = true }) => {
  // shortForm property is responsible for mobile view of the webinar card
  // it is rendered when user device does not support hover

  const selfRef = useRef<HTMLDivElement>(null);
  const [displayInfo, setDisplayInfo] = useState<boolean>(false);

  const dateString = webinar.date.split(',').slice(0, -1).join(', ');
  const dateStart = new Date(webinar.date);
  const dateFinish = new Date(webinar.dateTimestamp);

  // additional component for displaying info about speaker and webinar content
  const WebinarInfo: React.FC = () => (
    <div className="webinar__info">
      {shortForm ? (
        <CloseIcon className="icon--close" onClick={() => setDisplayInfo(false)} />
      ) : null}
      <div className="webinar__speaker">
        <div className="speaker__photo">
          <img
            src={webinar.speakerPhoto ? webinar.speakerPhoto : './img/no-photo.png'}
            alt={webinar.speakerName}
          />
        </div>
        <div className="speaker__info">
          <h4 className="speaker__name">{webinar.speakerName}</h4>
          {webinar.speakerTwitter ? (
            <a
              className="speaker__twitter"
              href={webinar.speakerTwitter}
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon />
            </a>
          ) : null}
          {webinar.speakerWebsite ? (
            <a
              className="speaker__website"
              href={webinar.speakerWebsite}
              target="_blank"
              rel="noreferrer"
            >
              <WebIcon />
            </a>
          ) : null}
        </div>
      </div>
      <div className="webinar__description">{webinar.description}</div>
      <div className="webinar__tags">
        {webinar.category.map((category) => (
          <span className="tag" key={category}>
            {category}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    // webinar card main content
    <div
      className="webinar"
      ref={selfRef}
      // add mouse events if user device supports hover
      onMouseEnter={shortForm ? undefined : () => setDisplayInfo(true)}
      onMouseLeave={shortForm ? undefined : () => setDisplayInfo(false)}
    >
      <div className="webinar__top">
        <div className="webinar__header">
          <img src={`./img/${webinar.category[0]}.png`} alt={`${webinar.category[0]}`} />
          {/* display info icon for devices without hover support */}
          {shortForm ? <InfoIcon onClick={() => setDisplayInfo(true)} /> : null}
        </div>
        <p className="webinar__datetime">
          {dateString}
          <br />
          {getUTCTimeString(dateStart)} – {getUTCTimeString(dateFinish)} GMT
          <br />
          {getLocalTimeString(dateStart)} – {getLocalTimeString(dateFinish)} local time
        </p>
        <h3 className="webinar__title">{webinar.title}</h3>
      </div>
      <div className="webinar__bot">
        <a className="btn" href={webinar.link} target="_blank" rel="noreferrer">
          Register
        </a>
      </div>

      {/* additional webinar info part */}
      {shortForm ? (
        // render webinar info as an overlay for devices that do not support hover
        <Overlay
          visible={displayInfo}
          style={{
            transition: '0.3s',
            opacity: displayInfo ? 1 : 0,
            height: '100%',
          }}
        >
          <WebinarInfo />
        </Overlay>
      ) : (
        // render webinar info as a popover for devices with hover support
        <Popover
          visible={displayInfo}
          parentRef={selfRef}
          style={{
            boxShadow: displayInfo ? '0px 0px 8px 1px rgba(255, 255, 255, 0.8)' : 'none',
            transition: '0.3s',
            opacity: displayInfo ? 1 : 0,
          }}
        >
          <WebinarInfo />
        </Popover>
      )}
    </div>
  );
};

export default WebinarCard;
