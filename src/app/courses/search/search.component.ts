import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input()
  searchString$: Subject<string>;

  @Output()
  addCourseButtonClicked: EventEmitter<void> = new EventEmitter();

  onAddCourseButtonClick(): void {
    this.addCourseButtonClicked.emit();
  }

  onSearchInputChange(searchString: string): void {
    if (searchString.length > 2) {
      this.searchString$.next(searchString);
    }
  }
}
