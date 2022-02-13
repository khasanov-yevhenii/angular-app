import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../create-page/create-page.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	posts: Post[] = [];

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.getPosts();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private getPosts(): void {
		this.subscription.add(this.postsService.getPosts().subscribe((posts) => (this.posts = posts)));
	}
}
