import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../shared/services/auth.service';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';

describe('LoginPageComponent', () => {
	let component: LoginPageComponent;
	let fixture: ComponentFixture<LoginPageComponent>;
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LoginPageComponent],
			providers: [AuthService],
			imports: [
				HttpClientTestingModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes([{ path: 'admin/dashboard', component: DashboardPageComponent }]),
			],
		});

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(AuthService);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init form', () => {
		const componentSpy = spyOn<any>(component, 'initializeForm').and.callThrough();

		expect(componentSpy).not.toHaveBeenCalled();

		component.ngOnInit();

		expect(componentSpy).toHaveBeenCalledTimes(1);
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

	it('login method should be called if form is valid', () => {
		component.formGroup.controls['email'].setValue('admin@gmail.com');
		component.formGroup.controls['password'].setValue('qwerty');

		const authService = spyOn(service, 'login').and.returnValue(of(null));

		component.submit();

		expect(authService).toHaveBeenCalled();
	});
});
