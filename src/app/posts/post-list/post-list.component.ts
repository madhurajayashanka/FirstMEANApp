import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Post} from '../post.model';
import {PostService} from '../post.service';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  posts:Post[] = [];
  isLoading=false;
  totalPosts=0;
  postPerPage=2;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  private postsSub: Subscription;
  constructor(public postsService: PostService) {
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (postData:{posts: Post[],postCount:number})=>{
        this.isLoading=false;
        this.totalPosts=postData.postCount;
        this.posts = postData.posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }
}
