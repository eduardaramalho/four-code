import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService{

  private readonly baseUrl = 'http://localhost:3003/'

  constructor(private httpClient : HttpClient) {
  
  }

  private makeHttpOptions(){
    const token = window.localStorage.getItem('token');

    return {
      headers : {
        'Authorization': 'bearer ' + token
      }
    }
  }

  public get(route : string) : Promise<any>{
    return this.httpClient.get(this.baseUrl + route, this.makeHttpOptions()).toPromise();
  }

  public post(route : string, obj : any) : Promise<any>{
    return this.httpClient.post(this.baseUrl + route, obj, this.makeHttpOptions()).toPromise();
  }


  public patch(route : string, obj : any) : Promise<any>{
    return this.httpClient.patch(this.baseUrl + route, obj, this.makeHttpOptions()).toPromise();
  }  

  public put(route : string, obj : any) : Promise<any>{
    return this.httpClient.put(this.baseUrl + route, obj, this.makeHttpOptions()).toPromise();
  }  

}
