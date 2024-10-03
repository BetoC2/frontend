import { Component, Input, Output, EventEmitter } from '@angular/core';
import User from '../../../types/user';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent {
  @Input() user: User | null = null;
  @Output() clearUserEvent = new EventEmitter();

  cleanSelection() {
    this.clearUserEvent.emit();
  }
}
