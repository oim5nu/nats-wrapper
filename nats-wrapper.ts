import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;
  
  get client() {
    if (!this._client) {
      throw new Error('Cannot accesss NATS client before connecting');
    }
    
    return this._client;
  }
  
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    
    return new Promise((resolved, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      }
      this.client.on('error', (err) => {
        console.error(err);
        reject(err);
      }
    });
  }
}

eport const natsWrapper = new NatsWrapper();
