import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trunc',
    standalone: true,
})
export class TruncPipe implements PipeTransform {
    transform(value: string, headSize: number = 6, tailSize: number = 4) {
        return `${value.slice(0, headSize)}...${value.slice(value.length - tailSize)}`;
    }
}
