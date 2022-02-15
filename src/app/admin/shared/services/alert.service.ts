import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert.interface';
import { AlertEnum } from '../enums/alert.enum';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	alert$ = new Subject<Alert>();

	success(content: string): void {
		this.alert$.next({ content, type: AlertEnum.Success });
	}

	danger(content: string): void {
		this.alert$.next({ content, type: AlertEnum.Danger });
	}
}
