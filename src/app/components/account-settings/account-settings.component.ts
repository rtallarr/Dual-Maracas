import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';

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
    CommonModule
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  @Input() zoneName: string = '';

  @Output() questsUpdated = new EventEmitter<any>();
  @Output() slayerLvlUpdated = new EventEmitter<number>();
  @Output() combatLvlUpdated = new EventEmitter<number>();
  @Output() pointsFormUpdated = new EventEmitter<FormGroup>();

  toolTipInfo: string = 'Short term is up to 10 tasks bonus, medium term is up to 100 and long term is up to 1000.';

  questList = {
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
      {name: 'Fairytale II', completed: false},
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

  hid: boolean = true;
  allComplete: boolean = false;

  ngOnInit() {
    const savedQuests = localStorage.getItem('quests');
    const savedSlayerLvl = localStorage.getItem('slayerLvl');
    const savedCombatLvl = localStorage.getItem('combatLvl');

    if (savedQuests) {
      this.questList.quests = JSON.parse(savedQuests);
      this.questsUpdated.emit(this.questList.quests);
    }
    if (savedSlayerLvl) {
      this.reqsForm.patchValue({slayerLvl: parseInt(savedSlayerLvl)});
      this.slayerLvlUpdated.emit(parseInt(savedSlayerLvl));
    }
    if (savedCombatLvl) {
      this.reqsForm.patchValue({combatLvl: parseInt(savedCombatLvl)});
      this.combatLvlUpdated.emit(parseInt(savedCombatLvl));
    }

    this.pointsForm.valueChanges.subscribe((value) => {
      //console.log(value);
      this.pointsFormUpdated.emit(this.pointsForm);
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

  onSetSlayerLvl(Lvl: string) {
    this.slayerLvlUpdated.emit(parseInt(Lvl));
    localStorage.setItem('slayerLvl', Lvl);
  }

  onSetCombatLvl(Lvl: string) {
    this.combatLvlUpdated.emit(parseInt(Lvl));
    localStorage.setItem('combatLvl', Lvl);
  }

}
