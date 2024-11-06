import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  getYear(): number {
    return new Date().getFullYear();
  }
}
