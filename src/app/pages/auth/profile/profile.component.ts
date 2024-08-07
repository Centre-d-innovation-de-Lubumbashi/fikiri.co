import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { SolutionsComponent } from './components/solutions/solutions.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    RouterLink,
    InfoComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    CommonModule,
    SpinnerComponent,
    SolutionsComponent
  ]
})
export class ProfileComponent {
  activeTab: WritableSignal<'profil' | 'solutions'> = signal('profil');

  switchTab() {
    this.activeTab.update((current) => (current === 'profil' ? 'solutions' : 'profil'));
  }
}
