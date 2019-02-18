import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  searchString: string;

  @Output()
  addCourseButtonClicked: EventEmitter<void> = new EventEmitter();

  onAddCourseButtonClick(): void {
    this.addCourseButtonClicked.emit();
  }
}
