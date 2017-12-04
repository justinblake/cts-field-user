"use strict";
var core_1 = require("@angular/core");
/** animations */
var Animations = (function () {
    function Animations() {
    }
    return Animations;
}());
Animations.expandCollapse = core_1.trigger('expandCollapse', [
    core_1.state('collapse', core_1.style({ height: "0px", color: 'transparent' })),
    core_1.state('expand', core_1.style({ height: "*" })),
    core_1.transition('expand => collapse', [core_1.style({}), core_1.animate('250ms ease-out')]),
    core_1.transition('collapse => expand', [core_1.style({}), core_1.animate('250ms ease-out')])
]);
exports.Animations = Animations;
