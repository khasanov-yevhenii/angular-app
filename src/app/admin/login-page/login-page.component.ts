import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../models/user.interface';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	formGroup!: FormGroup;

	ngOnInit(): void {
		this.initializeForm();
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const user: UserInterface = this.formGroup.value;
		console.log(user);
	}

	private initializeForm(): void {
		this.formGroup = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}
}
