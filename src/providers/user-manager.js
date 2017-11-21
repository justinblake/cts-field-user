"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var utils_1 = require("../utils/utils");
var UserManager = (function () {
    function UserManager(storage, api) {
        this.storage = storage;
        this.api = api;
        this.authenticated = false;
        this.token = null;
        this.credentials = null;
        this.user = null;
        console.log('Hello UserManager Provider');
    }
    UserManager.prototype.isLoggedIn = function () {
        return this.authenticated;
    };
    UserManager.prototype.initializeVars = function () {
        var _this = this;
        return Promise.all([
            this.initialize('credentials', function (response) { _this.credentials = response; }),
            this.initialize('user', function (response) { _this.user = response; }),
            this.initialize('token', function (response) { _this.token = response; })
        ]);
    };
    UserManager.prototype.testVars = function () {
        console.log('TESTING VARS INI');
        console.log("CREDENTIALS => " + utils_1.Utils.toJson(this.credentials));
        console.log("TOKEN => " + utils_1.Utils.toJson(this.token));
        console.log("USER => " + utils_1.Utils.toJson(this.user));
    };
    UserManager.prototype.initialize = function (key, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getStorageKey(key).then(function (response) {
                callback(response);
                resolve(true);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    UserManager.prototype.authenticate = function (credentials) {
        var _this = this;
        //md5 hash the password
        credentials.password = utils_1.Utils.md5hashStr(credentials.password);
        console.log("credentials => " + credentials);
        return new Promise(function (resolve, reject) {
            _this.api.authenticate(credentials).then(function (response) {
                console.log("" + utils_1.Utils.toJson(response));
                if (response.hasOwnProperty('userdata')) {
                    //RESPONSE IS VALID
                    var data = response;
                    _this.user = data.userdata;
                    _this.token = data.jwt;
                    _this.credentials = credentials;
                    Promise.all([_this.setStorageKey('credentials', _this.credentials), _this.setStorageKey('user', _this.user), _this.setStorageKey('token', _this.token)]).then(function (values) {
                        console.log("" + utils_1.Utils.toJson(values));
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
        //this.authenticated = false;
        /*return new Promise( (resolve, reject ) => {
          Promise.all([this.deleteStorageKey('user'), this.deleteStorageKey('user')]).then(response => {
            resolve(true);
          })
        })*/
        return Promise.all([
            this.deleteStorageKey('user'),
            this.deleteStorageKey('token'),
            this.deleteStorageKey('credentials')
        ]);
    };
    UserManager.prototype.getToken = function () {
        return this.token;
    };
    UserManager.prototype.setToken = function (token) { this.token = token; };
    UserManager.prototype.getCredentials = function () {
        return this.credentials;
    };
    UserManager.prototype.setCredentials = function (credentials) { this.credentials = credentials; };
    UserManager.prototype.getUser = function () {
        return this.user;
    };
    UserManager.prototype.setUser = function (user) { this.user = user; };
    UserManager.prototype.setStorageKey = function (key, value) {
        return this.storage.createOrUpdate(key, value);
        /*return new Promise( (resolve, reject) => {
          this.storage.createOrUpdate(key, value).then( response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })*/
    };
    UserManager.prototype.getStorageKey = function (key) {
        return this.storage.get(key);
        /*return new Promise( (resolve, reject) => {
          this.storage.get(key).then( response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })*/
    };
    UserManager.prototype.deleteStorageKey = function (key) {
        return this.storage["delete"](key);
    };
    UserManager.prototype.checkForToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (token) {
                //console.log(`getToken => ${Utils.toJson(token)}`);
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
UserManager = __decorate([
    core_1.Injectable()
], UserManager);
exports.UserManager = UserManager;
/**
{
    "userdata": {
        "userId": "5",
        "email": "officeuser@test.com",
        "first_name": "Sam",
        "last_name": "Edwards",
        "company_id": "1",
        "role_id": "2",
        "portal": "management"
    },
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0ODU5MDk3OTQsImp0aSI6InNGY2RXV3U2RUVYd2hhWE45TjJKREtzNzN6SUhKeEZQNkVLNVNjeURjTzA9IiwiaXNzIjoid3d3LmNsZWFydGFza3NvbHV0aW9ucy5jb20iLCJuYmYiOjE0ODU5MDk3OTQsImV4cCI6MTQ4NTkxNjk5NCwiZGF0YSI6eyJ1c2VySWQiOiI1Iiwicm9sZUlkIjoiMiJ9fQ.ZlTD4tu9nPZD4OCZxHvxIKB-O0PTNA2Pw6eSlJgfMSmVBGU5VeYdiU-ZzvfsFBDh-SeMRqSB0noXjsG0J_gLhA"
}
*/
