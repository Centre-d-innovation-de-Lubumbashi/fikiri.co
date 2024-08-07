import { Component, OnInit } from '@angular/core';
import { SolutionsStore } from './data-access/solutions.store';
import { Observable } from 'rxjs';
import { ISolutionsStore } from './types/solutions-store.type';
import { AsyncPipe, NgIf, NgOptimizedImage, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ISolution } from '../../../../../shared/types/models-interfaces';

@Component({
  selector: 'app-solutions',
  standalone: true,
  providers: [SolutionsStore],
  imports: [NgIf, AsyncPipe, RouterLink, NgOptimizedImage, DatePipe],
  templateUrl: './solutions.component.html'
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<ISolutionsStore> = this.store.vm$;

  constructor(private store: SolutionsStore) {}

  ngOnInit(): void {
    this.store.getSolutions();
  }
  displayImage(solution: ISolution): string {
    return `${environment.apiUrl}/uploads/solutions/${solution.images.at(-1)?.image_link}`;
  }
}
