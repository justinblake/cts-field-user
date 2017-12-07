import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
// import {Utils} from '../utils/utils';
import {StorageService} from './storage-service';
import {ApiService} from './api-service';

@Injectable()
export class UserManager {

    private authenticated: boolean = false;
    private token: string = null;
    private credentials: any = null;
    private user: any = null;

    constructor(private storage: StorageService, private api: ApiService) {
        console.log('Hello UserManager Provider');
    }

    isLoggedIn() {
        return this.authenticated;
    }

    initializeVars() {
        return Promise.all(
            [
                this.initialize('credentials', (response: any): void => {
                    this.credentials = response
                }),
                this.initialize('user', (response: any): void => {
                    this.user = response
                }),
                this.initialize('token', (response: any): void => {
                    this.token = response
                })
            ]
        )
    }

    initialize(key, callback) {
        return new Promise((resolve, reject) => {
            this.getStorageKey(key).then((response) => {
                callback(response);
                resolve(true)
            }).catch((error) => {
                reject(error);
            })
        })
    }

    md5Password(credentials) {
        console.log('credentials in user manager ', JSON.stringify(credentials));
        return new Promise((resolve, reject) => {
            this.api.md5(credentials.password).then(response => {
                console.log('response in md5Password', JSON.stringify(response));
                resolve(response);
            })
        })
    }

    authenticate(credentials) {
        //md5 hash the password

        return new Promise((resolve, reject) => {
            this.api.authenticate(credentials).then(response => {
                if (response.hasOwnProperty('userdata')) {
                    //RESPONSE IS VALID
                    let data: any = response;
                    this.user = data.userdata;
                    this.token = data.jwt;
                    this.credentials = credentials;
                    Promise.all([this.setStorageKey('credentials', this.credentials), this.setStorageKey('user', this.user), this.setStorageKey('token', this.token)]).then(values => {
                        resolve(true);
                    })
                } else {
                    //NOPE
                    resolve(false);
                }
            })
        })


    }

    logout() {
        return Promise.all(
            [
                this.deleteStorageKey('user'),
                this.deleteStorageKey('token'),
                this.deleteStorageKey('credentials'),
                this.deleteStorageKey('timecardStatus')
            ]
        );
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }

    getCredentials() {
        return this.credentials;
    }

    setCredentials(credentials) {
        this.credentials = credentials
    }

    getUser() {
        return this.user;
    }

    getUserId() {
        return this.user.userId;
    }

    setUser(user) {
        this.user = user
    }

    setStorageKey(key, value) {
        return this.storage.createOrUpdate(key, value);
    }

    getStorageKey(key) {
        return this.storage.get(key);
    }

    deleteStorageKey(key) {
        return this.storage.delete(key);
    }

    getAllStorage() {
        return this.storage.getAllKeys();
    }

    checkForToken() {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                if (token) {
                    this.token = token;
                    resolve(token);
                } else {
                    resolve(false);
                }
            });
        })
    }

    checkForCredentials() {
        return new Promise((resolve, reject) => {
            this.getStorageKey('credentials').then(credentials => {
                if (credentials) {
                    this.credentials = credentials;
                    resolve(credentials);
                } else {
                    this.credentials = null;
                    resolve(null)
                }
            })
        })
    }
}
