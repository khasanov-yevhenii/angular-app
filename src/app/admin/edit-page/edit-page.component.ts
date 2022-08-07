import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../create-page/create-page.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	formGroup!: UntypedFormGroup;
	post!: Post;
	submitted = false;

	constructor(
		private route: ActivatedRoute,
		private postsService: PostsService,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.params['id'];

		this.getPostById(id);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getPostById(postId: string): void {
		this.subscription.add(
			this.postsService
				.getPostById(postId)
				.pipe(finalize(() => this.changeDetectorRef.detectChanges()))
				.subscribe((post) => {
					this.post = post;
					this.initializeForm(post);
				})
		);
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		this.submitted = true;
		this.updatePost();
	}

	private updatePost(): void {
		const updatedPost: Post = {
			...this.formGroup.value,
			author: this.post.author,
			id: this.post.id,
		};

		this.subscription.add(
			this.postsService
				.updatePost(updatedPost)
				.pipe(
					finalize(() => {
						this.submitted = false;
						this.changeDetectorRef.detectChanges();
					})
				)
				.subscribe()
		);
	}

	private initializeForm(post: Post): void {
		this.formGroup = new UntypedFormGroup({
			title: new UntypedFormControl(post.title, [Validators.required]),
			content: new UntypedFormControl(post.content, [Validators.required]),
		});
	}
}
