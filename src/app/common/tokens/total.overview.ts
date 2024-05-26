import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const TOTAL_VALUE_BEARER = new InjectionToken<Storage | null>('total value', {
    factory: () => {
        const document = inject(DOCUMENT, { optional: true });

        if (document?.defaultView) {
            return document?.defaultView?.localStorage;
        }

        return null;
    },
});
