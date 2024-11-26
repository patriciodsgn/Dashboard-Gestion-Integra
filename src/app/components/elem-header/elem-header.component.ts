import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-header',
  standalone: true,
  imports: [],
  templateUrl: './elem-header.component.html',
  styleUrl: './elem-header.component.css'
})
export class ElemHeaderComponent {
  @Input() htitle: string = '';
  @Input() hsubtitle: string = '';
}


