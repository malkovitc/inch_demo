import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header.component';
import { provideComponentStore } from '@ngrx/component-store';
import { PortfolioStore } from '@common/store/portfolio.store';

@Component({
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [Header, RouterOutlet, NgIf, AsyncPipe],
    providers: [provideComponentStore(PortfolioStore)],
})
export default class Layout {}
