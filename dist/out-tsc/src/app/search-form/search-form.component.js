import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FilterDocument } from '../models/filter-document';
var SearchFormComponent = /** @class */ (function () {
    function SearchFormComponent() {
        this.filter = new FilterDocument(0, "", "", null, null);
    }
    SearchFormComponent.prototype.ngOnInit = function () {
    };
    SearchFormComponent.prototype.onSendFilter = function (number, name, status, dateStart, dateFinish) {
    };
    SearchFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search-form',
            templateUrl: './search-form.component.html',
            styleUrls: ['./search-form.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SearchFormComponent);
    return SearchFormComponent;
}());
export { SearchFormComponent };
//# sourceMappingURL=search-form.component.js.map