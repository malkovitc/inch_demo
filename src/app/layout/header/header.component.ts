import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TAIGA_MODULES } from 'app/taiga.modules';
import { DropdownComponent } from 'app/ui/dropdown/dropdown.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, DropdownComponent],
})
export class Header {
    @Input() isAuthenticated = false;
    @Input() username?: string;
}
