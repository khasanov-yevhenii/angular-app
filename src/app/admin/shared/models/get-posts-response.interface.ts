import { Post } from '../../../shared/models/post.interface';

export interface GetPostsResponse {
	[key: string]: Post;
}
