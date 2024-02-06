import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPost() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    let post: Post = { title: title, content: content };
    this.posts.push(post);

    this.postsUpdated.next([...this.posts]);
  }
}
