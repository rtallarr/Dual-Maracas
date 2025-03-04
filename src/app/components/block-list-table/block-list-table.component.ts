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
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  activeWeight: number = 0;
  blockedWeight: number = 0;
  lockedWeight: number = 0;
  skipWeight: number = 0;
  totalWeight: number = 0;
  
  averagePointsSkip: number = 0; 
  countSkipTasks: number = 0;
  percentageSkipped: number = 0;

  userCombatLvl: number = 3;
  userSlayerLvl: number = 1;

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status'];
  dataSource!: MatTableDataSource<TaskData>;

  reqsForm = this.fb.group({
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
    
    this.calculateWeights();
    this.totalWeight = this.activeWeight + this.blockedWeight + this.lockedWeight + this.skipWeight;

    this.averagePointsSkip = this.averagePoints;
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
      if (task.prevStatus === 'Skip') {
        this.countSkipTasks--;
      }
      task.statusControl?.setValue('Active');
    } else if (task.statusControl?.value === 'Blocked') {
      if (task.prevStatus === 'Skip') {
        this.countSkipTasks--;
      }
      task.statusControl?.setValue('Blocked');
    } else if (task.statusControl?.value === 'Skip') {
      this.countSkipTasks++;
      task.statusControl?.setValue('Skip');
    } else if (task.statusControl?.value === 'Locked') {
      if (task.prevStatus === 'Skip') {
        this.countSkipTasks--;
      }
      task.statusControl?.setValue('Locked');
    } else {
      console.error('Invalid status');
    }
    task.prevStatus = task.statusControl?.value;
    this.calculateWeights();
  }

  printWeight() {
    console.log('Active Weight: ' + this.activeWeight, 
                'Blocked Weight: ' + this.blockedWeight, 
                'Locked Weight: ' + this.lockedWeight, 
                'Skip Weight: ' + this.skipWeight, 
                'total weight: ' + (this.activeWeight + this.blockedWeight + this.lockedWeight + this.skipWeight));
  }

  calculateWeights() {
    this.activeWeight = this.Tasks.filter(task => task.statusControl?.value === 'Active').reduce((acc, task) => acc + task.weight, 0);
    this.lockedWeight = this.Tasks.filter(task => task.statusControl?.value === 'Locked').reduce((acc, task) => acc + task.weight, 0);
    this.blockedWeight = this.Tasks.filter(task => task.statusControl?.value === 'Blocked').reduce((acc, task) => acc + task.weight, 0);
    this.skipWeight = this.Tasks.filter(task => task.statusControl?.value === 'Skip').reduce((acc, task) => acc + task.weight, 0);

    this.calculateChances();
    this.calculatePoints();
    this.calculateSkipPercentage();
    //this.printWeight();
  }

  checkLockedTasks(combat: number, slayer: number) {
    let lockcont = 0;
    this.Tasks.forEach(task => {
      if ((task.combat > combat || task.slayer > slayer) && task.status === 'Active') {
        task.statusControl?.setValue('Locked');
        lockcont++;
      } else if ((task.combat <= combat && task.slayer <= slayer) && (task.statusControl?.value === 'Locked' && task.status != 'Locked')) {
        task.statusControl?.setValue('Active');
      }
    });
    this.calculateWeights();
  }

  calculateChances() {
    this.Tasks.forEach(task => {
      if (task.statusControl?.value === 'Active' || task.statusControl?.value === 'Skip') {
        task.chance = this.calculateChance(task.weight);
      } else {
        task.chance = 0;
      }
    });
  }

  calculateChance(weight: number) {
    return parseFloat(((weight / (this.activeWeight + this.skipWeight)) * 100).toFixed(2));
  }

  calculatePoints() {
    let withoutBlocks = this.totalWeight-this.blockedWeight;
    let finalWeight = withoutBlocks - this.skipWeight;
    this.averagePointsSkip = (((this.averagePoints*finalWeight) - (30*(withoutBlocks-finalWeight)))/withoutBlocks); //points earned - cost of skip
    this.averagePointsSkip = parseFloat(this.averagePointsSkip.toFixed(3));
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

}