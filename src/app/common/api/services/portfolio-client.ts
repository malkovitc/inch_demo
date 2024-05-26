import { Injectable } from '@angular/core';
import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { RequestBuilder } from '../request-builder';
import { ApiResponse, ChainID, PortfolioValue, WalletAddress } from '@common/models';

const PortfolioParamsNames = {
    ADRESSES: 'addresses',
    CHAIN_ID: 'chain_id',
    TIME_RANGE: 'timerange',
} as const;

type TotalValueParamsName = (typeof PortfolioParamsNames)[keyof typeof PortfolioParamsNames];
type TIME_RANGE = string;

export interface TotalValueParams {
    [PortfolioParamsNames.ADRESSES]: WalletAddress[];
    [PortfolioParamsNames.CHAIN_ID]: ChainID[];
    [PortfolioParamsNames.TIME_RANGE]: TIME_RANGE;
}

export type DetailParams = Omit<TotalValueParams, typeof PortfolioParamsNames.CHAIN_ID>;
export type ProfitsAndLossParams = DetailParams;

@Injectable({
    providedIn: 'root',
})
export class PortfolioClient extends BaseApiClient {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    static readonly TotalValuePath = 'portfolio/v3/portfolio/overview/total_value_chart?';
    static readonly TotalProfitsAndLossPath =
        '/v3/portfolio/overview/total_profit_and_loss?timerange={timerange}&addresses={addresses}';

    getTotalValue(params: TotalValueParams, context?: HttpContext): Observable<ApiResponse<PortfolioValue>> {
        const rb = new RequestBuilder(this.rootUrl, PortfolioClient.TotalValuePath, 'get');

        /**
         * Sets a query parameter
         */
        Object.entries(params).forEach(([name, value]) => rb.query(name, value, {}));

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                    context: context,
                }),
            )
            .pipe(filter((r: any) => r instanceof HttpResponse));
    }

    getTotalProfitAndLoss$(
        params: {
            timerange: string;
            addresses: string;
        },
        context?: HttpContext,
    ): Observable<any> {
        const rb = new RequestBuilder(this.rootUrl, PortfolioClient.TotalProfitsAndLossPath, 'get');

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                    context: context,
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                // map((r: HttpResponse<any>) => {
                //   return r as StrictHttpResponse<{
                //     article: Article;
                //   }>;
                // })
            );
    }
}
