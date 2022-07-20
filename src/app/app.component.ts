import {Component, OnInit} from '@angular/core';

import {Post} from "./posts/post.model";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storedPosts: Post[]=[];
  onPostAdded(post){
    this.storedPosts.push(post)
  }
  constructor(private authService:AuthService) {

  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
