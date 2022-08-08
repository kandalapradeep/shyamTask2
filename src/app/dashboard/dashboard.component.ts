import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharepointService } from '../provider/sharepoint.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loginf:any;
  isTable:boolean=false;
  userData:any=[];
  
  constructor(private fb:FormBuilder,private _shareServices:SharepointService,public http:HttpClient) { }

  ngOnInit(): void {
    this.formData();
    this.getDate();
  }

  formData(){
    this.loginf = this.fb.group({
      moneys:['',[Validators.required,Validators.minLength(2)]],
      enterydates:[''],
      commen:['']
    })
  }
  onsubmit(){
    // console.log(this.loginf.value);  
  
    let headers = new HttpHeaders().set('content-type','application/json');

    this.http.post<{msg:string}>('http://localhost:3300/expensive',this.loginf.value,{'headers':headers}).subscribe(res=>{
      console.log("data has post into DB",res);
      this.getDate();
      this.isTable=false;
    })
    this.loginf.reset();
  }


  getDate(){
    this.http.get('http://localhost:3300/expensive').subscribe(res=>{
    this.userData = res
    // console.log(res);
    })
  }

  deleteEntry(id:any){

    this._shareServices.DeleteData(id).subscribe(res=>{
      console.log(" deleted sucssfully");
      this.getDate();
    })
  }
  
}
