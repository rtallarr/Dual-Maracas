import { Component, AfterViewInit, ViewChild, Input, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskData } from '../../views/block-list/block-list.component';

@Component({
  selector: 'app-block-list-table',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatTooltipModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
  ],
  templateUrl: './block-list-table.component.html',
  styleUrl: './block-list-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockListTableComponent implements AfterViewInit{
  private _snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  @Input() Tasks: TaskData[] = [];
  @Input() averagePoints: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lockedWeight: number = 0; //weight of locked tasks
  activeWeight: number = 0; //weight remaining after blocking tasks
  currentWeight: number = 0; //weight remaining after skipping tasks
  averagePointsSkip: number = 0; 
  countSkipTasks: number = 0;
  percentageSkipped: number = 0;

  userCombatLvl: number = 3;
  userSlayerLvl: number = 1;

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status'];
  dataSource!: MatTableDataSource<TaskData>;

  reqsForm = this.fb.group({
    //define a field with a number type
    slayerLvl: [1],
    combatLvl: [3],
  });

  constructor(private cdref: ChangeDetectorRef) { }

  // Reload with data from parent component
  ngAfterViewInit() {
		this.Tasks = this.Tasks.map(task => ({
      ...task,
      statusControl: new FormControl(task.status),
      prevStatus: task.status,
    }));
    this.dataSource = new MatTableDataSource(this.Tasks);
    this.dataSource.sort = this.sort;
    //this.lockedWeight = this.Tasks.filter(task => task.statusControl?.value === 'Locked').reduce((acc, task) => acc + task.weight, 0);
    this.activeWeight = this.Tasks.reduce((acc, task) => acc + task.weight, 0); //- this.lockedWeight;
    this.currentWeight = this.activeWeight;
    this.averagePointsSkip = this.averagePoints;
    this.printWeight();
    this.checkLockedTasks(this.userCombatLvl, this.userSlayerLvl);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeStatus(task: TaskData) {
    //console.log("new:", task.statusControl?.value, "prev:", task.prevStatus);
    if (task.statusControl?.value === 'Active') {
      if (task.prevStatus === 'Blocked') {
        this.activeWeight += task.weight
        this.currentWeight += task.weight;
      } else if (task.prevStatus === 'Skip') {
        this.currentWeight += task.weight;
        this.countSkipTasks--;
      } else if (task.prevStatus === 'Locked') {
        this.activeWeight += task.weight;
        this.currentWeight += task.weight;
        this.lockedWeight -= task.weight;
      }
      task.statusControl?.setValue('Active');
    } else if (task.statusControl?.value === 'Blocked') {
      if (task.prevStatus === 'Active') {
        this.currentWeight -= task.weight;
        this.activeWeight -= task.weight;
      } else if (task.prevStatus === 'Locked') {
        this.lockedWeight -= task.weight;
      } else if (task.prevStatus === 'Skip') {
        this.activeWeight -= task.weight;
        this.countSkipTasks--;
      }
      task.statusControl?.setValue('Blocked');
    } else if (task.statusControl?.value === 'Skip') {
      if (task.prevStatus === 'Active') {
        this.currentWeight -= task.weight;
      } else if (task.prevStatus === 'Blocked') {
        this.activeWeight += task.weight;
      } else if (task.prevStatus === 'Locked') {
        this.activeWeight += task.weight;
        this.lockedWeight -= task.weight;
      }
      this.countSkipTasks++;
      task.statusControl?.setValue('Skip');
    } else if (task.statusControl?.value === 'Locked') {
      if (task.prevStatus === 'Active') {
        this.activeWeight -= task.weight;
        this.currentWeight -= task.weight;
      } else if (task.prevStatus === 'Skip') {
        this.activeWeight -= task.weight;
        this.countSkipTasks--;
      }
      this.lockedWeight += task.weight;
      task.statusControl?.setValue('Locked');
    } else {
      console.error('Invalid status');
    }
    task.prevStatus = task.statusControl?.value;
    this.calculateChances();
    this.calculatePoints();
    this.calculateSkipPercentage();
    //this.printWeight();
  }

  printWeight() {
    console.log('Active Weight: ' + this.activeWeight, 'Current Weight: ' + this.currentWeight, 'Locked Weight: ' + this.lockedWeight);
  }

  calculateChance(weight: number) {
    return parseFloat(((weight / this.currentWeight) * 100).toFixed(2));
  }

  calculateChances() {
    this.printWeight();
    this.Tasks.forEach(task => {
      if (task.statusControl?.value === 'Active') {
        task.chance = this.calculateChance(task.weight);
      } else {
        task.chance = 0;
      }
    });
  }

  calculatePoints() {
    this.averagePointsSkip = ((this.averagePoints*this.currentWeight) - 30*(this.activeWeight-this.currentWeight))/this.currentWeight;
    this.averagePointsSkip = parseFloat(this.averagePointsSkip.toFixed(3));
    //console.log("Average points without skips", this.averagePoints, " Average points with skips", this.averagePointsSkip);
  }

  calculateSkipPercentage() {
    return this.percentageSkipped = parseFloat(((this.countSkipTasks / this.Tasks.length) * 100).toFixed(2));
  }

  onSetSlayerLvl(Lvl: string) {
    this.userSlayerLvl = parseInt(Lvl);
    this.checkLockedTasks(this.userCombatLvl, this.userSlayerLvl);
  }

  onSetCombatLvl(Lvl: string) {
    this.userCombatLvl = parseInt(Lvl);
		this.checkLockedTasks(this.userCombatLvl, this.userSlayerLvl);
  }

  checkLockedTasks(combat: number, slayer: number) {
    this.Tasks.forEach(task => {
      if ((task.combat > combat || task.slayer > slayer) && task.status === 'Active') {
        task.statusControl?.setValue('Locked');
      } else if ((task.combat <= combat && task.slayer <= slayer) && (task.statusControl?.value === 'Locked' && task.status != 'Locked')) {
        task.statusControl?.setValue('Active');
      }
    });
    this.lockedWeight = this.Tasks.filter(task => task.statusControl?.value === 'Locked').reduce((acc, task) => acc + task.weight, 0);
    this.currentWeight -= this.lockedWeight;
    this.activeWeight -= this.lockedWeight;
    this.calculateChances();
    //console.log('Combat: ' + combat, 'Slayer: ' + slayer);
    //console.log(this.Tasks);
  }

}