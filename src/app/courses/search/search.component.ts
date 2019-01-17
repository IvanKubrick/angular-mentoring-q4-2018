import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchString: string;

  @Output()
  searchButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  onSearchButtonClick(): void {
    this.searchButtonClicked.emit(this.searchString);
  }
}
