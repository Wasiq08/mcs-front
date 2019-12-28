import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Hobbies';
  users: User[] = [];
  userSelected: User;

  constructor(private _UserService_: UserService) {}

  ngOnInit() {
    this._UserService_.getUsers().subscribe((users:any) => {
      this.users = users.data;
    });
  }

  selectedUser(user){
    this.userSelected = user;
  }

}
