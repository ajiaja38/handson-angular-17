import { Component, isDevMode } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TimePipe } from './pipes/time.pipe';
import { Observable } from 'rxjs';
import { TimeComponent } from './shared/components/time/time.component';
import { AuthModule } from './modules/auth/auth.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    UserComponent,
    DatePipe,
    TimePipe,
    AsyncPipe,
    TimeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'handson-angular';
  newImage: string =
    'https://kompaspedia.kompas.id/wp-content/uploads/2022/10/20190808RAD35-892x540.jpg';
  notify = 'Explore the Docs';

  date: string | number | Date = new Date();

  date$: Observable<Date> = new Observable();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('I am in dev mode');
    } else {
      console.log('I am in prod mode');
    }
  }

  changeImage() {
    this.newImage =
      'https://awsimages.detik.net.id/visual/2022/06/21/megawati-di-rakernas-ii-pdi-perjuangan-desa-kuat-indonesia-maju-dan-berdaulat-21-juni-2022-15_169.png?w=650';
  }

  getNotify($event: string) {
    this.notify = $event;
  }

  goToHome() {
    this.router.navigate(['home', { id: 123 }], {
      relativeTo: this.activatedRoute,
    });
  }
}
