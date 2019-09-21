import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: false,
  data: null,
};

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...initialState, isLoading: true };
    case 'FETCH_SUCCESS': 
      return { ...state, isLoading: false, error: null, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.error, data: null };
    default:
      throw new Error();
      // return state;?
  }
};

export const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: undefined,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export const useAction = (action) => {
    const [thisAction, setAction] = useState(action);
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    useEffect(() => {
      let didCancel = false;

      const performAction = async () => {
          dispatch({ type: 'FETCH_INIT' });
          try {
            const response = await thisAction;
            // const [response] = await Promise.all([thisAction]);
            dispatch({ type: 'FETCH_SUCCESS', payload: response });
          } catch (error) {
            console.log('error', error);
            dispatch({ type: 'FETCH_FAILURE', error });
          }
      };

      performAction();

      return () => { didCancel = true; };
    }, [thisAction]);
   
    return [state, setAction];
};
