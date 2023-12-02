const STREAM_BASE_URL = `${import.meta.env.VITE_SERVER_ORIGIN}/stream`;
const apikeyQuery = "/?api_key=" + import.meta.env.VITE_API_KEY;
export const sseEvents = (url: string) =>
  new EventSource(`${STREAM_BASE_URL}/${url}${apikeyQuery}`, {
    withCredentials: true,
  });

interface onSSEEvents {
  onSuccess: (this: EventSource, ev: MessageEvent<any>) => void;
  onError?: (ev: Event) => any;
}

export const sseStream = (url: string, sseEves: onSSEEvents) => {
  const sseEvent = sseEvents(url);
  sseEvent.onmessage = sseEves.onSuccess;
  sseEvent.onerror = (eve) => {
    sseEves.onError?.(eve);
  };
  return { close: () => sseEvent.close() };
};
