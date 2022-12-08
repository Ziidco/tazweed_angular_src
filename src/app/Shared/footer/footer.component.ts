import { Component, OnInit } from '@angular/core';
import { faFacebookF,faTwitter,faInstagram,faLinkedinIn,faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
  faWhatsapp = faWhatsapp;
  dateNow;
  // faMugHot = faMugHot;
  // faEnvelope = faEnvelope;
  ngOnInit(): void {
    this.dateNow = new Date();
  }

}
