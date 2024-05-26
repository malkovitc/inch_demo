import { ChangeDetectionStrategy, Component, OnInit, input, output } from '@angular/core';
import { TIME_RANGE, TabStepRange, TimeRange } from '@common/models';
import { objectKeys } from '@common/utils/const';
import { TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import {
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiTabsModule,
} from '@taiga-ui/kit';

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiDataListDropdownManagerModule,
        TuiTabsModule,
        TuiHostedDropdownModule,
        TuiSvgModule,
        TuiInputModule,
    ],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
    onRangeChange = output<TabStepRange>();
    timerange = input.required<TimeRange>();
    activeItemIndex = 0;

    readonly steps = objectKeys(TIME_RANGE);

    constructor() {}

    ngOnInit(): void {
        // ugly cause tui-tabs consume only int index to define active tab
        this.activeItemIndex = this.getActiveIndex(this.timerange());
    }

    selectTab(range: TabStepRange): void {
        this.onRangeChange.emit(range);
    }

    getActiveIndex(range: TimeRange): number {
        return Object.values(TIME_RANGE).indexOf(range);
    }
}
