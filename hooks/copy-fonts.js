var copyfiles = require('copyfiles');
module.exports = function (context) {

    var something = function () {
    };

    copyfiles([
            'node_modules/ionic-angular/fonts/**/*',
            'www/assets/fonts'
        ],
        true,
        something);
}
