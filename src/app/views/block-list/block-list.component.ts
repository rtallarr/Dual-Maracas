import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { BlockListTableComponent } from '../../components/block-list-table/block-list-table.component';
import { AccountSettingsComponent } from '../../components/account-settings/account-settings.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { Quest } from '../../models/slayer.type';
import { SlayerMaster } from '../../models/slayer.type';
import { PointArray } from '../../models/slayer.type';
import { TaskData } from '../../models/slayer.type';

@Component({
    selector: 'app-block-list',
    imports: [
      BlockListTableComponent,
      AccountSettingsComponent,
      MatTabsModule,
      NavbarComponent,
      CommonModule
    ],
    templateUrl: './block-list.component.html',
    styleUrl: './block-list.component.css'
})
export class BlockListComponent implements OnInit {

  DuradelTasks: TaskData[] = [
    {id: '1', name: 'Aberrant spectres', weight: 7},
    {id: '2', name: 'Abyssal Demon', weight: 12},
    {id: '3', name: 'Adamant dragons', weight: 2},
    {id: '4', name: 'Ankou', weight: 5},
    {id: '46', name: 'Araxytes', weight: 10},
    {id: '5', name: 'Aviansies', weight: 8},
    {id: '6', name: 'Basilisks', weight: 7},
    {id: '7', name: 'Black demons', weight: 8},
    {id: '8', name: 'Black dragons', weight: 9},
    {id: '9', name: 'Bloodvelds', weight: 8},
    {id: '10', name: 'Blue dragons', weight: 4},
    {id: '11', name: 'Boss', weight: 12},
    {id: '13', name: 'Cave horrors', weight: 4},
    {id: '14', name: 'Cave kraken', weight: 9},
    {id: '15', name: 'Dagannoth', weight: 9},
    {id: '16', name: 'Dark beasts', weight: 11},
    {id: '17', name: 'Drakes', weight: 8},
    {id: '18', name: 'Dust devils', weight: 5},
    {id: '19', name: 'Elves', weight: 4},
    {id: '20', name: 'Fire giants', weight: 7},
    {id: '21', name: 'Fossil Island Wyverns', weight: 7},
    {id: '22', name: 'Gargoyles', weight: 8},
    {id: '23', name: 'Greater demons', weight: 9},
    {id: '24', name: 'Hellhounds', weight: 10},
    {id: '25', name: 'Iron dragons', weight: 5},
    {id: '26', name: 'Kalphites', weight: 9},
    {id: '27', name: 'Kurasks', weight: 4},
    {id: '28', name: 'Lizardmen', weight: 10},
    {id: '29', name: 'Mithril dragons', weight: 9},
    {id: '30', name: 'Mutated Zygomites', weight: 2},
    {id: '31', name: 'Nechryael', weight: 9},
    {id: '32', name: 'Red dragons', weight: 8},
    {id: '33', name: 'Rune dragons', weight: 2},
    {id: '34', name: 'Skeletal wyverns', weight: 7},
    {id: '35', name: 'Smoke devils', weight: 9},
    {id: '36', name: 'Spiritual creatures', weight: 7},
    {id: '37', name: 'Steel dragons', weight: 7},
    {id: '38', name: 'Suqahs', weight: 8},
    {id: '39', name: 'Trolls', weight: 6},
    {id: '74', name: 'TzHaar', weight: 10},
    {id: '41', name: 'Vampyres', weight: 8},
    {id: '42', name: 'Warped creatures', weight: 8},
    {id: '43', name: 'Waterfiends', weight: 2},
    {id: '44', name: 'Wyrms', weight: 8},
  ];

  KonarTasks: TaskData[] = [
    {id: '1', name: 'Aberrant spectres', weight: 6},
    {id: '2', name: 'Abyssal Demon', weight: 9},
    {id: '3', name: 'Adamant dragons', weight: 5},
    {id: '4', name: 'Ankou', weight: 5},
    {id: '5', name: 'Aviansies', weight: 6},
    {id: '6', name: 'Basilisks', weight: 5},
    {id: '7', name: 'Black demons', weight: 9},
    {id: '8', name: 'Black dragons', weight: 6},
    {id: '9', name: 'Bloodvelds', weight: 9},
    {id: '10', name: 'Blue dragons', weight: 4},
    {id: '11', name: 'Boss', weight: 8},
    {id: '12', name: 'Brine rats', weight: 2},
    {id: '13', name: 'Bronze dragons', weight: 5},
    {id: '14', name: 'Cave kraken', weight: 9},
    {id: '15', name: 'Dagannoth', weight: 8},
    {id: '16', name: 'Dark beasts', weight: 5},
    {id: '17', name: 'Drakes', weight: 10},
    {id: '18', name: 'Dust devils', weight: 6},
    {id: '20', name: 'Fire giants', weight: 9},
    {id: '21', name: 'Fossil Island Wyverns', weight: 5},
    {id: '22', name: 'Gargoyles', weight: 6},
    {id: '23', name: 'Greater demons', weight: 7},
    {id: '24', name: 'Hellhounds', weight: 8},
    {id: '45', name: 'Hydras', weight: 10},
    {id: '25', name: 'Iron dragons', weight: 5},
    {id: '71', name: 'Jellies', weight: 6},
    {id: '26', name: 'Kalphites', weight: 9},
    {id: '27', name: 'Kurasks', weight: 3},
    {id: '72', name: 'Lesser Nagua', weight: 2},
    {id: '28', name: 'Lizardmen', weight: 8},
    {id: '29', name: 'Mithril dragons', weight: 5},
    {id: '30', name: 'Mutated Zygomites', weight: 2},
    {id: '31', name: 'Nechryael', weight: 7},
    {id: '32', name: 'Red dragons', weight: 5},
    {id: '33', name: 'Rune dragons', weight: 5},
    {id: '34', name: 'Skeletal wyverns', weight: 5},
    {id: '35', name: 'Smoke devils', weight: 7},
    {id: '37', name: 'Steel dragons', weight: 5},
    {id: '39', name: 'Trolls', weight: 6},
    {id: '70', name: 'Turoth', weight: 3},
    {id: '41', name: 'Vampyres', weight: 4},
    {id: '42', name: 'Warped creatures', weight: 4},
    {id: '43', name: 'Waterfiends', weight: 2},
    {id: '44', name: 'Wyrms', weight: 10},
  ];

  NieveTasks: TaskData[] = [
    {id: '1', name: 'Aberrant spectres', weight: 6},
    {id: '2', name: 'Abyssal Demon', weight: 9},
    {id: '3', name: 'Adamant dragons', weight: 2},
    {id: '4', name: 'Ankou', weight: 5},
    {id: '46', name: 'Araxytes', weight: 8},
    {id: '5', name: 'Aviansies', weight: 6},
    {id: '6', name: 'Basilisks', weight: 6},
    {id: '7', name: 'Black demons', weight: 9},
    {id: '8', name: 'Black dragons', weight: 6},
    {id: '9', name: 'Bloodvelds', weight: 9},
    {id: '10', name: 'Blue dragons', weight: 4},
    {id: '11', name: 'Boss', weight: 8},
    {id: '12', name: 'Brine rats', weight: 3},
    {id: '13', name: 'Cave horrors', weight: 5},
    {id: '14', name: 'Cave kraken', weight: 6},
    {id: '15', name: 'Dagannoth', weight: 8},
    {id: '16', name: 'Dark beasts', weight: 5},
    {id: '17', name: 'Drakes', weight: 7},
    {id: '18', name: 'Dust devils', weight: 6},
    {id: '19', name: 'Elves', weight: 4},
    {id: '20', name: 'Fire giants', weight: 9},
    {id: '21', name: 'Fossil Island Wyverns', weight: 5},
    {id: '22', name: 'Gargoyles', weight: 6},
    {id: '23', name: 'Greater demons', weight: 7},
    {id: '24', name: 'Hellhounds', weight: 8},
    {id: '25', name: 'Iron dragons', weight: 5},
    {id: '26', name: 'Kalphites', weight: 9},
    {id: '27', name: 'Kurasks', weight: 3},
    {id: '28', name: 'Lizardmen', weight: 8},
    {id: '73', name: 'Minions of Scabaras', weight: 4},
    {id: '29', name: 'Mithril dragons', weight: 5},
    {id: '30', name: 'Mutated Zygomites', weight: 2},
    {id: '31', name: 'Nechryael', weight: 7},
    {id: '32', name: 'Red dragons', weight: 5},
    {id: '33', name: 'Rune dragons', weight: 2},
    {id: '34', name: 'Skeletal wyverns', weight: 5},
    {id: '35', name: 'Smoke devils', weight: 7},
    {id: '36', name: 'Spiritual creatures', weight: 6},
    {id: '37', name: 'Steel dragons', weight: 5},
    {id: '38', name: 'Suqahs', weight: 8},
    {id: '39', name: 'Trolls', weight: 6},
    {id: '70', name: 'Turoth', weight: 3},
    {id: '74', name: 'TzHaar', weight: 10},
    {id: '41', name: 'Vampyres', weight: 6},
    {id: '42', name: 'Warped creatures', weight: 6},
    {id: '44', name: 'Wyrms', weight: 7}
  ];

  ChaeldarTasks: TaskData[] = [
    {id: '1', name: 'Aberrant spectres', weight: 6},
    {id: '2', name: 'Abyssal Demon', weight: 9},
    {id: '3', name: 'Adamant dragons', weight: 5},
    {id: '4', name: 'Ankou', weight: 5},
    {id: '5', name: 'Aviansies', weight: 6},
    {id: '6', name: 'Basilisks', weight: 5},
    {id: '7', name: 'Black demons', weight: 9},
    {id: '8', name: 'Black dragons', weight: 6},
    {id: '9', name: 'Bloodvelds', weight: 9},
    {id: '10', name: 'Blue dragons', weight: 4},
    {id: '11', name: 'Boss', weight: 8},
    {id: '12', name: 'Brine rats', weight: 2},
    {id: '13', name: 'Bronze dragons', weight: 5},
    {id: '14', name: 'Cave kraken', weight: 9},
    {id: '15', name: 'Dagannoth', weight: 8},
    {id: '16', name: 'Dark beasts', weight: 5},
    {id: '17', name: 'Drakes', weight: 10},
    {id: '18', name: 'Dust devils', weight: 6},
    {id: '19', name: 'Elves', weight: 4},
    {id: '20', name: 'Fire giants', weight: 9},
    {id: '21', name: 'Fossil Island Wyverns', weight: 5},
    {id: '22', name: 'Gargoyles', weight: 6},
    {id: '23', name: 'Greater demons', weight: 7},
    {id: '24', name: 'Hellhounds', weight: 8},
    {id: '25', name: 'Iron dragons', weight: 5},
    {id: '26', name: 'Kalphites', weight: 9},
    {id: '27', name: 'Kurasks', weight: 3},
    {id: '28', name: 'Lizardmen', weight: 8},
    {id: '29', name: 'Mithril dragons', weight: 5},
    {id: '30', name: 'Mutated Zygomites', weight: 2},
    {id: '31', name: 'Nechryael', weight: 7},
    {id: '32', name: 'Red dragons', weight: 5},
    {id: '33', name: 'Rune dragons', weight: 5},
    {id: '34', name: 'Skeletal wyverns', weight: 7},
    {id: '35', name: 'Smoke devils', weight: 7},
    {id: '36', name: 'Spiritual creatures', weight: 6},
    {id: '37', name: 'Steel dragons', weight: 7},
    {id: '38', name: 'Suqahs', weight: 8},
    {id: '39', name: 'Trolls', weight: 6},
    {id: '70', name: 'Turoth', weight: 3},
    {id: '41', name: 'Vampyres', weight: 6},
    {id: '42', name: 'Warped creatures', weight: 6},
    {id: '43', name: 'Waterfiends', weight: 2},
    {id: '44', name: 'Wyrms', weight: 7}
  ];

  KrystiliaTasks: TaskData[] = [
    {id: '2', name: 'Abyssal Demon', weight: 5},
    {id: '4', name: 'Ankou', weight: 6},
    {id: '5', name: 'Aviansies', weight: 7},
    {id: '47', name: 'Bandits', weight: 4},
    {id: '48', name: 'Bears', weight: 6},
    {id: '7', name: 'Black demons', weight: 7},
    {id: '8', name: 'Black dragons', weight: 4},
    {id: '49', name: 'Black Knights', weight: 3},
    {id: '9', name: 'Bloodvelds', weight: 4},
    {id: '50', name: 'Chaos druids', weight: 5},
    {id: '51', name: 'Dark warriors', weight: 4},
    {id: '18', name: 'Dust devils', weight: 5},
    {id: '52', name: 'Earth warriors', weight: 6},
    {id: '53', name: 'Ents', weight: 5},
    {id: '20', name: 'Fire giants', weight: 7},
    {id: '23', name: 'Greater demons', weight: 8},
    {id: '56', name: 'Green dragons', weight: 4},
    {id: '24', name: 'Hellhounds', weight: 7},
    {id: '57', name: 'Hill giants', weight: 3},
    {id: '58', name: 'Ice giants', weight: 6},
    {id: '59', name: 'Ice warriors', weight: 7},
    {id: '71', name: 'Jellies', weight: 5},
    {id: '60', name: 'Lava dragons', weight: 3},
    {id: '61', name: 'Lesser demons', weight: 6},
    {id: '62', name: 'Magic axes', weight: 7},
    {id: '63', name: 'Mammoths', weight: 6},
    {id: '64', name: 'Moss giants', weight: 4},
    {id: '31', name: 'Nechryael', weight: 5},
    {id: '65', name: 'Pirates', weight: 3},
    {id: '66', name: 'Revenants', weight: 5},
    {id: '67', name: 'Rogues', weight: 5},
    {id: '68', name: 'Scorpions', weight: 6},
    {id: '69', name: 'Skeletons', weight: 5},
    {id: '70', name: 'Spiders', weight: 6},
    {id: '36', name: 'Spiritual creatures', weight: 6},
    {id: '75', name: 'Zombies', weight: 3},
    {id: '11', name: 'Boss', weight: 8}
  ]

  //points: every 1, 10, 50, 100, 250, 1000 tasks
  slayerMasters: SlayerMaster[] = [
    {
      id: 0,
      name: "Duradel",
      tasks: this.DuradelTasks,
      zone: "",
      points: {
        'normal': [15, 75, 225, 375, 525, 750]
      }
    },
    {
      id: 1,
      name: "Konar",
      tasks: this.KonarTasks,
      zone: "Kourend & Kebos",
      points: {
        'normal': [18, 90, 270, 450, 630, 900],
        'diary': [20, 100, 300, 500, 700, 1000]
      }
    },
    {
      id: 2,
      name: "Nieve/Steve",
      tasks: this.NieveTasks,
      zone: "Western Provinces",
      points: {
        'normal': [12, 60, 180, 300, 420, 600],
        'diary': [15, 75, 225, 375, 525, 750]
      }
    },
    {
      id: 3,
      name: "Chaeldar",
      tasks: this.ChaeldarTasks,
      zone: "",
      points: {
        'normal': [10, 50, 150, 250, 350, 500]
      }
    },
    {
      id: 4,
      name: "Krystilia",
      tasks: this.KrystiliaTasks,
      zone: "Wilderness",
      points: {
        'normal': [25, 125, 375, 625, 875, 1250]
      }
    }
  ];

  selectedTab: number = 0;
  selectedMasterName: string = this.slayerMasters[this.selectedTab].name;
  selectedTasks: TaskData[] = this.DuradelTasks;
  quests: Quest[] = [];
  averagePoints: number = 0;
  
  pointsFormData: any = {
    term: 'short',
    kourendDiary: false,
    WesternDiary: false,
    konarSwap: 0
  };

  levelsData: any = {
    combat: 3,
    slayer: 1,
    magic: 1
  };

  ngOnInit() {
    //console.log("selectedTab:", this.selectedTab, 'Loaded quests:', this.quests);
    this.averagePoints = this.calcPoints(this.slayerMasters[0].points, 'short');
  }

  onPointsFormUpdated(pointsForm: any) {
    this.pointsFormData = pointsForm;
    let masterPoints = this.slayerMasters[this.selectedTab].points;
    this.averagePoints = this.calcPoints(masterPoints, pointsForm.term, pointsForm.konarSwap, pointsForm.kourendDiary, pointsForm.WesternDiary);
  }

  //short term: up to 10 tasks
  //medium term: up to 100 tasks
  //long term: up to 1000 tasks
  calcPoints(masterPoints: PointArray, term: string, konarSwap: number = 0, kourendDiary: boolean = false, WesternDiary: boolean = false): number {
    const multipliers: { [key: string]: number[] } = {
      short: [9, 1],
      medium: [90, 8, 1, 1],
      long: [900, 80, 8, 8, 3, 1],
    };
    const divisors: { [key: string]: number } = {
      short: 10,
      medium: 100,
      long: 1000,
    };

    let basePoints = [];

    if (this.selectedTab == 1) {
      basePoints = kourendDiary && this.slayerMasters[1].points.diary ? this.slayerMasters[1].points.diary : this.slayerMasters[1].points.normal;
    } else {
      basePoints = WesternDiary && masterPoints.diary ? masterPoints.diary : masterPoints.normal;
    }

    const konarPoints = kourendDiary && this.slayerMasters[1].points.diary ? this.slayerMasters[1].points.diary : this.slayerMasters[1].points.normal;

    let source = basePoints.slice();
    if (konarSwap == 10) {
        source[1] = konarPoints[1];
        source[2] = konarPoints[2];
        source[3] = konarPoints[3];
    } else if (konarSwap == 50) {
        source[2] = konarPoints[2];
        source[3] = konarPoints[3];
    } else if (konarSwap == 100) {
        source[3] = konarPoints[3];
    } else {
      source = basePoints.slice();
    }

    //console.log(basePoints, 'baseSource');
    //console.log(source, 'source');
  
    const points = multipliers[term].reduce((sum, multiplier, index) => {
      return sum + (source[index]) * multiplier;
    }, 0);
  
    return points / divisors[term];
  }

  onTabChanged(index: number) {
    this.selectedTab = index;
    this.selectedMasterName = this.slayerMasters[index].name;
    let masterPoints = this.slayerMasters[this.selectedTab].points;
    //console.log('term', 'konarSwap:', this.pointsFormData.konarSwap, this.pointsFormData.term, 'masterPoints:', masterPoints );
    this.averagePoints = this.calcPoints(
      masterPoints,
      this.pointsFormData.term,
      this.pointsFormData.konarSwap,
      this.pointsFormData.kourendDiary,
      this.pointsFormData.WesternDiary
    );
    this.selectedTasks = this.slayerMasters[index].tasks;
  }

  onQuestsUpdated(updatedQuests: Quest[]) {
    this.quests = [...updatedQuests];  // Reassign the array reference to detect changes
  }

  onLevelsUpdated(levels: any) {
    this.levelsData = levels;
  }

}