import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-note1',
  standalone: true,
  imports: [],
  templateUrl: './elem-note1.component.html',
  styleUrl: './elem-note1.component.css'
})
export class ElemNote1Component {
  
  @Input() en1_bg_color: string = '#fde68a';
  @Input() en1_text_color: string = '#fbbf24';
  @Input() en1_border_color: string = '#d97706';
  @Input() en1_text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}




