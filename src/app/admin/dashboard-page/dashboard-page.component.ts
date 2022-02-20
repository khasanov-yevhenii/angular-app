import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { Post } from '../../shared/models/post.interface';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	posts: Post[] = [];
	searchQuery = '';

	constructor(private postsService: PostsService, private alertService: AlertService) {}

	ngOnInit(): void {
		this.getPosts();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	removePost(postId: string | undefined): void {
		if (!postId) {
			return;
		}

		this.subscription.add(
			this.postsService.removePost(postId).subscribe(() => {
				this.posts = this.posts.filter((post) => post.id !== postId);
				this.alertService.danger('Post has been removed!');
			})
		);
	}

	private getPosts(): void {
		this.subscription.add(this.postsService.getPosts().subscribe((posts) => (this.posts = posts)));
	}
}
