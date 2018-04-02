import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as decode from 'jwt-decode';


export interface Element {
    department: string;
    date: { year: string, month: string, day: string };
    time: { hour: string, minute: string, second: string };
    symptom: string;
}

@Injectable()
export class HistoryService {
    loading: boolean;
    loading_subject = new Subject<boolean>();

    email: string;
    data_subject = new Subject<Element[]>();

    constructor(private http: HttpClient, private router: Router) {
    }

    get_history_data() {
        const token = localStorage.getItem('infoToken');
        const tokenPayload = decode(token);
        this.email = tokenPayload.email;
        var obj = {
            email: this.email
        }
        this.http.post<Element[]>('/api/get_history_data', obj).subscribe(data => {
            this.data_subject.next(data);
        }, error => {
            console.log(error);
        })
    }

}