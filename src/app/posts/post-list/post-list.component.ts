import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Post} from '../post.model';
import {PostService} from '../post.service';
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../auth/auth.service";

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
  userId: string;
  userIsAuthenticated=false;
  private postsSub: Subscription;
  private authStatusSub:Subscription;

  constructor(public postsService: PostService,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.userId=this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (postData:{posts: Post[],postCount:number})=>{
        this.isLoading=false;
        this.totalPosts=postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
        this.userId=this.authService.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    },()=>{
      this.isLoading=false;
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }
}
