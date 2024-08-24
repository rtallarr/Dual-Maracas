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
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TaskData } from '../../views/block-list/block-list.component';
import { from } from 'rxjs';

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
  ],
  templateUrl: './block-list-table.component.html',
  styleUrl: './block-list-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockListTableComponent implements AfterViewInit{
  private _snackBar = inject(MatSnackBar);

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

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status'];
  dataSource!: MatTableDataSource<TaskData>;

  statusControl = new FormControl('Active');

  constructor(private cdref: ChangeDetectorRef) { }

  // Reload with data from parent component
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.Tasks);
    this.dataSource.sort = this.sort;
    //this.lockedWeight = this.Tasks.filter(task => task.status === 'Locked').reduce((acc, task) => acc + task.weight, 0);
    this.activeWeight = this.Tasks.reduce((acc, task) => acc + task.weight, 0); //- this.lockedWeight
    this.currentWeight = this.activeWeight;
    this.averagePointsSkip = this.averagePoints;
    this.recalculateChances(true);
    this.cdref.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeStatus(task: TaskData, newStatus: any) {
    if (newStatus.value === 'Active') {
      if (task.status === 'Blocked') {
        this.activeWeight += task.weight
        this.currentWeight += task.weight;
      } else if (task.status === 'Skip') {
        this.currentWeight += task.weight;
        this.countSkipTasks--;
      } else if (task.status === 'Locked') {
        this.activeWeight += task.weight;
        this.currentWeight += task.weight;
        this.lockedWeight -= task.weight;
      }
      task.status = 'Active';
    } else if (newStatus.value === 'Blocked') {
      if (task.status === 'Active') {
        this.currentWeight -= task.weight;
        this.activeWeight -= task.weight;
      } else if (task.status === 'Locked') {
        this.lockedWeight -= task.weight;
      } else if (task.status === 'Skip') {
        this.activeWeight -= task.weight;
        this.countSkipTasks--;
      }
      task.status = 'Blocked';
    } else if (newStatus.value === 'Skip') {
      if (task.status === 'Active') {
        this.currentWeight -= task.weight;
      } else if (task.status === 'Blocked') {
        this.activeWeight += task.weight;
      } else if (task.status === 'Locked') {
        this.activeWeight += task.weight;
        this.lockedWeight -= task.weight;
      }
      this.countSkipTasks++;
      task.status = 'Skip';
    } else if (newStatus.value === 'Locked') {
      if (task.status === 'Active') {
        this.activeWeight -= task.weight;
        this.currentWeight -= task.weight;
      } else if (task.status === 'Skip') {
        this.activeWeight -= task.weight;
        this.countSkipTasks--;
      }
      this.lockedWeight += task.weight;
      task.status = 'Locked';
    } else {
      console.error('Invalid status');
    }
    this.recalculateChances();
    this.calculatePoints();
    this.calculateSkipPercentage();
    this.printWeight();
  }

  printWeight() {
    console.log('Active Weight: ' + this.activeWeight, 'Current Weight: ' + this.currentWeight, 'Locked Weight: ' + this.lockedWeight);
  }

  calculateChance(weight: number) {
    return parseFloat(((weight / this.currentWeight) * 100).toFixed(2));
  }

  recalculateChances(first: boolean = false) {
    if (first) {
      this.Tasks.forEach(task => {
        task.status = 'Active';
      });
    }
    this.Tasks.forEach(task => {
      if (task.status === 'Active') {
        task.chance = this.calculateChance(task.weight);
      } else {
        task.chance = 0;
      }
    });
  }

  calculatePoints() {
    this.averagePointsSkip = ((this.averagePoints*this.currentWeight) - 30*(this.activeWeight-this.currentWeight))/this.currentWeight;
    this.averagePointsSkip = parseFloat(this.averagePointsSkip.toFixed(3));
  }

  calculateSkipPercentage() {
    return this.percentageSkipped = (this.countSkipTasks / this.Tasks.length) * 100;
  }

}