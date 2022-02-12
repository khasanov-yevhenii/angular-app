import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	formGroup!: FormGroup;
	submitted = false;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.initializeForm();
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this.submitted = true;
		const user: User = this.formGroup.value;

		this.authService
			.login(user)
			.pipe(
				finalize(() => {
					this.submitted = false;
					this.formGroup.reset();
				})
			)
			.subscribe(() => this.router.navigate(['/admin', 'dashboard']));
	}

	private initializeForm(): void {
		this.formGroup = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}
}
