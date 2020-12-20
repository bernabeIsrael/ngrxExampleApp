import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs = new Subscription();
  user: User | undefined;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .subscribe(({user}) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout(): void {
    this.authService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
