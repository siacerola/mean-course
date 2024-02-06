import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent, post } from './posts/post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'mean-course';

  newPost = new post();
  storedPosts: post[] = [];

  onPostAdded(post: any) {
    this.newPost = post
    this.storedPosts.push(this.newPost)
    console.log(this.storedPosts);
    
  }
}
