import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Urban Metro Railway Official';
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }
}
