import { Component, Input } from '@angular/core';
import { TimeComponent } from '../../shared/components/time/time.component';
import { HomeService } from '../../services/home.service';
import { ITodo } from '../../interfaces/todo';
import { IComment } from '../../interfaces/comment';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimeComponent, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  time: string = '';
  listTodo: ITodo[] = [];
  listComent: IComment[] = [];

  @Input()
  set id(id: string) {
    console.log('Id From Parent', id);
  }

  constructor(private readonly homeService: HomeService) {}

  getAllTodo(): void {
    this.homeService.getAllTodo().subscribe({
      next: (data) => {
        this.listTodo = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getComents(): void {
    this.homeService.getAllComment(4, 'Mariana_Orn@preston.org').subscribe({
      next: (data) => {
        this.listComent = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);

    this.getAllTodo();
    this.getComents();

    // this.activatedRoute.paramMap.subscribe((params) =>
    //   console.log(`Params: ${params.get('id')}`)
    // );
  }

  updateTime() {
    const currentDate = new Date();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const timeString = `${hours}:${minutes}:${seconds}`;

    this.time = timeString;
  }

  refreshData() {
    this.getComents();
  }
}
