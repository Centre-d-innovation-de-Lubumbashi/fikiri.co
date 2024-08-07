import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginStore } from './data-access/login.store';
import { LoginStoreInterface } from './types/login-store.interface';
import { environment } from '../../../../environments/environment';
import { FormCardComponent } from '../../../shared/components/form-card/form-card.component';
import { MessageComponent } from '../../../shared/components/notification/notification.component';
import { ButtonOutlineComponent } from '../../../shared/ui/button-outline/button-outline.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginStore],
  templateUrl: './login.component.html',
  imports: [
    FormCardComponent,
    ButtonComponent,
    InputComponent,
    RouterLink,
    NgOptimizedImage,
    ButtonOutlineComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MessageComponent,
    NgClass
  ]
})
export class LoginComponent {
  form: FormGroup;
  apiUrl: string = environment.apiUrl;
  vm$: Observable<LoginStoreInterface>;

  constructor(private store: LoginStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.store.login(this.form.value);
  }

  loginWithGoogle(): void {
    window.location.replace(`${this.apiUrl}auth/google/redirect`);
  }
}
