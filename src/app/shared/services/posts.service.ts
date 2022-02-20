import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePostResponse } from '../models/create-post-response.interface';
import { GetPostsResponse } from '../../admin/shared/models/get-posts-response.interface';
import { Post } from '../models/post.interface';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor(private http: HttpClient) {}

	createPost(post: Post): Observable<Post> {
		return this.http.post<CreatePostResponse>(`${environment.baseUrl}/posts.json`, post).pipe(
			map((response) => ({
				...post,
				id: response.name,
			}))
		);
	}

	getPosts(): Observable<Post[]> {
		return this.http.get<GetPostsResponse>(`${environment.baseUrl}/posts.json`).pipe(
			map((response) =>
				Object.keys(response).map((key) => ({
					...response[key],
					id: key,
				}))
			)
		);
	}

	removePost(postId: string): Observable<void> {
		return this.http.delete<void>(`${environment.baseUrl}/posts/${postId}.json`);
	}

	getPostById(postId: string): Observable<Post> {
		return this.http
			.get<Post>(`${environment.baseUrl}/posts/${postId}.json`)
			.pipe(map((post) => ({ ...post, id: postId })));
	}

	updatePost(post: Post): Observable<Post> {
		return this.http.patch<Post>(`${environment.baseUrl}/posts/${post.id}.json`, post);
	}
}
