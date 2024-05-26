import { HttpInterceptorFn } from '@angular/common/http';

export function authInterceptor(): HttpInterceptorFn {
    return (req, next) => {
        console.log('authInterceptor...');
        req = req.clone({
            setHeaders: { Authorization: `Bearer nT4KcKlel3cSdKyYs3RAV5YkJuUFjfr0` },
        });

        return next(req);
    };
}
