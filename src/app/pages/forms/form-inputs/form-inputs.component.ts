import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatInputModule, MatSelectModule, MatFormFieldModule, ErrorStateMatcher } from '@angular/material';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgbDateStruct, NgbTimeStruct, NgbTypeaheadSelectItemEvent, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as decode from 'jwt-decode';

const states = ['Endodontics', 'Operative Dentistry', 'Oral Pathology, Radiology, & Medicine', 'Pediatric Dentistry', 'Preventive & Community Dentistry', 'Family Dentistry', 'Oral & Maxillofacial Surgery',
  'Orthodontics', 'Periodontics', 'Prosthodontics'];

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild('preferedTime') preferedTime: any;
  @ViewChild('preferedMedium') preferedMedium: any;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  model: any;
  loading: boolean;

  newItem = {
    EndTime: null,
    StartTime: null
  };

  prefered_time = ["Morning", "Afternoon", "Evening"];
  prefered_medium = ['phone', 'email'];

  time = { hour: 13, minute: 30 };
  appointmentForm: FormGroup;
  starRate = 2;
  heartRate = 4;

  isSelected = true;

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  //time = ['Morning', 'Afternoon'];

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? states : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) { }

  name: string;
  email: string;
  phone: string;


  ngOnInit() {
    if (localStorage.getItem('infoToken') != null) {
      const token = localStorage.getItem('infoToken');
      const tokenPayload = decode(token);
      this.name = tokenPayload.firstname + ' ' + tokenPayload.lastname;
      this.email = tokenPayload.email;
      this.phone = tokenPayload.mobile_number;
    }

    this.appointmentForm = this.fb.group({
      fullname: new FormControl(this.name),
      department: new FormControl(''),
      preferedTime: this.fb.array([]),
      preferedMedium: this.fb.array([]),
      email: new FormControl(this.email),
      phone: new FormControl(this.phone),
      specialnote: new FormControl(''),
      date: new FormControl(''),
      day: this.fb.array([]),
      time: new FormControl('')
    });
  }

  onChangeTime() {
    const times = <FormArray>this.appointmentForm.controls.preferedTime;
    if (this.isSelected) {
      times.removeAt(0);
      times.push(new FormControl(this.preferedTime.nativeElement.value));
    }
  }
  onChangeMedium() {
    const times = <FormArray>this.appointmentForm.controls.preferedMedium;
    if (this.isSelected) {
      times.removeAt(0);
      times.push(new FormControl(this.preferedMedium.nativeElement.value));
    }
  }

  onChange(day: string, isChecked: boolean) {
    const days = <FormArray>this.appointmentForm.controls.day;
    if (isChecked) {
      days.push(new FormControl(day));
    } else {
      let index = days.controls.findIndex(x => x.value == day)
      days.removeAt(index);
    }
  }

  sendEmail() {
    this.loading = true;
    this.http.post('/api/send', this.appointmentForm.value).subscribe(data => {
      this.loading = false;
      this.snackBar.open('Appointment has been made. Please wait untill it is confirmed by the Dentist', '', {
        duration: 4000
      });
    }, error => {
      console.log(error);
    })
    this.appointmentForm.reset();
  }
}
