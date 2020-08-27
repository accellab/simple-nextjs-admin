import { useState, useEffect } from 'react';

export const useFetcher = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };
  return { data, loading };
};
