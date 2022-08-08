import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharepointService {

  constructor(public _http:HttpClient) { }

  getDate(){}

  PostData(obj:any){
    let posts = obj;
    let headers = new HttpHeaders()
   .set('content-type','application/json')

    this._http.post('http://localhost:3300/expensive',posts,{'headers':headers}).subscribe(res=>{
      console.log("data has post into DB",res);
    })

  }
  DeleteData(id:any){
    let header = new HttpHeaders().set('content-type','application/json')
    return this._http.delete<{msg:string}>('http://localhost:3300/expensive/'+id,{headers:header})
  }
}
