import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import jsonData from '../../../assets/data/guideData.json';

@Component({
  selector: 'app-bruh-guide',
  imports: [
    NavbarComponent,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  templateUrl: './bruh-guide.component.html',
  styleUrl: './bruh-guide.component.css'
})
export class BruhGuideComponent {
  data: any = jsonData;

  ngOnInit() {
    console.log(this.data);
  }
}
