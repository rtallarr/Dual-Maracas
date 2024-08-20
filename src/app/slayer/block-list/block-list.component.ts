import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export interface TaskData {
  id: string;
  name: string;
  status: string;
  weight: number;
  chance?: number;
}

const Tasks: TaskData[] = [
	{id: '1', name: 'Hellhounds', status: 'Active', weight: 10},
	{id: '2', name: 'Boss', status: 'Active', weight: 12},
	{id: '3', name: 'Ankou', status: 'Active', weight: 5},
	{id: '4', name: 'Adamant dragons', status: 'Active', weight: 2},
	{id: '5', name: 'Abyssal Demon', status: 'Active', weight: 12},
	{id: '6', name: 'Aberrant spectres', status: 'Active', weight: 7},
  {id: '7', name: 'Aviansies', status: 'Locked', weight: 8},
  {id: '8', name: 'Basilisks', status: 'Locked', weight: 7},
  {id: '9', name: 'Black demons', status: 'Active', weight: 8},
  {id: '10', name: 'Black dragons', status: 'Active', weight: 9},
  {id: '11', name: 'Bloodvelds', status: 'Active', weight: 8},
  {id: '12', name: 'Blue dragons', status: 'Active', weight: 4},
  {id: '13', name: 'Cave horros', status: 'Active', weight: 4},
  {id: '14', name: 'Cave kraken', status: 'Active', weight: 9},
];

var totalWeight = 266;

@Component({
  selector: 'app-block-list',
  styleUrl: './block-list.component.css',
  templateUrl: './block-list.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
})
export class BlockListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'weight', 'status','chance', 'actions'];
  dataSource: MatTableDataSource<TaskData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    Tasks.forEach(task => {
      task.chance = this.calculateChance(task.weight);
    });

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(Tasks);
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onBlock(id: any) {
    const task = Tasks.find(task => task.id === id);
    if (task) {
      if (task.status === 'Active') {
        task.status = 'blocked';
        task.chance = 0;
        totalWeight -= task.weight;
      } else if (task.status === 'blocked') {
        task.status = 'Active';
        totalWeight += task.weight;
      }
      //recalculate all chances if they are not blocked
      Tasks.forEach(task => {
        if (task.status === 'Active') {
          task.chance = this.calculateChance(task.weight);
        }
      });
    } else {
      console.error('Task with id: '+ id + 'not found');
    }
  }

  calculateChance(weight: number) {
    return parseFloat((weight / totalWeight * 100).toFixed(2));
  }

}