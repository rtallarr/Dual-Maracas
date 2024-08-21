import { Component } from '@angular/core';
import { BlockListTableComponent } from '../../components/block-list-table/block-list-table.component';

@Component({
  selector: 'app-block-list',
  standalone: true,
  imports: [BlockListTableComponent],
  templateUrl: './block-list.component.html',
  styleUrl: './block-list.component.css'
})
export class BlockListComponent {
  //duradel data
  currentWeight: number = 311;
  currentPoints: number = (750 + 524*3 + 375*8 + 225*9 + 10*80 + 15*899)/1000;
}


/*
DURADEL
1000
250 - 500 - 750
100 - 200 - 300 - 400  - 600 - 700 - 800 - 900
50 - 150 - 250 - 350 - 450 - 550 - 650 - 850 - 950 
10 - 20 - 30 - 40 - 60 - 70 - 80 - 90 - 110 - 120 - 130 - 140 - 160 - 170 - 180 - 190 - 210 - 220 - 230 - 240 - 260 - 270 - 280 - 290 - 310 - 320 - 330 - 340 - 360 - 370 - 380 - 390 - 410 - 420 - 430 - 440 - 460 - 470 - 480 - 490 - 510 - 520 - 530 - 540 - 560 - 570 - 580 - 590 - 610 - 620 - 630 - 640 - 660 - 670 - 680 - 690 - 710 - 720 - 730 - 740 - 760 - 770 - 780 - 790 - 810 - 820 - 830 - 840 - 860 - 870 - 880 - 890 - 910 - 920 - 930 - 940 - 960 - 970 - 980 - 990
*/