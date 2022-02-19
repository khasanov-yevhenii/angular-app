import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from './main-layout.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('PostComponent', () => {
	let component: MainLayoutComponent;
	let fixture: ComponentFixture<MainLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MainLayoutComponent],
			imports: [RouterTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MainLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should contain navbar', () => {
		const navbar = fixture.debugElement.query(By.css('.navbar')).nativeElement;

		expect(navbar).toBeDefined();
	});

	it('should contain router-outlet', () => {
		const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet)).nativeElement;

		expect(routerOutlet).toBeDefined();
	});
});
