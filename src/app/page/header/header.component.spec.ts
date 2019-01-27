import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AuthService } from '@app/core';
import { IUser, User } from '@app/shared';
import { HeaderComponent } from './header.component';

/* tslint:disable:mocha-no-side-effect-code */

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const authServiceStub: Partial<AuthService> = {
      get isAuthenticated(): Observable<boolean> {
        return of(true);
      },
      login(): Observable<IUser> {
        const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

        return of(mockedUser);
      },
      logout(): Observable<IUser> {
        const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

        return of(mockedUser);
      },
      getUserInfo(): Observable<IUser> {
        const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

        return of(mockedUser);
      }
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "courses" title', () => {
    const logoTitleDe: DebugElement = fixture.debugElement.query(By.css('.header-logo__title'));
    const logoTitleEl: HTMLSpanElement = <HTMLSpanElement>logoTitleDe.nativeElement;
    expect(logoTitleEl.textContent).toEqual('courses');
  });

  it('should contain button titled "Log Off"', () => {
    const buttonLogOffDe: DebugElement = fixture.debugElement.query(By.css('.button-log-off'));
    const buttonLogOffEl: HTMLButtonElement = <HTMLButtonElement>buttonLogOffDe.nativeElement;
    expect(buttonLogOffEl.textContent).toEqual('Log Off');
  });
});
