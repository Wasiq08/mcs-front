import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/services/user/user.service';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() users: User[];
  @Output() userSelected: EventEmitter<User> = new EventEmitter<User>();;
  name: String;
  selectedUser: User;

  constructor(private _UserService_: UserService) { }

  ngOnInit() {

  }

  addUser() {
    let user: User = {} as any;
    user.name = this.name;

    this._UserService_.addUser(user).subscribe((result: any) => {
      if (result.success === true) {
        this.name = '';
        this._UserService_.getUsers().subscribe((users: any) => {
          this.users = users.data;
        });
      }
    });
  }

  /**
   * select/unselect user from list
   * @param index number
   */
  selectUser(index: number) {

    if (this.users[index]) {
      this.selectedUser = this.users[index];
      this.userSelected.emit(this.selectedUser);
    }
  }



}
