import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Utils } from '../utils/utils';
import { StorageService } from './storage-service';
import { ApiService } from './api-service';
var UserManager = /** @class */ (function () {
    function UserManager(storage, api) {
        this.storage = storage;
        this.api = api;
        console.log('Hello UserManager Provider');
    }
    UserManager.prototype.isLoggedIn = function () {
        return this.authenticated;
    };
    UserManager.prototype.initializeVars = function () {
        var _this = this;
        return Promise.all([
            this.initialize('credentials', function (response) {
                _this.credentials = response;
            }),
            this.initialize('user', function (response) {
                _this.user = response;
            }),
            this.initialize('token', function (response) {
                _this.token = response;
            })
        ]);
    };
    UserManager.prototype.initialize = function (key, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStorageKey(key).then(function (response) {
                callback(response);
                resolve(true);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    UserManager.prototype.md5Password = function (credentials) {
        var _this = this;
        console.log('credentials in user manager ', JSON.stringify(credentials));
        return new Promise(function (resolve, reject) {
            _this.api.md5(credentials.password).then(function (response) {
                console.log('response in md5Password', JSON.stringify(response));
                resolve(response);
            });
        });
    };
    UserManager.prototype.authenticate = function (credentials) {
        var _this = this;
        //md5 hash the password
        return new Promise(function (resolve, reject) {
            _this.api.authenticate(credentials).then(function (response) {
                if (response.hasOwnProperty('userdata')) {
                    //RESPONSE IS VALID
                    var data = response;
                    _this.user = data.userdata;
                    _this.token = data.jwt;
                    _this.credentials = credentials;
                    Promise.all([_this.setStorageKey('credentials', _this.credentials), _this.setStorageKey('user', _this.user), _this.setStorageKey('token', _this.token)]).then(function (values) {
                        resolve(true);
                    });
                }
                else {
                    //NOPE
                    resolve(false);
                }
            });
        });
    };
    UserManager.prototype.logout = function () {
        return Promise.all([
            this.deleteStorageKey('user'),
            this.deleteStorageKey('token'),
            this.deleteStorageKey('credentials'),
            this.deleteStorageKey('timecardStatus')
        ]);
    };
    UserManager.prototype.getToken = function () {
        return this.token;
    };
    UserManager.prototype.setToken = function (token) {
        this.token = token;
    };
    UserManager.prototype.getCredentials = function () {
        return this.credentials;
    };
    UserManager.prototype.setCredentials = function (credentials) {
        this.credentials = credentials;
    };
    UserManager.prototype.getUser = function () {
        return this.user;
    };
    UserManager.prototype.getUserId = function () {
        return this.user.userId;
    };
    UserManager.prototype.setUser = function (user) {
        this.user = user;
    };
    UserManager.prototype.setStorageKey = function (key, value) {
        return this.storage.createOrUpdate(key, value);
    };
    UserManager.prototype.getStorageKey = function (key) {
        return this.storage.get(key);
    };
    UserManager.prototype.deleteStorageKey = function (key) {
        return this.storage.delete(key);
    };
    UserManager.prototype.getAllStorage = function () {
        return this.storage.getAllKeys();
    };
    UserManager.prototype.checkForToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (token) {
                if (token) {
                    _this.token = token;
                    resolve(token);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    UserManager.prototype.checkForCredentials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStorageKey('credentials').then(function (credentials) {
                if (credentials) {
                    _this.credentials = credentials;
                    resolve(credentials);
                }
                else {
                    _this.credentials = null;
                    resolve(null);
                }
            });
        });
    };
    return UserManager;
}());
export { UserManager };
//# sourceMappingURL=user-manager.js.map