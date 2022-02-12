import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent {}
