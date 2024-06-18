import { NGROK_AUTHTOKEN, NODE_ENV, ORIGIN } from '@api/config';
import ngrok from 'ngrok';

export class Tunnel {
  private static uri: string;
  private static webhookInterceptorOrigin: string;
  static async create() {
    if (NODE_ENV === 'local') {
      Tunnel.uri = await ngrok.connect({
        proto: 'http',
        addr: 8080,
        authtoken: NGROK_AUTHTOKEN,
      });
    }
    Tunnel.webhookInterceptorOrigin =
      NODE_ENV === 'local' ? Tunnel.uri : ORIGIN;

    return {
      uri: Tunnel.uri,
      webhookInterceptorOrigin: Tunnel.webhookInterceptorOrigin,
    };
  }

  static async destroy() {
    NODE_ENV === 'local' && (await ngrok.disconnect(Tunnel.uri));
  }
}
