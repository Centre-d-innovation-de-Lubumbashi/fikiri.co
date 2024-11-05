import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from '@core/components/loading-bar/loading-bar.component';
import { TopbarComponent } from '@core/components/topbar/topbar.component';
import { FooterComponent } from '@core/components/footer/footer.component';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [LoadingBarComponent, RouterOutlet, TopbarComponent, FooterComponent]
})
export class EmptyLayoutComponent {}
