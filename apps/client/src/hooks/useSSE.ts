import { sseEvents } from '@client/helpers/httpClient';
import { useEffect } from 'react';

interface onSSEEvents {
  onSuccess: (this: EventSource, ev: MessageEvent<any>) => void;
  onError?: (ev: Event) => any;
}

export const useSSE = (url: string, sseEves: onSSEEvents) => {
  useEffect(() => {
    const sseEvent = sseEvents(url);
    sseEvent.onmessage = sseEves.onSuccess;
    sseEvent.onerror = (eve) => {
      sseEves.onError?.(eve);
    };
    return () => {
      sseEvent.close();
    };
  }, []);
};
