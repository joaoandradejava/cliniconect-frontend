import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('1s 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),

        ]))
      ])),


    ])
  ]
})
export class HeaderComponent implements OnInit {

  estado: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
