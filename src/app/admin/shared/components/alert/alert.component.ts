import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AlertEnum } from '../../enums/alert.enum';
import { Alert } from '../../models/alert.interface';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	@Input() delay = 5000;
	alert: Nullable<Alert>;
	alertEnum = AlertEnum;

	constructor(private alertService: AlertService, private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.getAlert();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private getAlert(): void {
		this.subscription.add(
			this.alertService.alert$.subscribe((alert: Alert) => {
				this.alert = alert;
				this.changeDetectorRef.detectChanges();

				const timeout = setTimeout(() => {
					clearTimeout(timeout);
					this.alert = null;
					this.changeDetectorRef.detectChanges();
				}, this.delay);
			})
		);
	}
}
