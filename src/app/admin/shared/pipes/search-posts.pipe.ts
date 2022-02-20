import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../../shared/models/post.interface';

@Pipe({
	name: 'searchPosts',
})
export class SearchPostsPipe implements PipeTransform {
	transform(posts: Post[], search = ''): Post[] {
		if (!search.trim()) {
			return posts;
		}

		return posts.filter((post) => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
	}
}
