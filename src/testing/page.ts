import { ComponentFixture } from '@angular/core/testing';

// tslint:disable: no-unsafe-any
export abstract class Page<P> {
  constructor(protected _fixture: ComponentFixture<P>) {}

  protected query<T>(selector: string): T {
    return this._fixture.nativeElement.querySelector(selector);
  }

  protected queryAll<T>(selector: string): T[] {
    return this._fixture.nativeElement.querySelectorAll(selector);
  }
}
