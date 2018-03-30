import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { Login } from './register.interface'

@Injectable()
export class RegisterLoginService {
    loading: boolean;
    loading_subject = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

    RegisterWithEmailAndPassword(registerForm: Login) {
        this.loading = true;
        this.loading_subject.next(this.loading);
        this.http.post('/api/patient-register', registerForm).subscribe((response) => {
            if (response) {
                localStorage.setItem('jwtToken', response[0].token);
                if (response[0].success == true) {
                    this.snackBar.open('Account Created', '', {
                        duration: 4000
                    });
                    this.router.navigate(['/patient/detail']);
                    this.loading = false;
                    this.loading_subject.next(this.loading);
                }
                else {
                    this.loading = false;
                    this.loading_subject.next(this.loading);
                    this.snackBar.open('Account already exists', '', {
                        duration: 4000
                    });
                }
            }
        }, (error) => {
            console.log("error");
        })
    }
}