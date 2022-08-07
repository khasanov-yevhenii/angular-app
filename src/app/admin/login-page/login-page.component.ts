import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
	formGroup!: UntypedFormGroup;
	submitted = false;

	constructor(public authService: AuthService, private router: Router) {}

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
			.pipe(finalize(() => (this.submitted = false)))
			.subscribe(() => {
				this.formGroup.reset();
				this.router.navigate(['/admin', 'dashboard']);
			});
	}

	private initializeForm(): void {
		this.formGroup = new UntypedFormGroup({
			email: new UntypedFormControl(null, [Validators.required, Validators.email]),
			password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}
}
