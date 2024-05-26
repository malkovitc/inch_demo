import { inject, Injectable } from '@angular/core';
import { PortfolioClient } from '@common/api/services/portfolio-client';
import {
    ApiResponse,
    ApiStatus,
    ApiStatusNames,
    ChainID,
    PortfolioValue,
    TimeRange,
    WalletAddress,
} from '@common/models';
import { LocalStorageItemNames, LocalStorageService } from '@common/services/local-storage.service';
import { extractAddressListFromRoute, routeHasMultipleAddress } from '@common/utils/const';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { DEFAULT_CHAIN_ID, DEFAULT_TIME_RANGE } from 'app/const';
import { pipe, switchMap, tap } from 'rxjs';

interface PortfolioState {
    addresses: Set<WalletAddress>;
    chains: Set<ChainID>;
    timerange: TimeRange;
    status: ApiStatus;
    total_value: PortfolioValue[];
}

type PortfolioVM = Omit<PortfolioState, 'status'> & { amount: number };

export const initialState: PortfolioState = {
    addresses: new Set(),
    chains: new Set(DEFAULT_CHAIN_ID),
    timerange: DEFAULT_TIME_RANGE,
    status: ApiStatusNames.IDLE,
    total_value: [],
};

@Injectable({ providedIn: 'root' })
export class PortfolioStore extends ComponentStore<PortfolioState> implements OnStoreInit {
    private readonly localStorageService = inject(LocalStorageService);
    private readonly client = inject(PortfolioClient);

    readonly addresses$ = this.select(
        this.select((store) => store.addresses),
        (addresses) => Array.from(addresses),
        { debounce: true },
    );

    readonly chains$ = this.select(
        this.select((store) => store.chains),
        (chains) => Array.from(chains),
    );

    readonly amount$ = this.select((store) => store.total_value[store.total_value.length - 1]);
    readonly timerange$ = this.select((store) => store.timerange);
    readonly total_value$ = this.select((store) => store.total_value);

    readonly vm$ = this.select(
        this.addresses$,
        this.chains$,
        this.timerange$,
        this.total_value$,
        this.amount$,
        (addresses, chains, timerange, total_value, amount) => {
            console.log('total_value', total_value);
            return {
                addresses,
                chains,
                timerange,
                total_value,
                amount,
            };
        },
        { debounce: true },
    );

    ngrxOnStoreInit() {
        const storedAddress = this.localStorageService.getItem<WalletAddress[]>(LocalStorageItemNames.WALLET_ADDRESSES);

        this.setState({
            ...initialState,
            addresses: storedAddress ? new Set(storedAddress) : initialState.addresses,
        });
    }

    readonly removeAddress = this.effect<WalletAddress>(
        tap((address) => {
            const addresses = this.state().addresses;
            addresses.delete(address);
            this.patchState({
                addresses,
            });

            this.localStorageService.setItem(LocalStorageItemNames.WALLET_ADDRESSES, Array.from(addresses));
        }),
    );

    readonly updateTotalValue = this.effect<void>(
        pipe(
            switchMap(() => {
                const { addresses, chains, timerange } = this.state();
                return this.client.getTotalValue({
                    addresses: Array.from(addresses),
                    chain_id: Array.from(chains),
                    timerange,
                });
            }),
            tapResponse(
                (total_value: ApiResponse<PortfolioValue>) => {
                    this.patchState({ total_value: total_value.body });
                },
                (error) => {
                    console.log(error);
                },
            ),
        ),
    );

    readonly updateTimeRange = this.updater((state, timerange: TimeRange) => ({ ...state, timerange }));

    readonly addAddressFromRoute = this.effect<WalletAddress | string>(
        tap((slug) => {
            const address: WalletAddress[] = routeHasMultipleAddress(slug)
                ? extractAddressListFromRoute(slug)
                : [slug as WalletAddress];

            this.patchState({
                addresses: new Set(address),
            });

            this.localStorageService.setItem(LocalStorageItemNames.WALLET_ADDRESSES, address);
        }),
    );
}
