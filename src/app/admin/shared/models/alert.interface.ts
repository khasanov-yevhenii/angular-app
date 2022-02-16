import { AlertEnum } from '../enums/alert.enum';

export interface Alert {
	content: string;
	type: AlertEnum;
}
