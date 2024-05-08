import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { HighlightDirective } from '../../directive/highlight.directive';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-directive',
  standalone: true,
  imports: [
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    NgClass,
    NgFor,
    NgIf,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatGridListModule,
    RouterLink,
    HighlightDirective,
    MatRadioModule,
  ],
  templateUrl: './directive.component.html',
  styleUrl: './directive.component.scss',
})
export class DirectiveComponent {
  showFiller = false;
  currentPage: string = 'Home';
  titleChange: boolean = false;

  menus = [
    {
      name: 'Home',
      icon: 'home',
      url: '/home',
    },
    {
      name: 'User',
      icon: 'info',
      url: '/user',
    },
    {
      name: 'Login',
      icon: 'dashboard',
      url: '/user',
    },
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard',
    },
  ];

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  canSave = true;
  isSpecial = true;
  isUnchanged = true;
  currentClasses: Record<string, boolean> = {};
  currentStyles: Record<string, string> = {};

  color = 'yellow';

  radioValue: string = '';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    // this.setCurrentClasses();

    this.masterService.getTodos(1).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // setCurrentClasses() {
  //   this.currentClasses = {
  //     saveable: this.canSave,
  //     modified: !this.isUnchanged,
  //     special: this.isSpecial,
  //   };
  // }

  setCurrentStyles() {
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    };
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  changeTitle() {
    this.titleChange = !this.titleChange;
  }

  onRadioChange($event: MatRadioChange) {
    switch ($event.value) {
      case 'tingkiwingky':
        this.currentClasses = {
          'color-purple': true,
          'shape-3': true,
        };
        break;
      case 'dipsy':
        this.currentClasses = {
          'color-green': true,
          'shape-2': true,
        };
        break;
      case 'lala':
        this.currentClasses = {
          'color-yellow': true,
          'shape-1': true,
        };
        break;
      default:
        break;
    }
  }
}
