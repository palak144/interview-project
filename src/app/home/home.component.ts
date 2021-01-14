import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: RegisterModel;
    currentUserSubscription: Subscription;
    users: RegisterModel[] = [];
    loadedFeature = 'Recipe';

    constructor(
        private authenticationService: AuthService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
    onNavigate(feature:string){
        debugger
        this.loadedFeature = feature
          }
}