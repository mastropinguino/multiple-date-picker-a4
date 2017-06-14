import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultipleDatePickerComponent } from './multiple-date-picker.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MultipleDatePickerComponent,
    ],
    exports: [MultipleDatePickerComponent]
})
export class MultipleDatePickerModule { }
