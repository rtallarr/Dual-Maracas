import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { GetStatsService } from '../../services/get-stats.service';

import { Quest } from '../../models/slayer.type';

@Component({
  selector: 'app-account-settings',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly _user = inject(GetStatsService);

  @Input() zoneName: string = '';

  @Output() questsUpdated = new EventEmitter<Quest[]>();
  @Output() levelsUpdated = new EventEmitter<any>();
  @Output() pointsFormUpdated = new EventEmitter<FormGroup>();

  toolTipInfo: string = 'Short term is up to 10 tasks bonus, medium term is up to 100 and long term is up to 1000.';

  questList: { name: string; completed: boolean; quests: Quest[] } = {
    name: 'Unlock all',
    completed: false,
    quests: [
      {name: 'Bone Voyage', completed: false},
      {name: 'Cabin Fever', completed: false},
      {name: 'Contact!', completed: false},
      {name: 'Death Plateau', completed: false},
      {name: 'Death to the Dorgeshuun', completed: false},
      {name: 'Desert Treasure I', completed: false},
      {name: 'Dragon Slayer I', completed: false},
      {name: 'Dragon Slayer II', completed: false},
      {name: 'Elemental Workshop I', completed: false},
      {name: 'Ernest the Chicken', completed: false},
      {name: 'Fairytale II \- Cure a Queen', completed: false},
      {name: 'Horror from the Deep', completed: false},
      {name: 'Legends\' Quest', completed: false},
      {name: 'Lost City', completed: false},
      {name: 'Lunar Diplomacy', completed: false},
      {name: 'Mourning\'s End Part II', completed: false},
      {name: 'Olaf\'s Quest', completed: false},
      {name: 'Priest in Peril', completed: false},
      {name: 'Regicide', completed: false},
      {name: 'Royal Trouble', completed: false},
      {name: 'Rum Deal', completed: false},
      {name: 'Skippy and the Mogres', completed: false},
      {name: 'Waterfall Quest', completed: false},
    ],
  };

  reqsForm = this.fb.group({
    slayerLvl: [1],
    combatLvl: [3],
  });

  pointsForm = this.fb.group({
    term: ['short'],
    elite: [false],
    konarSwap: [0],
    kourendDiary: [false]
  });

  rsn = new FormControl('');

  allComplete: boolean = false;

  ngOnInit() {
    const savedQuests = localStorage.getItem('quests');
    const savedLevels = localStorage.getItem('levels');

    if (savedQuests) {
      this.questList.quests = JSON.parse(savedQuests);
      this.updateAllComplete();
      this.questsUpdated.emit(this.questList.quests);
    }
    if (savedLevels) {
      this.reqsForm.patchValue(JSON.parse(savedLevels));
      this.levelsUpdated.emit(this.reqsForm.value);
    }

    this.pointsForm.valueChanges.subscribe((value) => {
      //console.log(value);
      this.pointsFormUpdated.emit(this.pointsForm);
    });

    this.reqsForm.valueChanges.subscribe((value) => {
      //console.log(value);
      this.levelsUpdated.emit(value);
    });
  }

  onFetchUser() {
    const username = this.rsn.value?.trim();
  
    if (!username) {
      console.warn("Username is empty or invalid.");
      return;
    }
  
    this._user.getUserStats(username).subscribe({
      next: (data: any) => {
        if (!data || !data.levels || !data.achievement_diaries || !data.quests) {
          console.error("Invalid response format:", data);
          return;
        }
  
        this.pointsForm.patchValue({
          kourendDiary: data.achievement_diaries["Kourend & Kebos"]?.Elite?.complete ?? false,
        });
  
        this.reqsForm.setValue({
          slayerLvl: data.levels.Slayer,
          combatLvl: this.calculateCombatLvl(data.levels),
        });
  
        this.questList.quests.forEach(quest => {
          quest.completed = data.quests[quest.name] === 2;
        });

        localStorage.setItem("quests", JSON.stringify(this.questList.quests));
        localStorage.setItem("levels", JSON.stringify(this.reqsForm.value));
  
        this.levelsUpdated.emit(this.reqsForm.value);
        this.questsUpdated.emit(this.questList.quests);
      },
      error: (error) => {
        console.error("Error fetching stats:", error);
      },
      complete: () => {
      },
    });
  }

  updateAllComplete() {
    this.allComplete = this.questList.quests != null && this.questList.quests.every(t => t.completed);
    this.questsUpdated.emit(this.questList.quests);
    localStorage.setItem('quests', JSON.stringify(this.questList.quests));
  }

  someComplete(): boolean {
    return (this.questList.quests?.some(t => t.completed) ?? false) && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.questList.quests.forEach(t => (t.completed = completed));
    this.questsUpdated.emit(this.questList.quests);
    localStorage.setItem('quests', JSON.stringify(this.questList.quests));
  }

  calculateCombatLvl(levels: any) {
    const base = 0.25 * (levels.Defence + levels.Hitpoints + Math.floor(levels.Prayer / 2));
    const meleeCombat = 13 / 40 * (levels.Attack + levels.Strength);
    const rangedCombat = 13 / 40 * Math.floor(3 * levels.Ranged / 2);
    const magicCombat = 13 / 40 * Math.floor(3 * levels.Magic / 2);
    return Math.floor(base + Math.max(meleeCombat, rangedCombat, magicCombat));
  }

}
