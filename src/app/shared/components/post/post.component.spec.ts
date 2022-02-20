import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Post } from '../../models/post.interface';

const post: Post = {
	id: 'Some id',
	title: 'Some title',
	content: 'Some content',
	author: 'author',
	date: new Date(),
};

describe('PostComponent', () => {
	let component: PostComponent;
	let fixture: ComponentFixture<PostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostComponent],
			imports: [RouterTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(PostComponent);
		component = fixture.componentInstance;
		component.post = post;
		fixture.detectChanges();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should show post card', () => {
		const cardElement = fixture.debugElement.query(By.css('.card')).nativeElement;

		expect(cardElement).toBeTruthy();
	});

	it('should show correct post title', () => {
		const cardElement = fixture.debugElement.query(By.css('.post-title'));
		const title = cardElement.nativeElement.textContent;

		expect(title).toBe(post.title);
	});
});
