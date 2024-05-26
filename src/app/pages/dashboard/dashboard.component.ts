import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TIME_RANGE, TabStepRange } from '@common/models';
import { RoundPipe } from '@common/pipes/round.pipe';
import { TruncPipe } from '@common/pipes/trunc.pipe';
import { PortfolioStore } from '@common/store/portfolio.store';
import { TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import {
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiTabsModule,
} from '@taiga-ui/kit';
import { YEAR_AGO } from 'app/const';
import { ProfitsTableComponent } from 'app/ui/profits-table/profits-table.component';

import { RangeChartComponent } from 'app/ui/range-chart/range-chart.component';
import { TabsComponent } from 'app/ui/tabs/tabs.component';
import { map } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RangeChartComponent,
        ProfitsTableComponent,
        CommonModule,
        AsyncPipe,
        RoundPipe,
        TruncPipe,
        NgIf,
        TabsComponent,

        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiDataListDropdownManagerModule,
        TuiTabsModule,
        TuiHostedDropdownModule,
        TuiSvgModule,
        TuiInputModule,
    ],
})
export class DashboardComponent implements OnInit {
    readonly store = inject(PortfolioStore);
    readonly route = inject(ActivatedRoute);
    readonly vm$ = this.store.vm$;

    ngOnInit(): void {
        this.store.addAddressFromRoute(this.route.params.pipe(map((param) => param['address'])));
        this.store.updateTotalValue();
    }

    updateTimeRange(range: TabStepRange) {
        this.store.updateTimeRange(TIME_RANGE[range]);
        this.store.updateTotalValue();
    }
}
