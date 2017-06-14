import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultipleDatePickerComponent } from './multiple-date-picker.component';
var MultipleDatePickerModule = (function () {
    function MultipleDatePickerModule() {
    }
    return MultipleDatePickerModule;
}());
export { MultipleDatePickerModule };
MultipleDatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    MultipleDatePickerComponent,
                ],
                exports: [MultipleDatePickerComponent]
            },] },
];
/** @nocollapse */
MultipleDatePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=multiple-date-picker.module.js.map