import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common'
//import { HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatFormFieldModule, ErrorStateMatcher } from '@angular/material';
import { RegisterLoginService } from './register.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    /* @HostListener('window:popstate', ['$event'])
     
     onPopState(event) {
         localStorage.clear();
     }*/
    signupForm: FormGroup;

    constructor(private fb: FormBuilder, private registerService: RegisterLoginService) { }

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
        this.signupForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            repeatpass: new FormControl('', [Validators.required])
        });
        this.registerService.loading_subject.subscribe((load) => {
            this.loading = load;
        });
    }

    onRegister() {
        this.registerService.RegisterWithEmailAndPassword(this.signupForm.value);
        this.signupForm.reset();
    }
}
