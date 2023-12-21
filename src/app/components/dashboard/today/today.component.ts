import { Component } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent {
  today: Date = new Date();
  dayOfTheWeek = '';
  numberOfTasks = 2;
  isAddTaskClicked = false;

  ngOnInit(): void {
    this.dayOfTheWeek = this.getDayOfTheWeek();
  }

  getDayOfTheWeek(): string {
    const days: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[this.today.getDay()];
  }

  onAddTask(): void {
    this.isAddTaskClicked = true;
  }
}
