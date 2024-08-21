import { Component, AfterViewInit, ViewChild, Input, inject } from '@angular/core';
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
import { TaskData } from '../../views/block-list/block-list.component';

@Component({
  selector: 'app-block-list-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatCardModule, MatDividerModule],
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
  dataSource: MatTableDataSource<TaskData>;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.Tasks);
  }

  print() {
    console.log('Tasks: ', this.Tasks);
    console.log('Total weight: ' + this.totalWeight, 'Average points: ' + this.averagePoints);
  }

  // Reload with data from parent component
  ngOnChanges() {
    this.averagePointsSkip = this.averagePoints;
    this.print();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(this.Tasks);
    this.totalWeight = this.Tasks.reduce((acc, task) => acc + task.weight, 0);
    this.currentWeight = this.totalWeight;
    this.recalculateChances();
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
      if (task.status === 'Blocked') {
        this._snackBar.open('Cannot skip a task that is not active', 'Close', )
      } else if (task.status === 'Skip') {
        task.status = 'Active';
        task.chance = this.calculateChance(task.weight);
        this.currentWeight += task.weight;
        this.countSkipTasks--;
        this.recalculateChances();
        this.calculatePoints();
        this.calculateSkipPercentage();
      } else {
        task.status = 'Skip';
        task.chance = 0;
        this.currentWeight -= task.weight;
        this.countSkipTasks++;
        this.recalculateChances();
        this.calculatePoints();
        this.calculateSkipPercentage();
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
        task.chance = 0;
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
    return parseFloat((weight / this.currentWeight * 100).toFixed(2));
  }

  recalculateChances() {
    this.Tasks.forEach(task => {
      if (task.status != 'Blocked' && task.status != 'Skip') {
        task.chance = this.calculateChance(task.weight);
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
