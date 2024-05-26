import { WalletAddress } from '../models';

export const routeHasMultipleAddress = (route: string): boolean => route.includes('-');
export const extractAddressListFromRoute = (route: string): WalletAddress[] => route.split('-') as WalletAddress[];
export const getDateFromUnixStamp = (stamp: number) => new Date(stamp * 1000);

export const objectKeys = <T extends object>(obj: T) => {
    return Object.keys(obj) as Array<keyof T>;
};
