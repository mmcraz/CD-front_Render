import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todoApp';

  public newData: any = '';
  readonly apiEndpoint = 'http://localhost:5039/api/tododb/';

  public list: any = [];

  constructor(private httpClient: HttpClient) {}

  refreshData() {
    this.httpClient.get(this.apiEndpoint + 'getData').subscribe((data) => {
      this.list = data;
    });
  }
  add() {
    let formData = new FormData();
    formData.append('addData', this.newData);
    this.httpClient
      .post(this.apiEndpoint + 'addData', formData)
      .subscribe((data) => {
        console.log('Data Added.');
        this.refreshData();
      });
  }

  delete(id: any) {
    this.httpClient
      .delete(this.apiEndpoint + 'deleteData?id=' + id)
      .subscribe((data) => {
        console.log('Data deleted.');
        this.refreshData();
      });
  }

  ngOnInit() {
    this.refreshData();
  }
}
