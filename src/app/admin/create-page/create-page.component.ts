import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/services/posts.service';

export interface Post {
	id?: string;
	title: string;
	content: string;
	author: string;
	date: Date;
}

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {
	formGroup!: FormGroup;

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.initializeForm();
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const post: Post = this.formGroup.value;
		post.date = new Date();

		this.postsService.create(post).subscribe(() => this.formGroup.reset());
	}

	private initializeForm(): void {
		this.formGroup = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			content: new FormControl(null, [Validators.required]),
			author: new FormControl(null, [Validators.required]),
		});
	}
}
