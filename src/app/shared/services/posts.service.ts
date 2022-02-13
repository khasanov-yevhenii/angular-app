import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../../admin/create-page/create-page.component';
import { environment } from '../../../environments/environment';
import { CreatePostResponse } from '../models/create-post-response.interface';
import { GetPostsResponse } from '../../admin/shared/models/get-posts-response.interface';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor(private http: HttpClient) {}

	create(post: Post): Observable<Post> {
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
}
