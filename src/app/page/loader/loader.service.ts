import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class LoaderService {
  loading: Subject<boolean> = new Subject<boolean>();
}
