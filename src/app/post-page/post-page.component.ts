import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post.interface';

@Component({
	selector: 'app-post-page',
	templateUrl: './post-page.component.html',
	styleUrls: ['./post-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit {
	post$!: Observable<Post>;

	constructor(private postsService: PostsService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		const postId = this.route.snapshot.params['id'];
		this.post$ = this.postsService.getPostById(postId);
	}
}
