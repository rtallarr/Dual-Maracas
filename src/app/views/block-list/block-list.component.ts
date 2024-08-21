import { Component } from '@angular/core';
import { BlockListTableComponent } from '../../components/block-list-table/block-list-table.component';

export interface TaskData {
  id: string;
  name: string;
  status: string;
  weight: number;
  chance?: number;
}

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

  DuradelTasks: TaskData[] = [
    {id: '1', name: 'Aberrant spectres', status: 'Active', weight: 7},
    {id: '2', name: 'Abyssal Demon', status: 'Active', weight: 12},
    {id: '3', name: 'Adamant dragons', status: 'Active', weight: 2},
    {id: '4', name: 'Ankou', status: 'Active', weight: 5},
    {id: '5', name: 'Aviansies', status: 'Locked', weight: 8},
    {id: '6', name: 'Basilisks', status: 'Locked', weight: 7},
    {id: '7', name: 'Black demons', status: 'Active', weight: 8},
    {id: '8', name: 'Black dragons', status: 'Active', weight: 9},
    {id: '9', name: 'Boss', status: 'Locked', weight: 12},
    {id: '11', name: 'Bloodvelds', status: 'Active', weight: 8},
    {id: '12', name: 'Blue dragons', status: 'Active', weight: 4},
    {id: '13', name: 'Cave horros', status: 'Active', weight: 4},
    {id: '14', name: 'Cave kraken', status: 'Active', weight: 9},
    {id: '15', name: 'Dagannoth', status: 'Active', weight: 9},
    {id: '16', name: 'Dark beasts', status: 'Active', weight: 11},
    {id: '17', name: 'Drakes', status: 'Active', weight: 8},
    {id: '18', name: 'Dust devils', status: 'Active', weight: 5},
    {id: '19', name: 'Elves', status: 'Active', weight: 4},
    {id: '20', name: 'Fire giants', status: 'Active', weight: 7},
    {id: '21', name: 'Fossil Island Wyverns', status: 'Active', weight: 7},
    {id: '22', name: 'Gargoyles', status: 'Active', weight: 8},
    {id: '23', name: 'Greater demons', status: 'Active', weight: 9},
    {id: '24', name: 'Hellhounds', status: 'Active', weight: 10},
    {id: '25', name: 'Iron dragons', status: 'Active', weight: 5},
    {id: '26', name: 'Kalphites', status: 'Active', weight: 9},
    {id: '27', name: 'Kurasks', status: 'Active', weight: 4},
    {id: '28', name: 'Lizardmen', status: 'Active', weight: 10},
    {id: '29', name: 'Mithril dragons', status: 'Locked', weight: 9},
    {id: '30', name: 'Mutated Zygomites', status: 'Active', weight: 2},
    {id: '31', name: 'Nechryael', status: 'Active', weight: 9},
    {id: '32', name: 'Red dragons', status: 'Locked', weight: 8},
    {id: '33', name: 'Rune dragons', status: 'Active', weight: 2},
    {id: '34', name: 'Skeletal wyverns', status: 'Active', weight: 7},
    {id: '35', name: 'Smoke devils', status: 'Active', weight: 9},
    {id: '36', name: 'Spiritual creatures', status: 'Active', weight: 7},
    {id: '37', name: 'Steel dragons', status: 'Active', weight: 7},
    {id: '38', name: 'Suqahs', status: 'Active', weight: 8},
    {id: '39', name: 'Trolls', status: 'Active', weight: 6},
    {id: '40', name: 'TzHaar', status: 'Locked', weight: 10},
    {id: '41', name: 'Vampyres', status: 'Locked', weight: 8},
    {id: '42', name: 'Warped creatures', status: 'Active', weight: 2},
    {id: '43', name: 'Waterfiends', status: 'Active', weight: 2},
    {id: '44', name: 'Wyrms', status: 'Active', weight: 8},
  ];
  
}


/*
DURADEL
1000
250 - 500 - 750
100 - 200 - 300 - 400  - 600 - 700 - 800 - 900
50 - 150 - 250 - 350 - 450 - 550 - 650 - 850 - 950 
10 - 20 - 30 - 40 - 60 - 70 - 80 - 90 - 110 - 120 - 130 - 140 - 160 - 170 - 180 - 190 - 210 - 220 - 230 - 240 - 260 - 270 - 280 - 290 - 310 - 320 - 330 - 340 - 360 - 370 - 380 - 390 - 410 - 420 - 430 - 440 - 460 - 470 - 480 - 490 - 510 - 520 - 530 - 540 - 560 - 570 - 580 - 590 - 610 - 620 - 630 - 640 - 660 - 670 - 680 - 690 - 710 - 720 - 730 - 740 - 760 - 770 - 780 - 790 - 810 - 820 - 830 - 840 - 860 - 870 - 880 - 890 - 910 - 920 - 930 - 940 - 960 - 970 - 980 - 990
*/