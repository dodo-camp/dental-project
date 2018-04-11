import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlatformLocation } from '@angular/common'
//import { HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule, MatSelectModule, MatFormFieldModule, ErrorStateMatcher } from '@angular/material';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ProfileService } from './profile.service';

import * as decode from 'jwt-decode';

const URL = 'http://localhost:2018/api/upload';

@Component({
    selector: 'ngx-tables',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    @ViewChild('myModal') myModal: any;
    @ViewChild('myModal2') myModal2: any;

    newItem = {
        EndTime: null,
        StartTime: null
    };

    imagePath: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    dob: { year: string, month: string, day: string };
    gender: string;
    country: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    code: string;

    imagePath2: string;
    firstname2: string;
    lastname2: string;
    email2: string;
    phone2: string;
    dob2: { year: string, month: string, day: string };
    gender2: string;
    country2: string;
    address12: string;
    address22: string;
    state2: string;
    city2: string;
    code2: string;


    loginForm: FormGroup;
    changeForm: FormGroup;
    emailChange: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private http: Http, private el: ElementRef, public ngxSmartModalService: NgxSmartModalService, private change_profile: ProfileService, private config: NgbDatepickerConfig) {
        config.minDate = { year: 1900, month: 1, day: 1 };
        config.maxDate = { year: 2099, month: 12, day: 31 };
    }

    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

    loading: boolean;
    hide = true;

    ngOnInit() {

        if (localStorage.getItem('infoToken') != null) {
            const token = localStorage.getItem('infoToken');
            const tokenPayload = decode(token);
            this.firstname = this.firstname2 = tokenPayload.firstname;
            this.lastname = this.lastname2 = tokenPayload.lastname;
            this.email = tokenPayload.email;
            this.gender = tokenPayload.gender;
            this.dob = this.dob2 = tokenPayload.dob;
            this.address1 = this.address12 = tokenPayload.street_address;
            this.address2 = this.address22 = tokenPayload.street_address2;
            this.phone = this.phone2 = tokenPayload.mobile_number;
            this.country = this.country2 = tokenPayload.citizen;
            this.code = this.code2 = tokenPayload.code;
            this.city = this.city2 = tokenPayload.city;
            this.state = this.state2 = tokenPayload.state;
            this.imagePath = tokenPayload.image.substring(21);
            this.imagePath2 = tokenPayload.image;
        }

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

        this.changeForm = this.fb.group({
            firstname2: new FormControl('', [Validators.required]),
            lastname2: new FormControl('', [Validators.required]),
            phone2: new FormControl('', [Validators.required]),
            country2: new FormControl('', [Validators.required]),
            dob2: new FormControl('', [Validators.required]),
            address12: new FormControl('', [Validators.required]),
            address22: new FormControl('', [Validators.required]),
            city2: new FormControl('', [Validators.required]),
            state2: new FormControl('', [Validators.required]),
            zip2: new FormControl('', [Validators.required]),
        });
        
        this.emailChange = this.fb.group({
            email : new FormControl('',[Validators.required,Validators.pattern("[^ @]*@[^ @]*")])
        })

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.imagePath2 = JSON.parse(response)[0].path_of_file
        };
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
    Save_change() {
        var information = {
            firstname: this.changeForm.value.firstname2,
            lastname: this.changeForm.value.lastname2,
            mobile_number: this.changeForm.value.phone2,
            citizen: this.changeForm.value.country2,
            dob: this.changeForm.value.dob2,
            street_address: this.changeForm.value.address12,
            street_address2: this.changeForm.value.address22,
            city: this.changeForm.value.city2,
            state: this.changeForm.value.state2,
            code: this.changeForm.value.zip2,
            image: this.imagePath2
        }
        this.change_profile.changeInformationOfPatient(information);
        this.myModal.close();
        this.changeForm.reset();
    }

    save_email(){
        this.change_profile.change_email(this.emailChange.value);
        this.myModal2.close();
        this.emailChange.reset();
    }
}
