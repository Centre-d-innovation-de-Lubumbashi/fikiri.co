import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoComponent } from './components/user-detail/user-detail.component';
import { UpdateProfileComponent } from './components/edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CommonModule } from '@angular/common';
import { UserSolutionsComponent } from './components/user-solutions/user-solutions.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUser } from '@core/auth/auth.reducers';
import { IUser } from 'app/common/types/models.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    RouterLink,
    InfoComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent,
    CommonModule,
    UserSolutionsComponent
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeTab = signal<string>('profil');
  user: IUser;
  #store = inject(Store);
  #subscription: Subscription;

  ngOnInit(): void {
    this.#subscription = this.#store.select(selectUser).subscribe((user) => (this.user = user));
  }

  switchTab(tab: string): void {
    this.activeTab.set(tab);
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
