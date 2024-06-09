import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string | null = null;
  private errorSub: Subscription | any;

  constructor(private http: HttpClient, private postsService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage: string) => {
      this.error = errorMessage;
    });

    this.onFetchPosts();
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
    // this.onFetchPosts();
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error) => {
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
