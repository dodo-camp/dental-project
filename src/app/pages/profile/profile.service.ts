import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProfileService {
    loading: boolean;
    loading_subject = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

    changeInformationOfPatient(info) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('infoToken') })
        };
        this.http.post('/api/change_patient_profile', info, httpOptions).subscribe(data => {
            if (data[0].success == true) {
                localStorage.setItem('infoToken', data[0].jwtToken);
                window.location.reload();
            }
        }, error => {
            console.log(error);
        })
    }

    change_email(email) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('infoToken') })
        };
        this.http.post('/api/change_email', email, httpOptions).subscribe(data => {
            if (data[0].success == true) {
                localStorage.setItem('infoToken', data[0].jwtToken);
                window.location.reload();
            }
        }, error => {
            console.log(error);
        });
    }

}