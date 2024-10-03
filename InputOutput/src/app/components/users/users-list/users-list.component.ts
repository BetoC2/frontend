import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { UsersService } from '../../../services/users.service';

import User from '../../../types/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: User[] = [];  

  @Output() userSelectedEvent = new EventEmitter<User>();
  @Input() userSelected: number | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => {}
    });
  }

  selectUser(user: User) {
    this.userSelectedEvent.emit(user);
    this.userSelected = user.id;
  }
}
