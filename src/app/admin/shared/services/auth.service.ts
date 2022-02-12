import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable()
export class AuthService {
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
			.pipe(tap(this.setToken));
	}

	logout(): void {
		this.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
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
