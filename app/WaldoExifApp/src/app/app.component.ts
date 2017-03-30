import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EXIF Tool';
  input_url = 'http://s3.amazonaws.com/waldo-recruiting';

  dryRun(event) {
    console.log("@TODO: Dry run!");
  }

  startProcessing(event) {
    console.log("@TODO: Start processing!");
  }
}
