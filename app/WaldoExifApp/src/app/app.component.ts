import { Component, OnInit } from '@angular/core';
import { S3Images } from './shared/sdk/models';
import { S3ImagesApi } from './shared/sdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private s3images: S3Images = new S3Images();

  title = 'EXIF Tool';
  input_url = 'waldo-recruiting';

  constructor(private s3ImagesApi: S3ImagesApi) { }

  ngOnInit() {

  }

  dryRun(event) {
    console.log("@TODO: Dry run!");
    // this.s3ImagesApi.importS3Data(this.input_url).subscribe(() => {
    //   console.log("Import S3 Data call complete!");
    // });
  }

  startProcessing(event) {
    console.log("@TODO: Start processing!");

    this.s3ImagesApi.importS3Data(this.input_url).subscribe(() => {
      console.log("Import S3 Data call complete!");
    });
  }
}
