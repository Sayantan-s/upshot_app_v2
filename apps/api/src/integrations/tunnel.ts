import { NGROK_AUTHTOKEN, NGROK_SWITCH, NODE_ENV, ORIGIN } from '@api/config';
import ngrok from 'ngrok';

export class Tunnel {
  private static uri: string;
  private static webhookInterceptorOrigin: string;
  private static isNgrokActive = NODE_ENV === 'local' && NGROK_SWITCH === 'on';
  static async create() {
    if (Tunnel.isNgrokActive) {
      Tunnel.uri = await ngrok.connect({
        proto: 'http',
        addr: 8080,
        authtoken: NGROK_AUTHTOKEN,
      });
    }
    Tunnel.webhookInterceptorOrigin = Tunnel.isNgrokActive
      ? Tunnel.uri
      : ORIGIN;

    return {
      uri: Tunnel.uri || 'NO URI. TURN `on` NGROK SWITCH',
      webhookInterceptorOrigin: Tunnel.webhookInterceptorOrigin,
    };
  }

  static async destroy() {
    Tunnel.isNgrokActive && (await ngrok.disconnect(Tunnel.uri));
  }
}
