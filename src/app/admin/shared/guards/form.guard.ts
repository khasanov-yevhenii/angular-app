import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditPageComponent } from '../../edit-page/edit-page.component';

@Injectable({
	providedIn: 'root',
})
export class FormGuard implements CanDeactivate<EditPageComponent> {
	canDeactivate(component: EditPageComponent): boolean {
		const isFormTouched = component.formGroup.dirty;
		return !isFormTouched || confirm('You have unsaved changes. Are you sure you want to leave page?');
	}
}
