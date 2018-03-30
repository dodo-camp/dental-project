import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlatformLocation } from '@angular/common'
//import { HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule, MatSelectModule, MatFormFieldModule, ErrorStateMatcher } from '@angular/material';
//import { routerTransition } from '../router.animations';
import { PatientInfoService } from './patient-info.service';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

const URL = 'http://localhost:3535/api/upload';

@Component({
    selector: 'app-login',
    templateUrl: './patient-info.component.html',
    styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
    /* @HostListener('window:popstate', ['$event'])
     
     onPopState(event) {
         localStorage.clear();
     }*/
    newItem = {
        EndTime: null,
        StartTime: null
    };
    imagePath: string;

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private infoService: PatientInfoService, private router: Router, private http: Http, private el: ElementRef) { }

    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

    loading: boolean;
    hide = true;

    ngOnInit() {
        this.loginForm = this.fb.group({
            firstname: new FormControl('', [Validators.required]),
            image: new FormControl(''),
            lastname: new FormControl('', [Validators.required]),
            mobile_number: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            citizen: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            street_address: new FormControl('', [Validators.required]),
            street_address2: new FormControl('', [Validators.required]),
            landmark: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            code: new FormControl('', [Validators.required]),
        });

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            //console.log("ImageUpload:uploaded:", item, status, response);
            this.imagePath = JSON.parse(response)[0].path_of_file
        };
    }
    OnSubmit() {
        var information = {
            firstname: this.loginForm.value.firstname,
            lastname: this.loginForm.value.lastname,
            mobile_number: this.loginForm.value.mobile_number,
            gender: this.loginForm.value.gender,
            citizen: this.loginForm.value.citizen,
            dob: this.loginForm.value.dob,
            street_address: this.loginForm.value.street_address,
            street_address2: this.loginForm.value.street_address2,
            landmark: this.loginForm.value.landmark,
            city: this.loginForm.value.city,
            state: this.loginForm.value.state,
            code: this.loginForm.value.code,
            image: this.imagePath
        }
        if (localStorage.getItem('jwtToken') != null) {
            this.infoService.storeInformationOfPatient(information);
        }
        else {
            this.router.navigate(['/signup/patient']);
        }
    }

    upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) {
            formData.append('photo', inputEl.files.item(0));
            this.http
                .post('/api/upload', formData).map((res: Response) => res.json()).subscribe(
                    (success) => {
                        console.log('success.FileItem.path');
                        alert(success._body);
                    },
                    (error) => alert(error))
        }
    }
}
