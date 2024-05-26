import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    effect,
    inject,
    input,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartMaxLength, ChartRange, PortfolioValue, TimeRange } from '@common/models';
import { LabelsPipe } from '@common/pipes/labels.pipe';
import { RoundPipe } from '@common/pipes/round.pipe';
import { getDateFromUnixStamp } from '@common/utils/const';
import { TuiAxesModule, TuiLineChartModule, TuiLineDaysChartModule } from '@taiga-ui/addon-charts';
import {
    TUI_IS_E2E,
    TuiDay,
    TuiDayLike,
    TuiDayRange,
    TuiFilterPipeModule,
    TuiMapperPipeModule,
    TuiTypedMapper,
    TuiTypedMatcher,
    tuiPure,
} from '@taiga-ui/cdk';
import { TUI_MONTHS, TuiPoint } from '@taiga-ui/core';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';
import { YEAR_AGO } from 'app/const';

@Component({
    selector: 'app-range-chart',
    standalone: true,
    imports: [
        TuiLineDaysChartModule,
        TuiInputDateRangeModule,
        TuiFilterPipeModule,
        TuiMapperPipeModule,
        TuiLineChartModule,
        FormsModule,
        ReactiveFormsModule,
        TuiAxesModule,
        LabelsPipe,
        CommonModule,
    ],
    providers: [RoundPipe],
    templateUrl: './range-chart.component.html',
    styleUrl: './range-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeChartComponent implements OnInit {
    timerange = input.required<TimeRange>();
    chartData = input.required<PortfolioValue[]>();

    // magic num
    heigth = 1000;
    readonly months$ = inject(TUI_MONTHS);
    readonly isE2E = inject(TUI_IS_E2E);
    readonly cd = inject(ChangeDetectorRef);
    readonly roundPipe = inject(RoundPipe);
    maxLength: TuiDayLike = { month: 12 };

    data: TuiDayRange = new TuiDayRange(TuiDay.fromUtcNativeDate(new Date(YEAR_AGO)), TuiDay.currentLocal());
    show = this.data;

    days: ReadonlyArray<ReadonlyArray<[TuiDay, number]>> = [];

    ngOnInit(): void {
        this.initChartData();
    }

    get range(): TuiDayRange {
        return this.computeRange(this.show);
    }

    constructor() {
        effect(() => {
            this.initChartData();
        });
    }

    private initChartData() {
        console.log('timerange...', this.timerange(), this.chartData());
        this.data = new TuiDayRange(
            TuiDay.fromUtcNativeDate(new Date(ChartRange[this.timerange()])),
            TuiDay.currentLocal(),
        );
        const chartData = this.chartData();
        // todo: replace height calc to fn
        const maxValue = chartData
            .slice()
            .map((item) => item.value_usd)
            .sort((a: number, b: number) => a - b)
            .slice(-1)[0];

        this.heigth = maxValue + (10 / 100) * maxValue;
        const _days = this.mapDataToChartView(chartData);
        this.show = this.data;
        this.days = [_days];
        this.maxLength = ChartMaxLength[this.timerange()];
        this.cd.markForCheck();
    }

    @tuiPure
    getWidth({ from, to }: TuiDayRange): number {
        return TuiDay.lengthBetween(from, to);
    }

    @tuiPure
    getDate(day: TuiDay | number, date: TuiDay): TuiDay {
        return day instanceof TuiDay ? day : date.append({ day });
    }

    readonly filter: TuiTypedMatcher<[readonly [TuiDay, number], TuiDayRange]> = ([day], { from, to }) =>
        day.daySameOrAfter(from) && day.daySameOrBefore(to);

    readonly toNumbers: TuiTypedMapper<[ReadonlyArray<readonly [TuiDay, number]>, TuiDayRange], readonly TuiPoint[]> = (
        days,
        { from },
    ) => days.map(([day, value]) => [TuiDay.lengthBetween(from, day), value]);

    onDataChange(data: TuiDayRange): void {
        console.log('onDataChange data...', data);
        // this.days = this.mapDataToChartView(this.portfolioValue);
        // this.days = this.computeArrays(data);
        // this.days = this.computeArrays(data);
    }

    @tuiPure
    private computeRange(range: TuiDayRange): TuiDayRange {
        const { from, to } = range;
        const length = TuiDay.lengthBetween(from, to);
        const dayOfWeekFrom = from.dayOfWeek();
        const dayOfWeekTo = to.dayOfWeek();
        const mondayFrom = dayOfWeekFrom ? from.append({ day: 7 - dayOfWeekFrom }) : from;
        const mondayTo = dayOfWeekTo ? to.append({ day: 7 - dayOfWeekTo }) : to;
        const mondaysLength = TuiDay.lengthBetween(mondayFrom, mondayTo);

        if (length > 90) {
            return range;
        }

        if (length > 60) {
            return new TuiDayRange(mondayFrom, mondayTo.append({ day: mondaysLength % 14 }));
        }

        if (length > 14) {
            return new TuiDayRange(mondayFrom, mondayTo);
        }

        return new TuiDayRange(from, to.append({ day: length % 2 }));
    }

    @tuiPure
    private mapDataToChartView(data: PortfolioValue[]): ReadonlyArray<[TuiDay, number]> {
        return data.map((item) => [TuiDay.fromUtcNativeDate(getDateFromUnixStamp(item.timestamp)), item.value_usd]);
    }
}
