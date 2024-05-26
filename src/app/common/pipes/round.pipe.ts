import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'round',
    standalone: true,
})
export class RoundPipe implements PipeTransform {
    transform(value: number, precision: number = 0) {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
}
