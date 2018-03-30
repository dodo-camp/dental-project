import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class DashAuthGuard implements CanActivate {

    constructor(private router: Router, private http: HttpClient) { }

    canActivate() {
        if (localStorage.getItem('infoToken') == null) {
            this.router.navigate(['/login/patient']);
            return false;
        }
        else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Authorization': localStorage.getItem('infoToken') })
            };
            return this.http.get('/api/authenticationToken', httpOptions).map(data => {
                if (data[0].success == true) {
                    return true;
                }
            }).catch(error => {
                if (error.status === 401) {
                    this.router.navigate(['/login/patient']);
                    return Observable.of(false);
                }
            });
        }
    }
}
