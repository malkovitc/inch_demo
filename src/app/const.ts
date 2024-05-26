export const WALLET_ADDRESS_LENGTH = 42;
export const DEFAULT_TIME_RANGE = '1year';
export const DEFAULT_CHAIN_ID = '1';

export const THREE_YEAR_AGO = new Date().setFullYear(new Date().getFullYear() - 3);
export const YEAR_AGO = new Date().setFullYear(new Date().getFullYear() - 1);
export const MOUNTH_AGO = new Date().setMonth(new Date().getMonth() - 1);
export const WEEK_AGO = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
export const DAY_AGO = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).getTime();
