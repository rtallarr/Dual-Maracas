import { Component, AfterViewInit, ViewChild, Input, inject, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskData } from '../../models/slayer.type';
import { Quest } from '../../models/slayer.type';
import { TaskReq } from '../../models/slayer.type';

@Component({
    selector: 'app-block-list-table',
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
        MatCheckboxModule,
        MatGridListModule
    ],
    templateUrl: './block-list-table.component.html',
    styleUrl: './block-list-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlockListTableComponent implements OnInit, AfterViewInit, OnChanges{

  Tasksreqs: TaskReq[] = [
    {name: 'Aberrant spectres', slayer: 60, combat: 65, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Abyssal Demon', slayer: 85, combat: 85, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Adamant dragons', slayer: 1, combat: 1, unlockable: false, quests: ['Dragon Slayer II']},
    {name: 'Ankou', slayer: 1, combat: 40, unlockable: false, quests: []},
    {name: 'Araxytes', slayer: 92, combat: 1, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Aviansies', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Bandits', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Banshees', slayer: 15, combat: 20, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Basilisks', slayer: 40, combat: 1, unlockable: true, quests: []},
    {name: 'Bats', slayer: 1, combat: 5, unlockable: false, quests: []},
    {name: 'Bears', slayer: 1, combat: 13, unlockable: false, quests: []},
    {name: 'Birds', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Black demons', slayer: 1, combat: 80, unlockable: false, quests: []},
    {name: 'Black dragons', slayer: 1, combat: 80, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Black Knights', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Bloodvelds', slayer: 50, combat: 50, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Blue dragons', slayer: 1, combat: 65, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Boss', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Brine rats', slayer: 47, combat: 45, unlockable: false, quests: ['Olaf\'s Quest']},
    {name: 'Bronze dragons', slayer: 1, combat: 75, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Catablepon', slayer: 1, combat: 35, unlockable: false, quests: []},
    {name: 'Cave bugs', slayer: 7, combat: 1, unlockable: false, quests: []},
    {name: 'Cave crawlers', slayer: 10, combat: 10, unlockable: false, quests: []},
    {name: 'Cave horrors', slayer: 58, combat: 85, unlockable: false, quests: ['Cabin Fever']},
    {name: 'Cave slimes', slayer: 17, combat: 15, unlockable: false, quests: []},
    {name: 'Cave kraken', slayer: 87, combat: 80, unlockable: false, quests: []},
    {name: 'Chaos druids', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Cockatrice', slayer: 25, combat: 25, unlockable: false, quests: []},
    {name: 'Cows', slayer: 1, combat: 5, unlockable: false, quests: []},
    {name: 'Crawling hands', slayer: 5, combat: 1, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Crocodiles', slayer: 1, combat: 50, unlockable: false, quests: []},
    {name: 'Dagannoth', slayer: 1, combat: 75, unlockable: false, quests: ['Horror from the Deep']},
    {name: 'Dark beasts', slayer: 90, combat: 90, unlockable: false, quests: ['Mourning\'s End Part II']},
    {name: 'Dark warriors', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Dogs', slayer: 1, combat: 15, unlockable: false, quests: []},  
    {name: 'Drakes', slayer: 84, combat: 1, unlockable: false, quests: []},
    {name: 'Dust devils', slayer: 65, combat: 70, unlockable: false, quests: ['Desert Treasure I']},
    {name: 'Dwarves', slayer: 1, combat: 6, unlockable: false, quests: []},
    {name: 'Earth warriors', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Elves', slayer: 1, combat: 70, unlockable: false, quests: ['Regicide']},
    {name: 'Ents', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Fever spiders', slayer: 42, combat: 40, unlockable: false, quests: ['Rum Deal']},
    {name: 'Fire giants', slayer: 1, combat: 65, unlockable: false, quests: []},
    {name: 'Flesh crawlers', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Fossil Island Wyverns', slayer: 66, combat: 60, unlockable: false, quests: ['Bone Voyage', 'Elemental Workshop I']},
    {name: 'Gargoyles', slayer: 75, combat: 80, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Ghosts', slayer: 1, combat: 13, unlockable: false, quests: []},
    {name: 'Ghouls', slayer: 1, combat: 25, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Goblins', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Greater demons', slayer: 1, combat: 75, unlockable: false, quests: []},
    {name: 'Green dragons', slayer: 1, combat: 65, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Harpie bug swarms', slayer: 33, combat: 33, unlockable: false, quests: []},
    {name: 'Hellhounds', slayer: 1, combat: 75, unlockable: false, quests: []},
    {name: 'Hill giants', slayer: 1, combat: 25, unlockable: false, quests: []},
    {name: 'Hobgoblins', slayer: 1, combat: 20, unlockable: false, quests: []},
    {name: 'Hydras', slayer: 95, combat: 1, unlockable: false, quests: []},
    {name: 'Icefiends', slayer: 1, combat: 20, unlockable: false, quests: []},
    {name: 'Ice giants', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Ice warriors', slayer: 1, combat: 45, unlockable: false, quests: []},
    {name: 'Infernal mages', slayer: 45, combat: 40, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Iron dragons', slayer: 1, combat: 80, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Jellies', slayer: 52, combat: 57, unlockable: false, quests: []},
    {name: 'Jungle horrors', slayer: 1, combat: 65, unlockable: false, quests: ['Cabin Fever']},
    {name: 'Kalphites', slayer: 1, combat: 15, unlockable: false, quests: []},
    {name: 'Killerwatts', slayer: 37, combat: 37, unlockable: false, quests: []},
    {name: 'Kurasks', slayer: 70, combat: 65, unlockable: false, quests: []},
    {name: 'Lava dragons', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Lesser demons', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Lesser Nagua', slayer: 48, combat: 1, unlockable: false, quests: []},
    {name: 'Lizardmen', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'lizards', slayer: 22, combat: 1, unlockable: false, quests: []},
    {name: 'Magic axes', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Mammoth', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Minions of Scabaras', slayer: 1, combat: 85, unlockable: false, quests: ['Contact!']},
    {name: 'Mithril dragons', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Mogres', slayer: 32, combat: 1, unlockable: false, quests: []},
    {name: 'Molanisks', slayer: 39, combat: 50, unlockable: false, quests: []},
    {name: 'Monkeys', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Moss giants', slayer: 1, combat: 40, unlockable: false, quests: []},
    {name: 'Mutated Zygomites', slayer: 57, combat: 60, unlockable: false, quests: ['Lost City']},
    {name: 'Nechryael', slayer: 80, combat: 85, unlockable: false, quests: ['Priest in Peril']},
    {name: 'Ogres', slayer: 1, combat: 40, unlockable: false, quests: []},
    {name: 'Otherworldly beings', slayer: 1, combat: 40, unlockable: true, quests: ['Lost City']},
    {name: 'Pirates', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Pyrefiends', slayer: 30, combat: 25, unlockable: false, quests: []},
    {name: 'Rats', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Red dragons', slayer: 1, combat: 68, unlockable: true, quests: ['Dragon Slayer I']},
    {name: 'Revenants', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Rockslugs', slayer: 20, combat: 20, unlockable: false, quests: []},
    {name: 'Rogue', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Rune dragons', slayer: 1, combat: 1, unlockable: false, quests: ['Dragon Slayer II']},
    {name: 'Scorpions', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Sea snakes', slayer: 40, combat: 50, unlockable: false, quests: ['Royal Trouble']},
    {name: 'Shades', slayer: 1, combat: 30, unlockable: false, quests: []},
    {name: 'Shadow warriors', slayer: 1, combat: 60, unlockable: false, quests: ['Legends\' Quest']},
    {name: 'Skeletal wyverns', slayer: 72, combat: 70, unlockable: false, quests: ['Elemental Workshop I']},
    {name: 'Skeletons', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Smoke devils', slayer: 93, combat: 85, unlockable: false, quests: []},
    {name: 'Sourhogs', slayer: 1, combat: 1, unlockable: false, quests: ['A Porcine of Interest']},
    {name: 'Spiders', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Spiritual creatures', slayer: 63, combat: 60, unlockable: false, quests: ['Death Plateau']},
    {name: 'Steel dragons', slayer: 1, combat: 85, unlockable: false, quests: ['Dragon Slayer I']},
    {name: 'Suqahs', slayer: 1, combat: 85, unlockable: false, quests: ['Lunar Diplomacy']},
    {name: 'Terror dogs', slayer: 40, combat: 60, unlockable: false, quests: ['Haunted Mine']},
    {name: 'Trolls', slayer: 1, combat: 60, unlockable: false, quests: []},
    {name: 'Turoth', slayer: 55, combat: 60, unlockable: false, quests: []},
    {name: 'TzHaar', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Vampyres', slayer: 1, combat: 35, unlockable: true, quests: ['Priest in Peril']},
    {name: 'Wall beasts', slayer: 35, combat: 30, unlockable: false, quests: []},
    {name: 'Warped creatures', slayer: 1, combat: 1, unlockable: true, quests: []},
    {name: 'Waterfiends', slayer: 1, combat: 75, unlockable: false, quests: []},
    {name: 'Werewolves', slayer: 1, combat: 1, unlockable: false, quests: []},
    {name: 'Wolves', slayer: 1, combat: 20, unlockable: false, quests: []},
    {name: 'Wyrms', slayer: 62, combat: 1, unlockable: false, quests: []},
    {name: 'Zombies', slayer: 1, combat: 10, unlockable: false, quests: []}
  ];

  private _snackBar = inject(MatSnackBar);

  @Input() quests: Quest[] = [];
  @Input() Tasks: TaskData[] = [];
  @Input() averagePoints: number = 0;
  @Input() userLevels: any = {};
  @Input() masterName: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  allComplete: boolean = false;
  tasksBlocked: number = 0;

  activeWeight: number = 0;
  blockedWeight: number = 0;
  lockedWeight: number = 0;
  skipWeight: number = 0;
  totalWeight: number = 0;
  
  averagePointsSkip: number = 0; 
  countSkipTasks: number = 0;
  percentageSkipped: number = 0;

  displayedColumns: string[] = ['name', 'weight', 'chance', 'status'];
  dataSource!: MatTableDataSource<TaskData>;

  ngOnChanges(changes: SimpleChanges) {
    //heavily slows down the app
    if (changes['Tasks'] && Array.isArray(this.Tasks)) {
      // Avoid recreating form controls if they already exist
      this.Tasks = this.Tasks.map(task => {
        if (!task.statusControl) {
          task.statusControl = new FormControl(
            this.Tasksreqs.find(req => req.name === task.name)?.unlockable 
              ? 'Locked' 
              : 'Active'
          );
          task.prevStatus = task.statusControl.value;
        }
        return task;
      });
  
      // Create datasource only when Tasks actually change
      this.dataSource = new MatTableDataSource(this.Tasks);
      this.dataSource.sort = this.sort;

      this.checkLockedTasks(this.userLevels.combat, this.userLevels.slayer);
    }

    if (changes['quests'] || changes['userLevels']) {
      //console.log("Changes detected");
      this.checkLockedTasks(this.userLevels.combat, this.userLevels.slayer);
      //this.printLvls();
    }

    if (changes['averagePoints']) {
      this.calculateWeights();
    }
  }

  // Reload with data from parent component
  ngOnInit() {
		this.Tasks = this.Tasks.map(task => ({
      ...task,
      statusControl: new FormControl(this.Tasksreqs.find(req => req.name === task.name)?.unlockable ? 'Locked' : 'Active'), //if unlockable, set to locked
      prevStatus: task.statusControl?.value,
    }));
    this.dataSource = new MatTableDataSource(this.Tasks);
    
    this.calculateWeights();
    this.totalWeight = this.activeWeight + this.blockedWeight + this.lockedWeight + this.skipWeight;
    
    this.checkLockedTasks(this.userLevels.combat, this.userLevels.slayer);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeStatus(task: TaskData) {
    //console.log("new:", task.statusControl?.value, "prev:", task.prevStatus);
    this.tasksBlocked = this.Tasks.filter(task => task.statusControl?.value === 'Blocked').length;

    if (task.statusControl?.value === 'Active') {
      if (task.prevStatus === 'Skip') {
        this.countSkipTasks--;
      }
      task.statusControl?.setValue('Active');
    } else if (task.statusControl?.value === 'Blocked') {
      if (task.prevStatus === 'Skip') {
        this.countSkipTasks--;
      }
      if (this.tasksBlocked > 7) {
        this._snackBar.open('You have more than 7 tasks blocked!', 'Close', {
          duration: 2500
        });
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

  printLvls() {
    console.log('Combat: ' + this.userLevels.combatLvl, 'Slayer: ' + this.userLevels.slayerLvl);
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
    if (!this.quests) {
      console.error('No quests data available');
      return;
    }

    this.Tasks.forEach(task => {
      let taskReq = this.Tasksreqs.find(req => req.name === task.name);
      let questsCompleted = taskReq?.quests.length === 0 ||
      taskReq?.quests.every(quest =>
        this.quests.find((q: { name: string; completed: boolean }) => q.name === quest)?.completed //true if quests reqs are met
      );
      
      if (taskReq && (taskReq.combat > combat || taskReq.slayer > slayer || !questsCompleted)) {
        task.statusControl?.setValue('Locked');
      } else if (taskReq && (taskReq.combat <= combat && taskReq.slayer <= slayer) && (task.statusControl?.value === 'Locked' && !taskReq.unlockable)) { 
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
    //console.log('totalWeight: ' + this.totalWeight, 'blockedWeight: ' + this.blockedWeight, 'skipWeight: ' + this.skipWeight);
    let withoutBlocks = this.totalWeight-this.blockedWeight;
    let finalWeight = withoutBlocks - this.skipWeight;
    this.averagePointsSkip = (((this.averagePoints*finalWeight) - (30*(withoutBlocks-finalWeight)))/withoutBlocks); //points earned - cost of skip
    this.averagePointsSkip = parseFloat(this.averagePointsSkip.toFixed(3));
    //console.log('withoutBlocks: ' + withoutBlocks, 'finalWeight: ' + finalWeight, 'averagePointsSkip: ' + this.averagePointsSkip);
    //this.printPoints();
  }

  printPoints() {
    console.log('Average Points: ' + this.averagePoints, 'Average Points Skip: ' + this.averagePointsSkip);
  }

  calculateSkipPercentage() {
    return this.percentageSkipped = parseFloat(((this.countSkipTasks / this.Tasks.length) * 100).toFixed(2));
  }

}