import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Page } from '@testing';

import { LoginPageComponent } from './login-page.component';

class TestPage extends Page<TestHostComponent> {
  get form(): HTMLFormElement {
    return super.query<HTMLFormElement>('form');
  }
  get inputEmail(): HTMLInputElement {
    return super.query<HTMLInputElement>('.login-card__email');
  }
  get inputPassword(): HTMLInputElement {
    return super.query<HTMLInputElement>('.login-card__password');
  }
  get submitButton(): HTMLInputElement {
    return super.query<HTMLInputElement>('.login-card__button');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <app-login-page></app-login-page>
  `
})
class TestHostComponent {}

describe('LoginPageComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [TestHostComponent, LoginPageComponent],
      providers: [{ provide: AuthService, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid if it is populated with valid data', () => {
    page.inputEmail.value = 'testemail@gmail.com';
    page.inputPassword.value = 'password123';
    page.inputEmail.dispatchEvent(new Event('input'));
    page.inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(page.form.classList).toContain('ng-valid');
  });

  it('form should be invalid initially when fields were not populated', () => {
    expect(page.form.classList).toContain('ng-invalid');
  });

  it('form should be invalid if password is invalid', () => {
    page.inputEmail.value = 'testemail@gmail.com';
    page.inputPassword.value = 'pass';
    page.inputEmail.dispatchEvent(new Event('input'));
    page.inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(page.form.classList).toContain('ng-invalid');
  });

  it('form should be invalid if email is invalid', () => {
    page.inputEmail.value = 'testemailgmail.com';
    page.inputPassword.value = 'password123';
    page.inputEmail.dispatchEvent(new Event('input'));
    page.inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(page.form.classList).toContain('ng-invalid');
  });
});
