import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf } from '@angular/common';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, NgFor, NgIf, MatButtonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: "first post", content: "this is the first post's content" },
  //   { title: "second post", content: "this is the second post's content" },
  //   { title: "third post", content: "this is the third post's content" }
  // ]

  posts: Post[] = [];
  isLoading: boolean = false;
  private postsSubs: Subscription = new Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false
        this.posts = posts
      });
  }

  onDelete(postId: string) { this.postsService.deletePost(postId) }

  ngOnDestroy(): void {
    this.postsSubs.unsubscribe();
  }
}
