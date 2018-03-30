import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { Login } from './login.interface'

@Injectable()
export class PatientLoginService {
    loading: boolean;
    loading_subject = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

    LoginWithEmailAndPassword(registerForm: Login) {
        this.loading = true;
        this.loading_subject.next(this.loading);
        console.log(registerForm);
        this.http.post('/api/patient-login', registerForm).subscribe((response) => {
            if (response) {
                if (response[0].exist == true) {
                    if (response[0].jwtToken) {
                        localStorage.setItem('jwtToken', response[0].jwtToken);
                        localStorage.setItem('firstTime', 'true');
                        this.router.navigate(['/patient/detail']);
                        this.loading = false;
                        this.loading_subject.next(this.loading)
                    }
                    else if (response[0].infoToken) {
                        localStorage.setItem('infoToken', response[0].infoToken);
                        localStorage.removeItem('firstTime');
                        this.router.navigate(['/pages/dashboard']);
                        this.loading = false;
                        this.loading_subject.next(this.loading)
                    }
                }
                else {
                    this.loading = false;
                    this.loading_subject.next(this.loading);
                    this.snackBar.open('Wrong Email or Password', '', {
                        duration: 4000
                    });
                }
            }
        }, (error) => {
            console.log("error");
        })
    }
}