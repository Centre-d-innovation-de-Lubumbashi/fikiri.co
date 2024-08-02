import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserInfoStore } from './data-access/user-info.store';
import { Observable } from 'rxjs';
import { UserInfoStoreInterface } from './types/user-info-store.interface';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { MessageComponent } from '../../../../../shared/components/message/message.component';
import { User } from '../../../../../shared/types/models-interfaces';
import { SpinnerComponent } from '../../../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  providers: [UserInfoStore],
  templateUrl: './user-info.component.html',
  imports: [NgOptimizedImage, CommonModule, MessageComponent, SpinnerComponent, RouterModule]
})
export class UserInfoComponent implements OnInit {
  vm$: Observable<{ userInfoState: UserInfoStoreInterface; user: User | null }>;

  constructor(private store: UserInfoStore) {
    this.vm$ = this.store.vm$;
  }
  ngOnInit(): void {
    this.store.getSolutions();
  }

  displayProfile(user: User): string {
    if (user.profile) return environment.apiUrl + 'uploads/profiles/' + user.profile;
    return user.google_image;
  }

  splitUsername(user: User): string {
    const name = user.name.split(' ');
    return name[0][0].toUpperCase() + ' ' + (name[1] ? name[1][0].toUpperCase() : '');
  }

  onImageChange(event: Event, userId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.store.updateImage({ file: formData, userId });
    }
  }

  closeUserInfoMessage(): void {
    this.store.resetMessage();
  }
}
