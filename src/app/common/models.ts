import { HttpHeaders } from '@angular/common/http';
import { TuiDayLike } from '@taiga-ui/cdk';
import { DAY_AGO, MOUNTH_AGO, THREE_YEAR_AGO, WEEK_AGO, YEAR_AGO } from 'app/const';

export type WalletAddress = `0x${string}`;
export type ChainID = string;
type DateMs = number;

export interface PortfolioValue {
    timestamp: number;
    value_usd: number;
}

export const ApiStatusNames = {
    IDLE: 'idle',
    LOADING: 'loading',
    OK: 'OK',
    ERROR: 'error',
} as const;

export type ApiStatus = (typeof ApiStatusNames)[keyof typeof ApiStatusNames];

export type ApiResponse<T> = {
    body: T[];
    headers: HttpHeaders;
    ok: boolean;
    status: number;
    statustext: string;
    type: number;
    url: string;
};

export const TIME_RANGE = {
    '24H': '1day',
    '1W': '1week',
    '1M': '1month',
    '1Y': '1year',
    '3Y': '3years',
} as const;

export type TimeRange = (typeof TIME_RANGE)[keyof typeof TIME_RANGE];

export type TabStepRange = keyof typeof TIME_RANGE;

export type ChartRange = {
    [K in TimeRange]: DateMs;
};

export const ChartRange: ChartRange = {
    '1day': DAY_AGO,
    '1week': WEEK_AGO,
    '1month': MOUNTH_AGO,
    '1year': YEAR_AGO,
    '3years': THREE_YEAR_AGO,
};

export const ChartMaxLength: { [K in TimeRange]: TuiDayLike } = {
    '1day': { day: 1 },
    '1week': { day: 7 },
    '1month': { month: 1 },
    '1year': { year: 1 },
    '3years': { year: 3 },
};
