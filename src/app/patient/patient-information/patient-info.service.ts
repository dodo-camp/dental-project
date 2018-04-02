import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { Information } from './patient-info.interface';

@Injectable()
export class PatientInfoService {
    loading: boolean;
    loading_subject = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

    storeInformationOfPatient(info: Information) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        };
        this.http.post('/api/storePatientInformation', info, httpOptions).subscribe(response => {
            if (response[0].success == true) {
                if (localStorage.getItem('firstTime') == null) {
                    this.router.navigate(['/login/patient']);
                    this.loading = false;
                    this.loading_subject.next(this.loading)
                }
                else {
                    this.router.navigate(['pages/dashboard']);
                    this.loading = false;
                    this.loading_subject.next(this.loading)
                }
            }
        }, error => {
            console.log(error);
        });
    }
}