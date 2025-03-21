import { useEffect, useState } from 'react';

//*  A fetchFunction will be parameter passed thru props which may be sent down by functions that are called by the useFetch() hook
//* useFetch(Movies), or useFetch(fetchMoviesDetails), or other functions

//* custom hook
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      // @ts-ignore
      setError(err instanceof Error ? err : new Error('an error has occurred'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  //* useEffect when you want to do something at the start of your component load
  //* autoFetch means we want to automatically fetch the data
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  //* hook have to return something
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
