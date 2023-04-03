import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {

  private topics : Array<any> = [];

  constructor() { }

  public subscribe(topic : string, callback : any) {
    const find = this.topics.find(t => t.topic == topic && t.callback == callback);

    if(find){
      return;
    }

    this.topics.push({topic: topic, callback: callback});

    return callback;
  }

  public publish(topic : string, data : any = null) {
    const filter = this.topics.filter(t => t.topic == topic);

    filter.forEach(f => {
      f.callback(data);
    });
  }

  public unsubscribe(callback : any) {
    const find = this.topics.find(t => t.callback == callback);

    if (find) {
      const index = this.topics.indexOf(find);
      this.topics.splice(index, 1);
    }
  }
}
