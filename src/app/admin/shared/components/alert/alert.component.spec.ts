import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertComponent } from './alert.component';
import { AlertEnum } from '../../enums/alert.enum';

describe('AlertComponent', () => {
	let fixture: ComponentFixture<AlertComponent>;
	let component: AlertComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AlertComponent],
		});

		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		component.alert = {
			content: 'Post was created!',
			type: AlertEnum.Success,
		};
		fixture.detectChanges();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should get alert', () => {
		const componentSpy = spyOn<any>(component, 'getAlert').and.callThrough();

		expect(componentSpy).not.toHaveBeenCalled();

		component.ngOnInit();

		expect(componentSpy).toHaveBeenCalledTimes(1);
	});

	it('shouldn show alert message if alert object exists', () => {
		const debugElement = fixture.debugElement.query(By.css('.alert')).nativeElement;

		expect(debugElement).toBeTruthy();
	});

	it('shouldn show green message if type of alert is success', () => {
		const debugElement = fixture.debugElement.query(By.css('.alert-success')).nativeElement;

		expect(debugElement).toBeTruthy();
	});
});
