import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Page } from '@testing';
import { Observable, of } from 'rxjs';
import { CoursesService } from 'src/app/courses/courses.service';

import { AuthService } from '@app/core';
import { IUser, User } from '@app/shared';
import { HeaderComponent } from './header.component';

class TestPage extends Page<HeaderComponent> {
  get logInButton(): HTMLButtonElement {
    return super.query<HTMLButtonElement>('.button-log-in');
  }
  get logOffButton(): HTMLButtonElement {
    return super.query<HTMLButtonElement>('.button-log-off');
  }
  get breadcrumbs(): HTMLElement {
    return super.query<HTMLElement>('app-breadcrumbs');
  }

  constructor(fixture: ComponentFixture<HeaderComponent>) {
    super(fixture);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let page: TestPage;
  let mockedUser: IUser;

  beforeEach(async(() => {
    mockedUser = new User(0, 'Ivan', 'Hrushevich');

    const authServiceStub: Partial<AuthService> = {
      get isAuthenticated$(): Observable<boolean> {
        return of(false);
      },
      login(): Observable<IUser> {
        return of(mockedUser);
      },
      logout(): Observable<IUser> {
        return of(mockedUser);
      },
      getUserInfo(): Observable<IUser> {
        return of(mockedUser);
      }
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }, { provide: CoursesService, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Log In" button and should not contain "Log Off" button when the user is not logged in', () => {
    expect(page.logInButton).toBeTruthy();
    expect(page.logOffButton).toBeFalsy();
  });

  it('should not contain breadcrumbs when the user is not logged in', () => {
    expect(page.breadcrumbs).toBeFalsy();
  });
});
