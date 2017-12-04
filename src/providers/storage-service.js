"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var StorageService = (function () {
    function StorageService(storage) {
        this.storage = storage;
        console.log('Hello StorageService Provider');
    }
    StorageService.prototype.add = function (key, value) {
        return this.createOrUpdate(key, value);
    };
    StorageService.prototype.update = function (key, value) {
        return this.createOrUpdate(key, value);
    };
    StorageService.prototype.createOrUpdate = function (key, value) {
        return this.storage.set(key, value);
    };
    StorageService.prototype.get = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype["delete"] = function (key) {
        return this.storage.remove(key);
    };
    StorageService.prototype.getAllKeys = function () {
        return this.storage.keys();
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable()
], StorageService);
exports.StorageService = StorageService;
