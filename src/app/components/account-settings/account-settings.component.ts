import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-account-settings',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

  private readonly fb = inject(FormBuilder);

  @Output() questsUpdated = new EventEmitter<any>();
  @Output() slayerLvlUpdated = new EventEmitter<number>();
  @Output() combatLvlUpdated = new EventEmitter<number>();

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

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.questList.quests != null && this.questList.quests.every(t => t.completed);
    this.questsUpdated.emit(this.questList.quests);
  }

  someComplete(): boolean {
    return (this.questList.quests?.some(t => t.completed) ?? false) && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.questList.quests.forEach(t => (t.completed = completed));
    this.questsUpdated.emit(this.questList.quests);
  }

  onSetSlayerLvl(Lvl: string) {
    this.slayerLvlUpdated.emit(parseInt(Lvl));
  }

  onSetCombatLvl(Lvl: string) {
    this.combatLvlUpdated.emit(parseInt(Lvl));
  }

}
