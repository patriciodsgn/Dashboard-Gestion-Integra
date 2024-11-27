import { Component } from '@angular/core';

import { ElemDraw01Component } from '../elem-draw-01/elem-draw-01.component';
import { ElemDraw02Component } from '../elem-draw-02/elem-draw-02.component';
import { ElemDraw03Component } from '../elem-draw-03/elem-draw-03.component';
import { ElemDraw04Component } from '../elem-draw-04/elem-draw-04.component';
import { ElemDraw05Component } from '../elem-draw-05/elem-draw-05.component';

import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';

@Component({
  selector: 'app-panel-educacion-nee',
  standalone: true,
  imports: [
    ElemDraw01Component,
    ElemDraw02Component,
    ElemDraw03Component,
    ElemDraw04Component,
    ElemDraw05Component,
    ElemCardGrid1Component,
  ],
  templateUrl: './panel-educacion-nee.component.html',
  styleUrls: ['./panel-educacion-nee.component.css']
})
export class PanelEducacionNeeComponent {
  cardGridBgColor: string = '#fdba74';
  cardBgColor: string = '#ffffff';
  cardTextColor1: string = '#431407';
  cardTextColor2: string = '#431407';  

  cardValue1: string = '27.000';
  cardLabel1: string = 'Jardines';

  cardValue2: string = '80.000';
  cardLabel2: string = 'Matrícula Nacional';

  cardValue3: string = '10.000';
  cardLabel3: string = '# de niñas y niños pertenecientes a pueblos originarios';

  cardValue4: string = '5.297';
  cardLabel4: string = '# de niñas y niños con nacionalidad extranjera';

  cardValue5: string = '500';
  cardLabel5: string = 'Establecimientos con Reconocimiento Oficial';

  cardValue6: string = '400';
  cardLabel6: string = 'Establecimientos con Sellos Verdes';


}
