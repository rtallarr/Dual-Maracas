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
    {id: '45', name: 'Araxytes', weight: 10},
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
    {id: '40', name: 'TzHaar', weight: 10},
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
    {id: '38', name: 'Jellies', weight: 6},
    {id: '26', name: 'Kalphites', weight: 9},
    {id: '27', name: 'Kurasks', weight: 3},
    {id: '36', name: 'Lesser Nagua', weight: 2},
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
    {id: '40', name: 'Turoth', weight: 3},
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
    {id: '29', name: 'Minions of Scabaras', weight: 4},
    {id: '30', name: 'Mithril dragons', weight: 5},
    {id: '31', name: 'Mutated Zygomites', weight: 2},
    {id: '32', name: 'Nechryael', weight: 7},
    {id: '33', name: 'Red dragons', weight: 5},
    {id: '34', name: 'Rune dragons', weight: 2},
    {id: '35', name: 'Skeletal wyverns', weight: 5},
    {id: '36', name: 'Smoke devils', weight: 7},
    {id: '37', name: 'Spiritual creatures', weight: 6},
    {id: '38', name: 'Steel dragons', weight: 5},
    {id: '39', name: 'Suqahs', weight: 8},
    {id: '40', name: 'Trolls', weight: 6},
    {id: '41', name: 'Turoth', weight: 3},
    {id: '42', name: 'TzHaar', weight: 10},
    {id: '43', name: 'Vampyres', weight: 6},
    {id: '44', name: 'Warped creatures', weight: 6},
    {id: '45', name: 'Wyrms', weight: 7}
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
    {id: '40', name: 'Turoth', weight: 3},
    {id: '41', name: 'Vampyres', weight: 6},
    {id: '42', name: 'Warped creatures', weight: 6},
    {id: '43', name: 'Waterfiends', weight: 2},
    {id: '44', name: 'Wyrms', weight: 7}
  ];

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
    }
  ];

  selectedTab: number = 0;
  quests: Quest[] = [];
  averagePoints: number = 0;
  
  pointsFormData: any = {
    term: 'short',
    elite: false,
    konarSwap: false
  };

  levelsData: any = {
    combat: 3,
    slayer: 1,
    magic: 1
  };

  ngOnInit() {
    //console.log("selectedTab:", this.selectedTab, 'Loaded quests:', this.quests);
    this.averagePoints = this.calcPoints(this.slayerMasters[0].points, 'short', false);
  }

  onPointsFormUpdated(pointsForm: any) {
    this.pointsFormData = pointsForm;
    let masterPoints = this.slayerMasters[this.selectedTab].points;
    this.averagePoints = this.calcPoints(masterPoints, pointsForm.term, pointsForm.elite, pointsForm.konarSwap, pointsForm.kourendDiary);
  }

  //short term: up to 10 tasks
  //medium term: up to 100 tasks
  //long term: up to 1000 tasks
  calcPoints(masterPoints: PointArray, term: string, diary: boolean, konarSwap: number = 0, kourendDiary: boolean = false): number {
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
  
    const basePoints = diary && masterPoints['diary'] ? masterPoints['diary'] : masterPoints['normal'];
    const konarPoints = this.slayerMasters[1].points;

    let source = basePoints.slice();
    if (konarSwap == 10) {
      if (kourendDiary && konarPoints.diary) {
        source[1] = konarPoints.diary[1];
        source[2] = konarPoints.diary[2];
        source[3] = konarPoints.diary[3];
      } else {
        source[1] = konarPoints.normal[1];
        source[2] = konarPoints.normal[2];
        source[3] = konarPoints.normal[3];
      }
    } else if (konarSwap == 50) {
      if (kourendDiary && konarPoints.diary) {
        source[2] = konarPoints.diary[2];
        source[3] = konarPoints.diary[3];
      } else {
        source[2] = konarPoints.normal[2];
        source[3] = konarPoints.normal[3];
      }
    } else if (konarSwap == 100) {
      if (kourendDiary && konarPoints.diary) {
        source[3] = konarPoints.diary[3];
      } else {
        source[3] = konarPoints.normal[3];
      }
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
    let masterPoints = this.slayerMasters[this.selectedTab].points;
    this.averagePoints = this.calcPoints(masterPoints, this.pointsFormData.term, this.pointsFormData.elite) ?? 0;
  }

  onQuestsUpdated(updatedQuests: Quest[]) {
    this.quests = [...updatedQuests];  // Reassign the array reference to detect changes
  }

  onLevelsUpdated(levels: any) {
    this.levelsData = levels;
  }

}