import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { UpdateProfileComponent } from './components/update-profile/update.component';
import { UpdatePasswordComponent } from './components/update-password/update.component';
import { CommonModule } from '@angular/common';
import { UserSolutionsComponent } from './components/solutions/solutions.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUser } from '@core/auth/auth.reducers';
import { IUser } from '@core/types/models.type';

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
