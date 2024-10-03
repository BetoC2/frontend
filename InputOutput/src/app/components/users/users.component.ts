import { Component } from '@angular/core';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import User from '../../types/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersDetailsComponent, UsersListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  selectedUser: User | null = null;
  selectedUserId: number | null = null;

  selectUser(user: User) {
    this.selectedUser = user;
    this.selectedUserId = user.id;
  }

  clearSelection() {
    this.selectedUser = null;
    this.selectedUserId = null;
  }
}
