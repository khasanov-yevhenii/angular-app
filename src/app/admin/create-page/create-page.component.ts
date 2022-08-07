import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

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
	formGroup!: UntypedFormGroup;

	constructor(private postsService: PostsService, private alertService: AlertService) {}

	ngOnInit(): void {
		this.initializeForm();
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this.createPost();
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
		this.formGroup = new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.required]),
			content: new UntypedFormControl(null, [Validators.required]),
			author: new UntypedFormControl(null, [Validators.required]),
		});
	}
}
