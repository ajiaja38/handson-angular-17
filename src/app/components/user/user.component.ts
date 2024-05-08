import { CurrencyPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Boss } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  isLogin = true;
  role = 'boss';
  fotoRakyat =
    'https://cdn.antaranews.com/cache/1200x800/2024/02/16/komeng.jpeg.webp';
  buttonDisabled = false;
  logoUrl: string = '/assets/wp.jpg';
  bosses: Boss[] = [];
  yesClicked = false;

  error!: string;
  complete: boolean = false;

  @Input() occupation: string = '';
  @Input() imageUrl: string = '';
  @Output() onNotify = new EventEmitter<string>();

  constructor(private readonly userService: UserService) {
    this.userService.getBosses().subscribe({
      next: (data) => (this.bosses = data),
      error: (error: Error) => (this.error = error.message),
      complete: () => (this.complete = true),
    });
  }

  sendNotify() {
    this.onNotify.emit('Spontan Uhuy');
  }

  ngOnChanges(): void {
    this.bosses[1].foto = this.imageUrl;
  }

  onClickNo() {
    this.buttonDisabled = !this.buttonDisabled;
  }

  onClickYes() {
    const selectedBoss = this.bosses.find((data) => data.name === 'Aji');
    if (selectedBoss) {
      selectedBoss.imageSize = 200;
    }
  }
}
