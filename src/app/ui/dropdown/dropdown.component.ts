import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiControlModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import {
    TUI_ARROW,
    TuiMultiSelectModule,
    TuiMultiSelectOptionModule,
    TuiSelectOptionModule,
    TuiValueAccessorModule,
} from '@taiga-ui/kit';
import { TAIGA_MODULES } from 'app/taiga.modules';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [
        ...TAIGA_MODULES,
        RouterModule,
        TuiMultiSelectOptionModule,
        TuiSelectOptionModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TuiValueAccessorModule,
        TuiControlModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDropdownModule,
        TuiHostedDropdownModule,
        TuiMultiSelectModule,
    ],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
    value = [];

    readonly burgers = ['Hamburger', 'Cheeseburger'];

    readonly drinks = ['Cola', 'Tea', 'Coffee', 'Slurm'];

    readonly arrow = TUI_ARROW;
}
