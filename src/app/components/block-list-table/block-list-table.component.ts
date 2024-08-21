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

export interface TaskData {
  id: string;
  name: string;
  status: string;
  weight: number;
  chance?: number;
}

const Tasks: TaskData[] = [
	{id: '1', name: 'Aberrant spectres', status: 'Active', weight: 7},
	{id: '2', name: 'Abyssal Demon', status: 'Active', weight: 12},
	{id: '3', name: 'Adamant dragons', status: 'Active', weight: 2},
  {id: '4', name: 'Ankou', status: 'Active', weight: 5},
  {id: '5', name: 'Aviansies', status: 'Locked', weight: 8},
  {id: '6', name: 'Basilisks', status: 'Locked', weight: 7},
  {id: '7', name: 'Black demons', status: 'Active', weight: 8},
  {id: '8', name: 'Black dragons', status: 'Active', weight: 9},
	{id: '9', name: 'Boss', status: 'Locked', weight: 12},
  {id: '11', name: 'Bloodvelds', status: 'Active', weight: 8},
  {id: '12', name: 'Blue dragons', status: 'Active', weight: 4},
  {id: '13', name: 'Cave horros', status: 'Active', weight: 4},
  {id: '14', name: 'Cave kraken', status: 'Active', weight: 9},
  {id: '15', name: 'Dagannoth', status: 'Active', weight: 9},
  {id: '16', name: 'Dark beasts', status: 'Active', weight: 11},
  {id: '17', name: 'Drakes', status: 'Active', weight: 8},
  {id: '18', name: 'Dust devils', status: 'Active', weight: 5},
  {id: '19', name: 'Elves', status: 'Active', weight: 4},
  {id: '20', name: 'Fire giants', status: 'Active', weight: 7},
  {id: '21', name: 'Fossil Island Wyverns', status: 'Active', weight: 7},
  {id: '22', name: 'Gargoyles', status: 'Active', weight: 8},
  {id: '23', name: 'Greater demons', status: 'Active', weight: 9},
  {id: '24', name: 'Hellhounds', status: 'Active', weight: 10},
  {id: '25', name: 'Iron dragons', status: 'Active', weight: 5},
  {id: '26', name: 'Kalphites', status: 'Active', weight: 9},
  {id: '27', name: 'Kurasks', status: 'Active', weight: 4},
  {id: '28', name: 'Lizardmen', status: 'Active', weight: 10},
  {id: '29', name: 'Mithril dragons', status: 'Locked', weight: 9},
  {id: '30', name: 'Mutated Zygomites', status: 'Active', weight: 2},
  {id: '31', name: 'Nechryael', status: 'Active', weight: 9},
  {id: '32', name: 'Red dragons', status: 'Locked', weight: 8},
  {id: '33', name: 'Rune dragons', status: 'Active', weight: 2},
  {id: '34', name: 'Skeletal wyverns', status: 'Active', weight: 7},
  {id: '35', name: 'Smoke devils', status: 'Active', weight: 9},
  {id: '36', name: 'Spiritual creatures', status: 'Active', weight: 7},
  {id: '37', name: 'Steel dragons', status: 'Active', weight: 7},
  {id: '38', name: 'Suqahs', status: 'Active', weight: 8},
  {id: '39', name: 'Trolls', status: 'Active', weight: 6},
  {id: '40', name: 'TzHaar', status: 'Locked', weight: 10},
  {id: '41', name: 'Vampyres', status: 'Locked', weight: 8},
  {id: '42', name: 'Warped creatures', status: 'Active', weight: 2},
  {id: '43', name: 'Waterfiends', status: 'Active', weight: 2},
  {id: '44', name: 'Wyrms', status: 'Active', weight: 8},
];

@Component({
  selector: 'app-block-list-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './block-list-table.component.html',
  styleUrl: './block-list-table.component.css'
})
export class BlockListTableComponent implements AfterViewInit{
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status', 'actions'];
  dataSource: MatTableDataSource<TaskData>;

  @Input() totalWeight: number = 0; //weight after blocking tasks
  @Input() averagePoints: number = 0;
  //@Input() tasks: TaskData[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentWeight: number = 0; //weight after skipping tasks
  averagePointsSkip: number = 0; 
  countSkipTasks: number = 0;
  percentageSkipped: number = 0;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(Tasks);
  }

  // Reload with data from parent component
  ngOnChanges() {
    this.currentWeight = this.totalWeight;
    this.averagePointsSkip = this.averagePoints;
    this.recalculateChances();
    console.log('Total weight: ' + this.totalWeight, 'Average points: ' + this.averagePoints);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSkipTask(id: any) {
    const task = Tasks.find(task => task.id === id);
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
    const task = Tasks.find(task => task.id === id);
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
    Tasks.forEach(task => {
      if (task.status != 'Blocked' && task.status != 'Skip') {
        task.chance = this.calculateChance(task.weight);
      }
    });
  }

  calculatePoints() {
    this.averagePointsSkip = ((this.averagePoints*this.currentWeight) - 30*(this.totalWeight-this.currentWeight))/this.currentWeight;
  }

  calculateSkipPercentage() {
    return this.percentageSkipped = (this.countSkipTasks / Tasks.length) * 100;
  }

}
