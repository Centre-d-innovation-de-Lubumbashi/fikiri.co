import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { environment } from 'environments/environment';
import { EventsService } from './events.service';
import { IEvent, IImage } from '@core/types/models.type';
import { ObservableQueryResult } from '@ngneat/query';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  imports: [NgIf, AsyncPipe, SlicePipe, NgForOf, DatePipe, NgClass, NgOptimizedImage]
})
export class EventsComponent implements OnInit {
  events$: ObservableQueryResult<IEvent[], Error>;
  #eventsServive = inject(EventsService);

  ngOnInit(): void {
    this.events$ = this.#eventsServive.getEvents();
  }

  displayImage(image: IImage): string {
    return `${environment.apiUrl}uploads/events/${image.image_link}`;
  }
}
