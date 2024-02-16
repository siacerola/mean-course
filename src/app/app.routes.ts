import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

export const routes: Routes = [

    { path: 'list', component: PostListComponent },
    { path: 'create', component: PostCreateComponent }
];
