import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common'
//import { HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatFormFieldModule, ErrorStateMatcher } from '@angular/material';
import { PatientLoginService } from './login.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    /* @HostListener('window:popstate', ['$event'])
     
     onPopState(event) {
         localStorage.clear();
     }*/

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private loginService: PatientLoginService) { }

    loading: boolean;
    hide = true;
    show = false;

    error = false;
    repassword: string;
    password: string;

    onKey(event: KeyboardEvent) {
        this.repassword = (<HTMLInputElement>event.target).value;
        if (this.repassword == this.password) {
            this.error = false;
        }
        else {
            this.error = true;
        }
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
        this.loginService.loading_subject.subscribe((load) => {
            this.loading = load;
        });
    }

    onLoggedin() {
        this.loginService.LoginWithEmailAndPassword(this.loginForm.value);
        this.loginForm.reset();
    }
}
