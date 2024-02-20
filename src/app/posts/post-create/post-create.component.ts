import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

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
    ReactiveFormsModule,
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

  form!: FormGroup;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });

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
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        });


      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = null;
        console.log(this.mode);

      }
    });
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    // 
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(this.postId!, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }
}
