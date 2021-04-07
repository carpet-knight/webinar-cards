import { useEffect, useState } from 'react';

import { WebinarsList } from './components';
import { LoadingIcon } from './svg';
import './App.scss';

function App() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = 'http://localhost:9000/webinars';

  const fetchData = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    fetchData(API_URL).then((data: Webinar[]) => {
      setWebinars(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="wrapper">
      <section className="webinars">
        <div className="container">
          <h1 className="webinars__title">Upcoming Webinars</h1>
          {loading ? (
            <div className="loading">
              <LoadingIcon />
            </div>
          ) : (
            <WebinarsList webinars={webinars} />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
