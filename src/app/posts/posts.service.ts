import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  posts: Post[] = [];

  getPost() {
    return [...this.posts];
  }

  addPost(title: string, content: string) {
    let post: Post = { title: title, content: content };
    this.posts.push(post);
  }
}
