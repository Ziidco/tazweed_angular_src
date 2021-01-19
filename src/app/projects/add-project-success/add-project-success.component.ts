import { Component, OnInit } from '@angular/core';
import{faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-project-success',
  templateUrl: './add-project-success.component.html',
  styleUrls: ['./add-project-success.component.css']
})
export class AddProjectSuccessComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
