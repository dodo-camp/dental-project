import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class SignAuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if(localStorage.getItem('patient')){
            return true;
        }

        this.router.navigate(['/category-select']);
        return false;
    }
}
