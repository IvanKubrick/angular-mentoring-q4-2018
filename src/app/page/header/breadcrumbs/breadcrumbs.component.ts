import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: string[];
  fetchedBreadcrumbs: string[] = ['courses'];

  ngOnInit(): void {
    this.breadcrumbs = this.fetchedBreadcrumbs;
  }
}
