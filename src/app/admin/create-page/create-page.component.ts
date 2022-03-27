import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

export interface Post {
	id?: string;
	title: string;
	content: string;
	author: string;
	date: Date;
	tags?: string[];
}

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {
	formGroup!: FormGroup;

	constructor(private postsService: PostsService, private alertService: AlertService) {}

	get tags(): FormArray {
		return this.formGroup!.get('tags') as FormArray;
	}

	ngOnInit(): void {
		this.initializeForm();
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this.createPost();
	}

	addTag(): void {
		if (this.tags.invalid) {
			return;
		}

		const control = new FormControl('', [Validators.required, Validators.minLength(2)]);
		this.tags.push(control);
	}

	private createPost(): void {
		const post: Post = this.formGroup.value;
		post.date = new Date();

		this.postsService.createPost(post).subscribe(() => {
			this.formGroup.reset();
			this.alertService.success('Post has been created!');
		});
	}

	private initializeForm(): void {
		this.formGroup = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			content: new FormControl(null, [Validators.required]),
			author: new FormControl(null, [Validators.required]),
			tags: new FormArray([]),
		});
	}
}
