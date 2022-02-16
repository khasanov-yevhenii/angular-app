import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../admin/create-page/create-page.component';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post!: Post;
}
