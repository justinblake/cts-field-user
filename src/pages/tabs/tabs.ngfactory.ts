/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../node_modules/ionic-angular/components/tabs/tab.ngfactory';
import * as i2 from 'ionic-angular/components/tabs/tab';
import * as i3 from 'ionic-angular/components/tabs/tabs';
import * as i4 from 'ionic-angular/components/app/app';
import * as i5 from 'ionic-angular/config/config';
import * as i6 from 'ionic-angular/platform/platform';
import * as i7 from 'ionic-angular/gestures/gesture-controller';
import * as i8 from 'ionic-angular/transitions/transition-controller';
import * as i9 from 'ionic-angular/navigation/deep-linker';
import * as i10 from 'ionic-angular/platform/dom-controller';
import * as i11 from '@angular/common';
import * as i12 from '../../../node_modules/ionic-angular/components/tabs/tabs.ngfactory';
import * as i13 from 'ionic-angular/components/split-pane/split-pane';
import * as i14 from 'ionic-angular/navigation/nav-controller';
import * as i15 from 'ionic-angular/navigation/view-controller';
import * as i16 from 'ionic-angular/platform/keyboard';
import * as i17 from './tabs';
import * as i18 from '../../providers/task-manager';
import * as i19 from '../../providers/user-manager';
const styles_TabsPage:any[] = ([] as any[]);
export const RenderType_TabsPage:i0.RendererType2 = i0.ɵcrt({encapsulation:2,styles:styles_TabsPage,
    data:{}});
function View_TabsPage_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      1,'ion-tab',[['role','tabpanel'],['tabIcon','fa-users'],['tabTitle','Crews']],
      [[1,'id',0],[1,'aria-labelledby',0]],(null as any),(null as any),i1.View_Tab_0,
      i1.RenderType_Tab)),i0.ɵdid(245760,(null as any),0,i2.Tab,[i3.Tabs,i4.App,i5.Config,
      i6.Platform,i0.ElementRef,i0.NgZone,i0.Renderer,i0.ComponentFactoryResolver,
      i0.ChangeDetectorRef,i7.GestureController,i8.TransitionController,[2,i9.DeepLinker],
      i10.DomController,i0.ErrorHandler],{root:[0,'root'],tabTitle:[1,'tabTitle'],
      tabIcon:[2,'tabIcon']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_2:any = _co.tab5Root;
        const currVal_3:any = 'Crews';
        const currVal_4:any = 'fa-users';
        _ck(_v,3,0,currVal_2,currVal_3,currVal_4);
      },(_ck,_v) => {
        const currVal_0:any = i0.ɵnov(_v,3)._tabId;
        const currVal_1:any = i0.ɵnov(_v,3)._btnId;
        _ck(_v,2,0,currVal_0,currVal_1);
      });
}
function View_TabsPage_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      1,'ion-tab',[['role','tabpanel'],['tabIcon','fa-clock-o'],['tabTitle','Timecard']],
      [[1,'id',0],[1,'aria-labelledby',0]],(null as any),(null as any),i1.View_Tab_0,
      i1.RenderType_Tab)),i0.ɵdid(245760,(null as any),0,i2.Tab,[i3.Tabs,i4.App,i5.Config,
      i6.Platform,i0.ElementRef,i0.NgZone,i0.Renderer,i0.ComponentFactoryResolver,
      i0.ChangeDetectorRef,i7.GestureController,i8.TransitionController,[2,i9.DeepLinker],
      i10.DomController,i0.ErrorHandler],{root:[0,'root'],tabTitle:[1,'tabTitle'],
      tabIcon:[2,'tabIcon']},(null as any)),(_l()(),i0.ɵted((null as any),['\n        ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_2:any = _co.tab4Root;
        const currVal_3:any = 'Timecard';
        const currVal_4:any = 'fa-clock-o';
        _ck(_v,3,0,currVal_2,currVal_3,currVal_4);
      },(_ck,_v) => {
        const currVal_0:any = i0.ɵnov(_v,3)._tabId;
        const currVal_1:any = i0.ɵnov(_v,3)._btnId;
        _ck(_v,2,0,currVal_0,currVal_1);
      });
}
function View_TabsPage_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      1,'ion-tab',[['role','tabpanel'],['tabIcon','fa-history'],['tabTitle','History']],
      [[1,'id',0],[1,'aria-labelledby',0]],(null as any),(null as any),i1.View_Tab_0,
      i1.RenderType_Tab)),i0.ɵdid(245760,(null as any),0,i2.Tab,[i3.Tabs,i4.App,i5.Config,
      i6.Platform,i0.ElementRef,i0.NgZone,i0.Renderer,i0.ComponentFactoryResolver,
      i0.ChangeDetectorRef,i7.GestureController,i8.TransitionController,[2,i9.DeepLinker],
      i10.DomController,i0.ErrorHandler],{root:[0,'root'],tabTitle:[1,'tabTitle'],
      tabIcon:[2,'tabIcon']},(null as any)),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'ion-tab',[['role','tabpanel'],
          ['tabBadgeStyle','danger'],['tabIcon','fa-alert'],['tabTitle','Alerts']],
          [[1,'id',0],[1,'aria-labelledby',0]],[[(null as any),'tabBadgeChange']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('tabBadgeChange' === en)) {
              const pd_0:any = ((<any>(_co.taskManager.badgeNumber = $event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i1.View_Tab_0,i1.RenderType_Tab)),i0.ɵdid(245760,(null as any),0,i2.Tab,
          [i3.Tabs,i4.App,i5.Config,i6.Platform,i0.ElementRef,i0.NgZone,i0.Renderer,
              i0.ComponentFactoryResolver,i0.ChangeDetectorRef,i7.GestureController,
              i8.TransitionController,[2,i9.DeepLinker],i10.DomController,i0.ErrorHandler],
          {root:[0,'root'],tabTitle:[1,'tabTitle'],tabIcon:[2,'tabIcon'],tabBadge:[3,
              'tabBadge'],tabBadgeStyle:[4,'tabBadgeStyle']},(null as any)),(_l()(),
          i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_TabsPage_3)),i0.ɵdid(16384,(null as any),
          0,i11.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:any = _co.tab2Root;
    const currVal_3:any = 'History';
    const currVal_4:any = 'fa-history';
    _ck(_v,3,0,currVal_2,currVal_3,currVal_4);
    const currVal_7:any = _co.tab3Root;
    const currVal_8:any = 'Alerts';
    const currVal_9:any = 'fa-alert';
    const currVal_10:any = _co.taskManager.badgeNumber;
    const currVal_11:any = 'danger';
    _ck(_v,6,0,currVal_7,currVal_8,currVal_9,currVal_10,currVal_11);
    const currVal_12:boolean = !_co.isLessor;
    _ck(_v,9,0,currVal_12);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵnov(_v,3)._tabId;
    const currVal_1:any = i0.ɵnov(_v,3)._btnId;
    _ck(_v,2,0,currVal_0,currVal_1);
    const currVal_5:any = i0.ɵnov(_v,6)._tabId;
    const currVal_6:any = i0.ɵnov(_v,6)._btnId;
    _ck(_v,5,0,currVal_5,currVal_6);
  });
}
export function View_TabsPage_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),12,'ion-tabs',[['selectedIndex',
      '0']],(null as any),(null as any),(null as any),i12.View_Tabs_0,i12.RenderType_Tabs)),
      i0.ɵprd(6144,(null as any),i13.RootNode,(null as any),[i3.Tabs]),i0.ɵdid(4374528,
          (null as any),0,i3.Tabs,[[2,i14.NavController],[2,i15.ViewController],i4.App,
              i5.Config,i0.ElementRef,i6.Platform,i0.Renderer,i9.DeepLinker,i16.Keyboard],
          {selectedIndex:[0,'selectedIndex']},(null as any)),(_l()(),i0.ɵted(0,['\n    '])),
      (_l()(),i0.ɵeld(0,(null as any),0,1,'ion-tab',[['role','tabpanel'],['tabIcon',
          'fa-home'],['tabTitle','Home']],[[1,'id',0],[1,'aria-labelledby',0]],(null as any),
          (null as any),i1.View_Tab_0,i1.RenderType_Tab)),i0.ɵdid(245760,(null as any),
          0,i2.Tab,[i3.Tabs,i4.App,i5.Config,i6.Platform,i0.ElementRef,i0.NgZone,i0.Renderer,
              i0.ComponentFactoryResolver,i0.ChangeDetectorRef,i7.GestureController,
              i8.TransitionController,[2,i9.DeepLinker],i10.DomController,i0.ErrorHandler],
          {root:[0,'root'],tabTitle:[1,'tabTitle'],tabIcon:[2,'tabIcon']},(null as any)),
      (_l()(),i0.ɵted(0,['\n    '])),(_l()(),i0.ɵand(16777216,(null as any),0,1,(null as any),
          View_TabsPage_1)),i0.ɵdid(16384,(null as any),0,i11.NgIf,[i0.ViewContainerRef,
          i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted(0,['\n    '])),
      (_l()(),i0.ɵand(16777216,(null as any),0,1,(null as any),View_TabsPage_2)),i0.ɵdid(16384,
          (null as any),0,i11.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted(0,['\n\n'])),(_l()(),i0.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i17.TabsPage = _v.component;
    const currVal_0:any = '0';
    _ck(_v,2,0,currVal_0);
    const currVal_3:any = _co.tab1Root;
    const currVal_4:any = 'Home';
    const currVal_5:any = 'fa-home';
    _ck(_v,5,0,currVal_3,currVal_4,currVal_5);
    const currVal_6:any = _co.foremanTab;
    _ck(_v,8,0,currVal_6);
    const currVal_7:boolean = !_co.disableTabs;
    _ck(_v,11,0,currVal_7);
  },(_ck,_v) => {
    const currVal_1:any = i0.ɵnov(_v,5)._tabId;
    const currVal_2:any = i0.ɵnov(_v,5)._btnId;
    _ck(_v,4,0,currVal_1,currVal_2);
  });
}
export function View_TabsPage_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'ng-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_TabsPage_0,RenderType_TabsPage)),
      i0.ɵdid(49152,(null as any),0,i17.TabsPage,[i18.TaskManager,i19.UserManager],
          (null as any),(null as any))],(null as any),(null as any));
}
export const TabsPageNgFactory:i0.ComponentFactory<i17.TabsPage> = i0.ɵccf('ng-component',
    i17.TabsPage,View_TabsPage_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2p1c3Rpbi9kZXYvY3RzLWZpZWxkLXVzZXIvc3JjL3BhZ2VzL3RhYnMvdGFicy5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qdXN0aW4vZGV2L2N0cy1maWVsZC11c2VyL3NyYy9wYWdlcy90YWJzL3RhYnMudHMiLCJuZzovLy9Vc2Vycy9qdXN0aW4vZGV2L2N0cy1maWVsZC11c2VyL3NyYy9wYWdlcy90YWJzL3RhYnMuaHRtbCIsIm5nOi8vL1VzZXJzL2p1c3Rpbi9kZXYvY3RzLWZpZWxkLXVzZXIvc3JjL3BhZ2VzL3RhYnMvdGFicy50cy5UYWJzUGFnZV9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxpb24tdGFicyBzZWxlY3RlZEluZGV4PVwiMFwiPlxuICAgIDxpb24tdGFiIFtyb290XT1cInRhYjFSb290XCIgdGFiVGl0bGU9XCJIb21lXCIgdGFiSWNvbj1cImZhLWhvbWVcIj48L2lvbi10YWI+XG4gICAgPGRpdiAqbmdJZj1cImZvcmVtYW5UYWJcIj5cbiAgICAgICAgPGlvbi10YWIgW3Jvb3RdPVwidGFiNVJvb3RcIiB0YWJUaXRsZT1cIkNyZXdzXCIgdGFiSWNvbj1cImZhLXVzZXJzXCI+PC9pb24tdGFiPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhZGlzYWJsZVRhYnNcIj5cbiAgICAgICAgPGlvbi10YWIgW3Jvb3RdPVwidGFiMlJvb3RcIiB0YWJUaXRsZT1cIkhpc3RvcnlcIiB0YWJJY29uPVwiZmEtaGlzdG9yeVwiPjwvaW9uLXRhYj5cbiAgICAgICAgPGlvbi10YWIgW3Jvb3RdPVwidGFiM1Jvb3RcIiB0YWJUaXRsZT1cIkFsZXJ0c1wiIHRhYkljb249XCJmYS1hbGVydFwiXG4gICAgICAgICAgICAgICAgIFsodGFiQmFkZ2UpXT1cInRhc2tNYW5hZ2VyLmJhZGdlTnVtYmVyXCIgdGFiQmFkZ2VTdHlsZT1cImRhbmdlclwiPjwvaW9uLXRhYj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFpc0xlc3NvclwiPlxuICAgICAgICAgICAgPGlvbi10YWIgW3Jvb3RdPVwidGFiNFJvb3RcIiB0YWJUaXRsZT1cIlRpbWVjYXJkXCIgdGFiSWNvbj1cImZhLWNsb2NrLW9cIj48L2lvbi10YWI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2lvbi10YWJzPlxuIiwiPG5nLWNvbXBvbmVudD48L25nLWNvbXBvbmVudD4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNFSTtNQUFBLHdFQUF3QjthQUFBLGdDQUNwQjtNQUFBO01BQUE7dUJBQUEsVUFBQTs7d0VBQUE7dUNBQUE7TUFBQSxzQ0FBeUU7OztRQUFoRTtRQUFrQjtRQUFpQjtRQUE1QyxXQUFTLFVBQWtCLFVBQWlCLFNBQTVDOztRQUFBO1FBQUE7UUFBQSxXQUFBLG1CQUFBOzs7O29CQU1BO01BQUEsd0VBQXVCO2FBQUEsb0NBQ25CO01BQUE7TUFBQTt1QkFBQSxVQUFBOzt3RUFBQTt1Q0FBQTtNQUFBLHNDQUE4RTs7O1FBQXJFO1FBQWtCO1FBQW9CO1FBQS9DLFdBQVMsVUFBa0IsVUFBb0IsU0FBL0M7O1FBQUE7UUFBQTtRQUFBLFdBQUEsbUJBQUE7Ozs7b0JBTFI7TUFBQSx3RUFBMEI7YUFBQSxnQ0FDdEI7TUFBQTtNQUFBO3VCQUFBLFVBQUE7O3dFQUFBO3VDQUFBO01BQUEsc0NBQTZFO01BQzdFO1VBQUE7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUNTO2NBQUE7Y0FBQTtZQUFBO1lBRFQ7VUFBQSwyQ0FBQTtVQUFBOztzQ0FBQTtVQUFBO2NBQUEsOERBQ2lGO2lCQUFBLGdDQUNqRjtVQUFBLHVEQUFBO1VBQUE7TUFFTTs7SUFMRztJQUFrQjtJQUFtQjtJQUE5QyxXQUFTLFVBQWtCLFVBQW1CLFNBQTlDO0lBQ1M7SUFBa0I7SUFBa0I7SUFDcEM7SUFBdUM7SUFEaEQsV0FBUyxVQUFrQixVQUFrQixVQUNwQyxXQUF1QyxVQURoRDtJQUVLO0lBQUwsV0FBSyxVQUFMOztJQUhBO0lBQUE7SUFBQSxXQUFBLG1CQUFBO0lBQ0E7SUFBQTtJQUFBLFdBQUEsbUJBQUE7Ozs7b0JBUFI7TUFBQTthQUFBLGlFQUFBO1VBQUE7d0ZBQUE7VUFBQSxtREFBNEI7TUFDeEI7VUFBQTtVQUFBLHVEQUFBO1VBQUE7O3NDQUFBO1VBQUE7TUFBdUUsK0JBQ3ZFO1VBQUEseUJBQUE7d0JBQUEsbUNBRU07TUFDTixrRkFBQTtVQUFBO1VBQUEsZUFPTSw2QkFFQztVQUFBOztJQWREO0lBQVYsV0FBVSxTQUFWO0lBQ2E7SUFBa0I7SUFBZ0I7SUFBM0MsV0FBUyxVQUFrQixVQUFnQixTQUEzQztJQUNLO0lBQUwsV0FBSyxTQUFMO0lBR0s7SUFBTCxZQUFLLFNBQUw7O0lBSkE7SUFBQTtJQUFBLFdBQUEsbUJBQUE7Ozs7b0JDREo7TUFBQTthQUFBO1VBQUE7OzsifQ==
