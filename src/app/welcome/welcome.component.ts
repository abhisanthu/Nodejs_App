import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',                         // selector for routing
  templateUrl: './welcome.component.html',          // html page linked for this welcome component
  styleUrls: ['./welcome.component.scss']          // scss styles page linked for this welcome component
})
export class WelcomeComponent implements OnInit {

  title="appiness all around";   // one way data binding using interpolation {{ }} , bind value form .ts to .html

  constructor() {   // method called when page load

    
  }

  ngOnInit() {  // this method will call after constructo()
  }

}
