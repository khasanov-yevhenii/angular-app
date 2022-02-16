import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
	let component: LoginPageComponent;
	let fixture: ComponentFixture<LoginPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
			declarations: [LoginPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeDefined();
	});

	it('should create form with email and password controls', () => {
		const isContainEmail = component.formGroup.contains('email');
		const isContainPassword = component.formGroup.contains('password');

		expect(isContainEmail).toBeTruthy();
		expect(isContainPassword).toBeTruthy();
	});

	it('should highlight inputs if values is empty', () => {
		const controlEmail = component.formGroup.controls['email'];
		const controlPassword = component.formGroup.controls['email'];

		expect(controlEmail.invalid).toBeTruthy();
		expect(controlPassword.invalid).toBeTruthy();
	});

	it('the form should not be submitted if it is not valid', () => {
		component.submit();

		expect(component.submitted).toBeFalsy();
	});

	it('the form should be submitted if it is valid', () => {
		component.formGroup.controls['email'].setValue('admin@gmail.com');
		component.formGroup.controls['password'].setValue('qwerty');
		component.submit();

		expect(component.submitted).toBeTruthy();
	});
});
