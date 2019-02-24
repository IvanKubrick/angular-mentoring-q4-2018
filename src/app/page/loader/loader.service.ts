import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class LoaderService {
  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  private readonly loading: Subject<boolean> = new Subject<boolean>();

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }
}
