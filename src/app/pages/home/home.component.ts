import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiRootModule } from '@taiga-ui/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TAIGA_MODULES } from 'app/taiga.modules';
import { WalletAddress } from '@common/models';
import { TypedFormGroup } from '@common/utils/typed-form';
import { WALLET_ADDRESS_LENGTH } from 'app/const';
import { Router } from '@angular/router';
import { LayoutPageRouteNames } from 'app/layout/layout.routes';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, TuiInputModule, TuiRootModule, ...TAIGA_MODULES],
})
export class HomeComponent {
    private readonly router = inject(Router);

    readonly form: TypedFormGroup<{ address: WalletAddress }> = inject(FormBuilder).nonNullable.group({
        address: [
            '' as WalletAddress,
            [
                Validators.required,
                Validators.minLength(WALLET_ADDRESS_LENGTH),
                Validators.maxLength(WALLET_ADDRESS_LENGTH),
            ],
        ],
    });

    submit() {
        this.router.navigate([`/${LayoutPageRouteNames.ADDRESS}`, this.form.getRawValue().address]);
    }
}
