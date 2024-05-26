import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { HomeComponent } from '@pages/home/home.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    providers: [],
    imports: [HomeComponent, TuiRootModule, RouterOutlet],
})
export class AppComponent {}
