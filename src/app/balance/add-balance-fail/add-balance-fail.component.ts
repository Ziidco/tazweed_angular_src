import { Component, OnInit } from '@angular/core';
import{faTimesCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-balance-fail',
  templateUrl: './add-balance-fail.component.html',
  styleUrls: ['./add-balance-fail.component.css']
})
export class AddBalanceFailComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
