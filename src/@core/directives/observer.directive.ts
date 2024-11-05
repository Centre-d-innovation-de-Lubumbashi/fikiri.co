import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appObserveVisibility]',
  standalone: true
})
export class ObserveVisibilityDirective implements OnDestroy, AfterViewInit {
  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) {
    this.createObserver();
  }

  ngAfterViewInit(): void {
    this.startObservingElements();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
    this.subject$.unsubscribe();
  }

  private isVisible(element: HTMLElement): Promise<boolean> {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });
      observer.observe(element);
    });
  }

  private createObserver(): void {
    const options = {
      rootMargin: '0px',
      threshold: 0.17
    };
    if (typeof window === 'undefined') return;
    const isIntersecting = (entry: IntersectionObserverEntry) => entry.isIntersecting || entry.intersectionRatio > 0;
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private startObservingElements(): void {
    if (!this.observer) return;
    this.observer.observe(this.element.nativeElement);
    this.subject$.subscribe(async ({ entry, observer }) => {
      const target = entry.target as HTMLElement;
      target.classList.replace('hidde', 'show');
      const isStillVisible = await this.isVisible(target);
      if (isStillVisible) observer.unobserve(target);
    });
  }
}
