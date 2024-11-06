import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '@core/types/models.type';
import { AuthService } from '../../../../@core/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/auth/auth.reducers';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { authLinks, commonLinks } from './links';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  user: IUser | null;
  isOpen: WritableSignal<boolean> = signal(false);
  commonLinks = commonLinks;
  authLinks = authLinks;
  #authService = inject(AuthService);
  #store = inject(Store);
  #subscription: Subscription;

  ngOnInit(): void {
    this.#subscription = this.#store.select(selectUser).subscribe((user) => (this.user = user));
  }

  singOut(): void {
    this.#authService.signOut().mutate({});
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
