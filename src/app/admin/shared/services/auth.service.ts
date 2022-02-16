import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../models/auth-response.interface';
import { ErrorCodesEnum } from '../enums/error-codes.enum';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public error$ = new Subject<string>();

	constructor(private http: HttpClient) {}

	get token(): string | null {
		const expiresTime = new Date(localStorage.getItem('fb-expiresTime') ?? '');

		if (new Date() > expiresTime) {
			this.logout();
			return null;
		}

		return localStorage.getItem('fb-idToken') ?? null;
	}

	login(user: User): Observable<AuthResponse | null> {
		user.returnSecureToken = true;

		return this.http
			.post<AuthResponse | null>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
				user
			)
			.pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
	}

	logout(): void {
		this.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		const { message } = error.error.error;

		switch (message) {
			case ErrorCodesEnum.EMAIL_NOT_FOUND:
				this.error$.next('email not found');
				break;
			case ErrorCodesEnum.INVALID_EMAIL:
				this.error$.next('invalid email');
				break;
			case ErrorCodesEnum.INVALID_PASSWORD:
				this.error$.next('invalid password');
				break;
		}

		return throwError(error);
	}

	private setToken(response: AuthResponse | null): void {
		if (!response) {
			localStorage.clear();
			return;
		}

		const currentTime = new Date().getTime();
		const expiresTime = new Date(currentTime + Number(response.expiresIn) * 1000);

		localStorage.setItem('fb-idToken', response.idToken);
		localStorage.setItem('fb-expiresTime', String(expiresTime));
	}
}
