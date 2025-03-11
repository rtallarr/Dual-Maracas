import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import jsonData from '../../../assets/data/guideData.json';

@Component({
  selector: 'app-bruh-guide',
  imports: [
    NavbarComponent, 
    MatCheckboxModule
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
