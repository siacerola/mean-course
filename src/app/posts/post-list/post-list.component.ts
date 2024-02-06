import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  posts = [
    { title: "first post", content: "this is the first post's content" },
    { title: "second post", content: "this is the second post's content" },
    { title: "third post", content: "this is the third post's content" }
  ]
}
