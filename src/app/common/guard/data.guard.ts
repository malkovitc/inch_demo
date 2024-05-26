import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { PortfolioStore } from '@common/store/portfolio.store';
import { map, take } from 'rxjs';

export function dataGuard(): CanMatchFn {
    return () => {
        const router = inject(Router);
        return inject(PortfolioStore).addresses$.pipe(
            map((addresses) => {
                console.log('hasAddress...', addresses);
                // if (hasAddress) return hasAddress;
                return true;
                return router.parseUrl('/');
            }),
            take(1),
        );
    };
}
