import { trigger, state, style, transition, animate } from '@angular/animations';

/** animations */
export class Animations {
  public static expandCollapse = trigger('expandCollapse', [
      state('collapse',  style({ height:"0px", color: 'transparent' })),
      state('expand',    style({ height:"*"})),
      transition('expand => collapse', [ style({}), animate('250ms ease-out') ]),
      transition('collapse => expand', [ style({}), animate('250ms ease-out') ])
    ])
}
