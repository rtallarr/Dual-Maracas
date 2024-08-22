import { Component, AfterViewInit, ViewChild, Input, inject, ChangeDetectorRef } from '@angular/core';
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
    MatTooltipModule],
  templateUrl: './block-list-table.component.html',
  styleUrl: './block-list-table.component.css'
})
export class BlockListTableComponent implements AfterViewInit{
  private _snackBar = inject(MatSnackBar);

  @Input() Tasks: TaskData[] = [];
  @Input() averagePoints: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalWeight: number = 0; //weight after blocking tasks
  currentWeight: number = 0; //weight after skipping tasks
  averagePointsSkip: number = 0; 
  countSkipTasks: number = 0;
  percentageSkipped: number = 0;

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status', 'actions'];
  dataSource!: MatTableDataSource<TaskData>;

  constructor(private cdref: ChangeDetectorRef) { }

  print() {
    console.log('Tasks: ', this.Tasks);
    console.log('Total weight: ' + this.totalWeight, 'Average points: ' + this.averagePoints);
  }

  // Reload with data from parent component
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.Tasks);
    this.dataSource.sort = this.sort;
    this.totalWeight = this.Tasks.reduce((acc, task) => acc + task.weight, 0);
    this.currentWeight = this.totalWeight;
    this.averagePointsSkip = this.averagePoints;
    this.recalculateChances();
    this.cdref.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSkipTask(id: any) {
    const task = this.Tasks.find(task => task.id === id);
    if (task) {
      if (task.status === 'Skip') {
        task.status = 'Active';
        task.chance = this.calculateChance(task.weight);
        this.currentWeight += task.weight;
        this.countSkipTasks--;
        this.recalculateChances();
        this.calculatePoints();
        this.calculateSkipPercentage();
      } else if (task.status === 'Active') {
        task.status = 'Skip';
        task.chance = 0;
        this.currentWeight -= task.weight;
        this.countSkipTasks++;
        this.recalculateChances();
        this.calculatePoints();
        this.calculateSkipPercentage();
      } else {
        this._snackBar.open('Cannot skip a task that is not active', 'Close', )
      }
    } else {
      console.error('Task with id: '+ id + 'not found');
    }
  }

  onBlockTask(id: any) {
    const task = this.Tasks.find(task => task.id === id);
    if (task) {
      if (task.status === 'Active') {
        task.status = 'Blocked';
        this.currentWeight -= task.weight;
        this.totalWeight -= task.weight;
      } else if (task.status === 'Blocked') {
        task.status = 'Active';
        this.currentWeight += task.weight;
        this.totalWeight += task.weight;
      } else {
        this._snackBar.open('Cannot block a task that is skipped', 'Close', )
      }
      this.recalculateChances();
      this.calculatePoints();
    } else {
      console.error('Task with id: '+ id + 'not found');
    }
  }

  calculateChance(weight: number) {
    return parseFloat(((weight / this.currentWeight) * 100).toFixed(2));
  }

  recalculateChances() {
    this.Tasks.forEach(task => {
      if (task.status === 'Active') {
        task.chance = this.calculateChance(task.weight);
      } else {
        task.chance = 0;
      }
    });
  }

  calculatePoints() {
    this.averagePointsSkip = ((this.averagePoints*this.currentWeight) - 30*(this.totalWeight-this.currentWeight))/this.currentWeight;
  }

  calculateSkipPercentage() {
    return this.percentageSkipped = (this.countSkipTasks / this.Tasks.length) * 100;
  }

}
