import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/** methods for reading and writing from storage */
var /** methods for reading and writing from storage */
StorageService = /** @class */ (function () {
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
    StorageService.prototype.delete = function (key) {
        return this.storage.remove(key);
    };
    StorageService.prototype.getAllKeys = function () {
        return this.storage.keys();
    };
    return StorageService;
}());
/** methods for reading and writing from storage */
export { StorageService };
//# sourceMappingURL=storage-service.js.map