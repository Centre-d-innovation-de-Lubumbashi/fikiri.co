import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { EventsService } from './events.service';
import { IEvent } from '@core/types/models.type';
import { ObservableQueryResult } from '@ngneat/query';
import { ImgPipe } from '@core/pipes/img.pipe';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  imports: [CommonModule, DatePipe, NgOptimizedImage, ImgPipe]
})
export class EventsComponent implements OnInit {
  events$: ObservableQueryResult<IEvent[], Error>;
  #eventsServive = inject(EventsService);

  ngOnInit(): void {
    this.events$ = this.#eventsServive.getEvents();
  }
}
