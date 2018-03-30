import { Component, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';

@Component({
    selector: 'app-verify',
    templateUrl: './confirmed.component.html',
})
export class VerifyComponent {
    token:string;
    constructor(private http:HttpClient,private route:ActivatedRoute){

        this.token = this.route.snapshot.queryParams['token'];
        console.log(this.token);
        const token_obj ={
            token: this.token
        }
        http.post('/api/verify_email',token_obj).subscribe(data=>{
            console.log(data);
        },error=>{
            console.log(error);
        })
    }
}
