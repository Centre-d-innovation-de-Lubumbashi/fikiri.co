import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { EventsComponent } from './components/events/events.component';
import { SdgsComponent } from './components/sdgs/sdgs.component';
import { PartnersComponent } from './components/partners/partners.component';
import { AwardsComponent } from './components/awards/awards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AwardsComponent, AboutComponent, EventsComponent, SdgsComponent, PartnersComponent],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}
