import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnDestroy {
  show: boolean = false;

  private subscription: Subscription;

  constructor(private readonly loaderService: LoaderService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loading$.subscribe((loading: boolean) => {
      this.show = loading;
      this.changeDetectorRef.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
