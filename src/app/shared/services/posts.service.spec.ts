import { PostsService } from './posts.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../models/post.interface';

describe('PostsService', () => {
	let service: PostsService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PostsService],
			imports: [HttpClientTestingModule],
		});

		service = TestBed.inject(PostsService);
		httpController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get posts', () => {
		const postsResult: Post[] = [
			{
				author: 'admin',
				content: 'Some content',
				date: '2022-02-13T11:04:00.307Z',
				title: 'Some title',
				id: '-MvmkEcseIQ1T2bx7zN7',
			},
		];
		const postsResponse = {
			'-MvmkEcseIQ1T2bx7zN7': {
				author: 'admin',
				content: 'Some content',
				date: '2022-02-13T11:04:00.307Z',
				title: 'Some title',
			},
		};

		service.getPosts().subscribe((response) => expect(response).toEqual(postsResult));

		const request = httpController.expectOne((req) => req.url.includes('posts.json'));

		expect(request.request.method).toEqual('GET');

		request.flush(postsResponse);

		httpController.verify();
	});

	it('should get post by id', () => {
		const postId = '-MvmkEcseIQ1T2bx7zN7';
		const post: Post = {
			author: 'admin',
			content: 'Some content',
			date: '2022-02-13T11:04:00.307Z',
			title: 'Some title',
		};
		const postResult: Post = {
			author: 'admin',
			content: 'Some content',
			date: '2022-02-13T11:04:00.307Z',
			title: 'Some title',
			id: '-MvmkEcseIQ1T2bx7zN7',
		};
		service.getPostById(postId).subscribe((response) => expect(response).toEqual(postResult));

		const request = httpController.expectOne((req) => req.url.includes(`/posts/${postId}.json`));

		expect(request.request.method).toEqual('GET');

		request.flush(post);

		httpController.verify();
	});

	it('should remove post by id', () => {
		const postId = '-MvmkEcseIQ1T2bx7zN7';
		service.removePost(postId).subscribe();

		const request = httpController.expectOne((req) => req.url.includes(`/posts/${postId}.json`));

		expect(request.request.method).toEqual('DELETE');

		httpController.verify();
	});

	it('should create post', () => {
		const requestBody: Post = {
			title: 'Some title',
			content: 'Some content',
			author: 'admin',
			date: '2022-02-20T11:52:47.621Z',
		};
		const requestResult = {
			name: '-MwLyXnPsbPGJTx3eNFx',
		};
		const post = {
			title: 'Some title',
			content: 'Some content',
			author: 'admin',
			date: '2022-02-20T11:52:47.621Z',
			id: '-MwLyXnPsbPGJTx3eNFx',
		};
		service.createPost(requestBody).subscribe((response) => expect(response).toEqual(post));

		const request = httpController.expectOne((req) => req.url.includes('posts.json'));

		expect(request.request.method).toEqual('POST');

		request.flush(requestResult);

		httpController.verify();
	});

	it('should update post', () => {
		const requestBody = {
			title: 'new title',
			content: 'new content',
			author: 'admin',
			id: '-MwLyXnPsbPGJTx3eNFx',
		};
		service.updatePost(requestBody).subscribe((response) => expect(response).toEqual(requestBody));

		const request = httpController.expectOne((req) => req.url.includes(`/posts/${requestBody.id}.json`));

		expect(request.request.method).toEqual('PATCH');

		request.flush(requestBody);
	});
});
