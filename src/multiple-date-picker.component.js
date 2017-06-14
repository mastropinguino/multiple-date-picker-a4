"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var template_1 = require("./template");
var moment = require("moment/moment");
var MultipleDatePickerComponent = MultipleDatePickerComponent_1 = (function () {
    function MultipleDatePickerComponent() {
        this.cssDaysOfSurroundingMonths = this.cssDaysOfSurroundingMonths || 'picker-empty';
        this.arrow = 0;
        this.month = this.month || moment().startOf('day');
        this.projectScope = [];
        this.days = [];
        this._weekDaysOff = this._weekDaysOff || [];
        this.daysOff = this.daysOff || [];
        this.disableBackButton = false;
        this.disableNextButton = false;
        this.daysOfWeek = [];
        // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
        this.yearsForSelect = [];
        this.propagateChange = function (_) { };
    }
    MultipleDatePickerComponent.prototype.ngOnInit = function () {
        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        this.arrowSelected();
    };
    MultipleDatePickerComponent.prototype.arrowSelected = function () {
        if (this.matIcons) {
            return this.arrow = 1;
        }
        else if (this.fontAwesome) {
            return this.arrow = 2;
        }
    };
    MultipleDatePickerComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== undefined) {
            this.projectScope = value;
            if (value !== null) {
                this.projectScope = this.projectScope.map(function (val) {
                    return moment(val);
                });
                this.projectScope.forEach(function (val) {
                    var day = val;
                    _this.days.forEach(function (d) {
                        if (d.date.isSame(day)) {
                            d.mdp.selected = true;
                            return;
                        }
                    });
                });
            }
        }
    };
    MultipleDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MultipleDatePickerComponent.prototype.registerOnTouched = function () { };
    Object.defineProperty(MultipleDatePickerComponent.prototype, "projectScope2", {
        get: function () {
            return this._projectScope;
        },
        set: function (val) {
            this._projectScope = val;
            this.propagateChange(this._projectScope);
        },
        enumerable: true,
        configurable: true
    });
    MultipleDatePickerComponent.prototype.checkNavigationButtons = function () {
        var today = moment(), previousMonth = moment(this.month).subtract(1, 'month'), nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    };
    MultipleDatePickerComponent.prototype.getDaysOfWeek = function () {
        /*To display days of week names in moment.lang*/
        var momentDaysOfWeek = moment().localeData().weekdaysMin(), daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        }
        else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    };
    MultipleDatePickerComponent.prototype.getMonthYearToDisplay = function () {
        var month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    };
    MultipleDatePickerComponent.prototype.getYearsForSelect = function () {
        var now = moment(), changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0), changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0), min = moment(this.month).subtract(changeYearPast, 'year'), max = moment(this.month).add(changeYearFuture, 'year'), result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    };
    ;
    MultipleDatePickerComponent.prototype.toggleDay = function (event, day) {
        event.preventDefault();
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        var prevented = false;
        event.preventDefault = function () {
            prevented = true;
        };
        if (typeof this.dayClick == 'function') {
            this.dayClick(event, day);
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                this.projectScope.push(day.date);
                // console.log('this project scope = ' + this.projectScope); // for testing keep!
            }
            else {
                var idx = -1;
                for (var i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                    else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1) {
                    this.projectScope.splice(idx, 1);
                }
            }
        }
        this.propagateChange(this.projectScope);
    };
    MultipleDatePickerComponent.prototype.clearDays = function () {
        this.projectScope = [];
        this.generate();
        // console.log('clearDays was fired off'); // for testing
    };
    MultipleDatePickerComponent.prototype.runGenerate = function () {
        this.generate();
    }; // remove this and from html
    MultipleDatePickerComponent.prototype.rightClicked = function (event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    };
    MultipleDatePickerComponent.prototype.getDayClasses = function (day) {
        var css = '';
        if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
            css += ' ' + day.css;
        }
        if (this.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
            css += ' ' + this.cssDaysOfSurroundingMonths;
        }
        if (day.mdp.selected) {
            css += ' picker-selected';
        }
        if (!day.selectable) {
            css += ' picker-off';
        }
        if (day.mdp.today) {
            css += ' today';
        }
        if (day.mdp.past) {
            css += ' past';
        }
        if (day.mdp.future) {
            css += ' future';
        }
        if (day.mdp.otherMonth) {
            css += ' picker-other-month';
        }
        return css;
    };
    /*Navigate to another month*/
    MultipleDatePickerComponent.prototype.changeMonth = function (event, disable, add) {
        if (disable) {
            return;
        }
        event.preventDefault();
        var prevented = false;
        event.preventDefault = function () {
            // console.log('entered into preventDefault *****'); // for testing
            prevented = true;
        };
        var monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        if (!prevented) {
            var oldMonth = moment(this.month);
            this.month = monthTo;
            if (typeof this.monthChanged == 'function') {
                this.monthChanged(this.month, oldMonth);
            }
            this.generate();
        }
    };
    /*Change year*/
    MultipleDatePickerComponent.prototype.changeYear = function (year) {
        this.month = this.month.year(parseInt(year, 10));
    };
    ;
    /*Check if the date is off : unselectable*/
    MultipleDatePickerComponent.prototype.isDayOff = function (day) {
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(this.disableDaysBefore, 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
            ((this.weekDaysOff instanceof Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff instanceof Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed instanceof Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((this.highlightDays instanceof Array) && this.highlightDays.some(function (highlightDay) {
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
            }));
    };
    /*Check if the date is selected*/
    MultipleDatePickerComponent.prototype.isSelected = function (day) {
        return this.projectScope.some(function (d) {
            return day.date.isSame(d, 'day');
        });
    };
    /*Generate the calendar*/
    MultipleDatePickerComponent.prototype.generate = function () {
        var _this = this;
        var year = this.month.year().toString();
        this.yearsForSelect = this.getYearsForSelect();
        this.monthToDisplay = this.getMonthYearToDisplay();
        this.yearToDisplay = this.month.format('YYYY');
        var previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');
        if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
            previousDay = previousDay.add(1, 'week');
        }
        var firstDayOfMonth = moment(this.month).date(1), days = [], now = moment(), lastDay = moment(firstDayOfMonth).endOf('month'), createDate = function () {
            var day = {
                selectable: true,
                date: moment(previousDay.add(1, 'day')),
                css: '',
                title: '',
                mdp: {
                    selected: false,
                    today: false,
                    past: true,
                    future: true,
                    otherMonth: false
                }
            };
            if ((_this.highlightDays instanceof Array)) {
                var hlDay = _this.highlightDays.filter(function (d) {
                    return day.date.isSame(d.date, 'day');
                });
                day.css = hlDay.length > 0 ? hlDay[0].css : '';
                day.title = hlDay.length > 0 ? hlDay[0].title : '';
            }
            day.selectable = !_this.isDayOff(day);
            // console.log('this.sameDaySelect() = ' + this.isSelected(day));
            day.mdp.selected = _this.isSelected(day);
            day.mdp.today = day.date.isSame(now, 'day');
            day.mdp.past = day.date.isBefore(now, 'day');
            day.mdp.future = day.date.isAfter(now, 'day');
            if (!day.date.isSame(_this.month, 'month')) {
                day.mdp.otherMonth = true;
            }
            return day;
        };
        var maxDays = lastDay.diff(previousDay, 'days'), lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();
        this.propagateChange(this.projectScope);
    };
    MultipleDatePickerComponent.prototype.findArrayofDays = function () {
        console.log('this.projectScope = ' + this.projectScope);
    };
    return MultipleDatePickerComponent;
}());
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "highlightDays");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "dayClick");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "dayHover");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "rightClick");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "monthChanged");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "fontAwesome");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "matIcons");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "monthClick");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "weekDaysOff");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "allDaysOff");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "daysAllowed");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "disableNavigation");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "disallowBackPastMonths");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "disallowGoFuturMonths");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "showDaysOfSurroundingMonths");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "cssDaysOfSurroundingMonths");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "fireEventsForDaysOfSurroundingMonths");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "disableDaysBefore");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "disableDaysAfter");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "changeYearPast");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "changeYearFuture");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "projectScope");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "sundayFirstDay");
__decorate([
    core_1.Input()
], MultipleDatePickerComponent.prototype, "_projectScope");
MultipleDatePickerComponent = MultipleDatePickerComponent_1 = __decorate([
    core_1.Component({
        selector: 'multiple-date-picker',
        template: template_1.DEFAULT_TEMPLATE,
        styles: [template_1.DEFAULT_STYLES],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return MultipleDatePickerComponent_1; }),
                multi: true
            }
        ]
    })
], MultipleDatePickerComponent);
exports.MultipleDatePickerComponent = MultipleDatePickerComponent;
var MultipleDatePickerComponent_1;
