import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Post } from '../post.model';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  post: Post | any;
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId!: string | null;
  isLoading: boolean = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';

        this.postId = paramMap.get('postId');

        // 
        this.isLoading = true;
        this.postsService.getPost(this.postId!).subscribe(postData => {

          // 
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = null;
        console.log(this.mode);

      }
    });
  }
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // 
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId!, form.value.title, form.value.content);
    }

    form.resetForm();
  }
}
