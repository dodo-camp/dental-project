import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: HttpClient) { }

    canActivate() {
        if (localStorage.getItem('jwtToken') == null) {
            if (localStorage.getItem('infoToken') != null) {
                this.router.navigate(['/pages/dashboard']);
            }
            else {
                this.router.navigate(['/login/patient']);
            }
        }
        else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
            };
            return this.http.get('/api/authenticationToken', httpOptions).map(data => {
                if (data[0].success == true) {
                    return true;
                }
            }).catch(error => {
                if (error.status === 401) {
                    if (localStorage.getItem('infoToken') != null) {
                        this.router.navigate(['/pages/dashboard']);
                        return Observable.of(false);
                    }
                    else {
                        this.router.navigate(['/login/patient']);
                        return Observable.of(false);
                    }
                }
            });
        }
    }
}
