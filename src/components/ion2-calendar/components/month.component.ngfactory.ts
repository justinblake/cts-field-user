/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from './month.component';
import * as i3 from '@angular/forms';
const styles_MonthComponent:any[] = ([] as any[]);
export const RenderType_MonthComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_MonthComponent,data:{}});
function View_MonthComponent_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'small',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['','']))],(null as any),(_ck,_v) => {
    const currVal_0:any = (((<any>(<any>_v.parent).parent).context.$implicit == null)? (null as any): (<any>(<any>_v.parent).parent).context.$implicit.subTitle);
    _ck(_v,1,0,currVal_0);
  });
}
function View_MonthComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'button',([] as any[]),
      [[8,'className',0],[2,'today',(null as any)],[2,'marked',(null as any)],[2,'on-selected',
          (null as any)],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.onSelected((<any>_v.parent).context.$implicit)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n              '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'p',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),['\n              '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MonthComponent_4)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n            ']))],(_ck,
      _v) => {
    const currVal_6:any = (<any>_v.parent).context.$implicit.subTitle;
    _ck(_v,6,0,currVal_6);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = ('days-btn ' + (<any>_v.parent).context.$implicit.cssClass);
    const currVal_1:any = (<any>_v.parent).context.$implicit.isToday;
    const currVal_2:any = (<any>_v.parent).context.$implicit.marked;
    const currVal_3:any = _co.isSelected((<any>_v.parent).context.$implicit.time);
    const currVal_4:any = (<any>_v.parent).context.$implicit.disable;
    _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4);
    const currVal_5:any = (<any>_v.parent).context.$implicit.title;
    _ck(_v,3,0,currVal_5);
  });
}
function View_MonthComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'days']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MonthComponent_3)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n          ']))],(_ck,_v) => {
    const currVal_0:any = _v.context.$implicit;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_MonthComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      4,'div',[['class','days-box']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['\n          '])),(_l()(),i0.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_MonthComponent_2)),i0.ɵdid(802816,
      (null as any),0,i1.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,i0.IterableDiffers],
      {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵted((null as any),['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.month.days;
    _ck(_v,5,0,currVal_0);
  },(null as any));
}
function View_MonthComponent_8(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'small',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['','']))],(null as any),(_ck,_v) => {
    const currVal_0:any = (((<any>(<any>_v.parent).parent).context.$implicit == null)? (null as any): (<any>(<any>_v.parent).parent).context.$implicit.subTitle);
    _ck(_v,1,0,currVal_0);
  });
}
function View_MonthComponent_7(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'button',([] as any[]),
      [[8,'className',0],[2,'today',(null as any)],[2,'marked',(null as any)],[2,'on-selected',
          (null as any)],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.onSelected((<any>_v.parent).context.$implicit)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n              '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'p',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),['\n              '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MonthComponent_8)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n            ']))],(_ck,
      _v) => {
    const currVal_6:any = (<any>_v.parent).context.$implicit.subTitle;
    _ck(_v,6,0,currVal_6);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = ('days-btn ' + (<any>_v.parent).context.$implicit.cssClass);
    const currVal_1:any = (<any>_v.parent).context.$implicit.isToday;
    const currVal_2:any = (<any>_v.parent).context.$implicit.marked;
    const currVal_3:any = _co.isSelected((<any>_v.parent).context.$implicit.time);
    const currVal_4:any = (<any>_v.parent).context.$implicit.disable;
    _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4);
    const currVal_5:any = (<any>_v.parent).context.$implicit.title;
    _ck(_v,3,0,currVal_5);
  });
}
function View_MonthComponent_6(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'days']],[[2,'startSelection',(null as any)],[2,'endSelection',(null as any)],
      [2,'between',(null as any)]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n            '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MonthComponent_7)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n          ']))],(_ck,_v) => {
    const currVal_3:any = _v.context.$implicit;
    _ck(_v,3,0,currVal_3);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.isStartSelection(_v.context.$implicit);
    const currVal_1:any = _co.isEndSelection(_v.context.$implicit);
    const currVal_2:any = _co.isBetween(_v.context.$implicit);
    _ck(_v,0,0,currVal_0,currVal_1,currVal_2);
  });
}
function View_MonthComponent_5(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      4,'div',[['class','days-box']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['\n          '])),(_l()(),i0.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_MonthComponent_6)),i0.ɵdid(802816,
      (null as any),0,i1.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,i0.IterableDiffers],
      {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵted((null as any),['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.month.days;
    _ck(_v,5,0,currVal_0);
  },(null as any));
}
export function View_MonthComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,(null as any),
      (null as any),7,'div',([] as any[]),[[8,'className',0]],(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),
      i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MonthComponent_1)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MonthComponent_5)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵted((null as any),['\n  ']))],(_ck,_v) => {
    var _co:i2.MonthComponent = _v.component;
    const currVal_1:any = (_co.pickMode !== 'range');
    _ck(_v,4,0,currVal_1);
    const currVal_2:any = (_co.pickMode === 'range');
    _ck(_v,7,0,currVal_2);
  },(_ck,_v) => {
    var _co:i2.MonthComponent = _v.component;
    const currVal_0:any = _co.color;
    _ck(_v,1,0,currVal_0);
  });
}
export function View_MonthComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'ion-calendar-month',
      ([] as any[]),(null as any),(null as any),(null as any),View_MonthComponent_0,
      RenderType_MonthComponent)),i0.ɵprd(5120,(null as any),i3.NG_VALUE_ACCESSOR,
      (p0_0:any) => {
        return [p0_0];
      },[i2.MonthComponent]),i0.ɵdid(114688,(null as any),0,i2.MonthComponent,[i0.ChangeDetectorRef],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,2,0);
  },(null as any));
}
export const MonthComponentNgFactory:i0.ComponentFactory<i2.MonthComponent> = i0.ɵccf('ion-calendar-month',
    i2.MonthComponent,View_MonthComponent_Host_0,{month:'month',pickMode:'pickMode',
        isSaveHistory:'isSaveHistory',id:'id',color:'color'},{onChange:'onChange'},
    ([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2p1c3Rpbi9kZXYvY3RzLWZpZWxkLXVzZXIvc3JjL2NvbXBvbmVudHMvaW9uMi1jYWxlbmRhci9jb21wb25lbnRzL21vbnRoLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qdXN0aW4vZGV2L2N0cy1maWVsZC11c2VyL3NyYy9jb21wb25lbnRzL2lvbjItY2FsZW5kYXIvY29tcG9uZW50cy9tb250aC5jb21wb25lbnQudHMiLCJuZzovLy9Vc2Vycy9qdXN0aW4vZGV2L2N0cy1maWVsZC11c2VyL3NyYy9jb21wb25lbnRzL2lvbjItY2FsZW5kYXIvY29tcG9uZW50cy9tb250aC5jb21wb25lbnQudHMuTW9udGhDb21wb25lbnQuaHRtbCIsIm5nOi8vL1VzZXJzL2p1c3Rpbi9kZXYvY3RzLWZpZWxkLXVzZXIvc3JjL2NvbXBvbmVudHMvaW9uMi1jYWxlbmRhci9jb21wb25lbnRzL21vbnRoLmNvbXBvbmVudC50cy5Nb250aENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIlxuICAgIDxkaXYgW2NsYXNzXT1cImNvbG9yXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwicGlja01vZGUgIT09ICdyYW5nZSdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRheXMtYm94XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRheXNcIiAqbmdGb3I9XCJsZXQgZGF5IG9mIG1vbnRoLmRheXNcIj5cbiAgICAgICAgICAgIDxidXR0b24gW2NsYXNzXT1cIidkYXlzLWJ0biAnICsgZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJkYXlcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MudG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25TZWxlY3RlZChkYXkpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm1hcmtlZF09XCJkYXkubWFya2VkXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm9uLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoZGF5LnRpbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRheS5kaXNhYmxlXCI+XG4gICAgICAgICAgICAgIDxwPnt7ZGF5LnRpdGxlfX08L3A+XG4gICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cImRheS5zdWJUaXRsZVwiPnt7ZGF5Py5zdWJUaXRsZX19PC9zbWFsbD5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cInBpY2tNb2RlID09PSAncmFuZ2UnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzLWJveFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzXCJcbiAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgbW9udGguZGF5c1wiXG4gICAgICAgICAgICAgICBbY2xhc3Muc3RhcnRTZWxlY3Rpb25dPVwiaXNTdGFydFNlbGVjdGlvbihkYXkpXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5lbmRTZWxlY3Rpb25dPVwiaXNFbmRTZWxlY3Rpb24oZGF5KVwiXG4gICAgICAgICAgICAgICBbY2xhc3MuYmV0d2Vlbl09XCJpc0JldHdlZW4oZGF5KVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBbY2xhc3NdPVwiJ2RheXMtYnRuICcgKyBkYXkuY3NzQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImRheVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy50b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblNlbGVjdGVkKGRheSlcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MubWFya2VkXT1cImRheS5tYXJrZWRcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3Mub24tc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChkYXkudGltZSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGF5LmRpc2FibGVcIj5cbiAgICAgICAgICAgICAgPHA+e3tkYXkudGl0bGV9fTwvcD5cbiAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiZGF5LnN1YlRpdGxlXCI+e3tkYXk/LnN1YlRpdGxlfX08L3NtYWxsPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICIsIjxpb24tY2FsZW5kYXItbW9udGg+PC9pb24tY2FsZW5kYXItbW9udGg+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztvQkNhYztNQUFBLHdFQUE0QjthQUFBO0lBQUE7SUFBQTs7OztvQkFSOUI7TUFBQTtVQUFBO1FBQUE7UUFBQTtRQUdRO1VBQUE7VUFBQTtRQUFBO1FBSFI7TUFBQSxnQ0FNaUM7TUFDL0I7VUFBQSwwREFBRztVQUFBLFVBQWlCLHFEQUNwQjtVQUFBLDJFQUFBO1VBQUE7VUFBQSxlQUFxRDs7SUFBOUM7SUFBUCxXQUFPLFNBQVA7OztJQVJNO0lBRUE7SUFFQTtJQUNBO0lBQ0E7SUFOUixXQUFRLFVBRUEsVUFFQSxVQUNBLFVBQ0EsU0FOUjtJQU9LO0lBQUE7Ozs7b0JBUlA7TUFBQTtNQUFpRCxtREFDL0M7VUFBQSwyRUFBQTtVQUFBO1VBQUEsZUFTUztJQVJEO0lBRFIsV0FDUSxTQURSOzs7O29CQUhOO01BQUEsd0VBQWtDO2FBQUEsZ0NBQ2hDO01BQUE7TUFBQSxnQkFBc0IsaURBQ3BCO01BQUEsMkVBQUE7TUFBQTtNQUFBLHVDQVdNO01BQ0Y7O0lBWmM7SUFBbEIsV0FBa0IsU0FBbEI7Ozs7b0JBNkJJO01BQUEsd0VBQTRCO2FBQUE7SUFBQTtJQUFBOzs7O29CQVI5QjtNQUFBO1VBQUE7UUFBQTtRQUFBO1FBR1E7VUFBQTtVQUFBO1FBQUE7UUFIUjtNQUFBLGdDQU1pQztNQUMvQjtVQUFBLDBEQUFHO1VBQUEsVUFBaUIscURBQ3BCO1VBQUEsMkVBQUE7VUFBQTtVQUFBLGVBQXFEOztJQUE5QztJQUFQLFdBQU8sU0FBUDs7O0lBUk07SUFFQTtJQUVBO0lBQ0E7SUFDQTtJQU5SLFdBQVEsVUFFQSxVQUVBLFVBQ0EsVUFDQSxTQU5SO0lBT0s7SUFBQTs7OztvQkFaUDtNQUFBO01BQUE7TUFJc0MsbURBQ3BDO1VBQUEsMkVBQUE7VUFBQTtVQUFBLGVBU1M7SUFSRDtJQURSLFdBQ1EsU0FEUjs7O0lBSEc7SUFDQTtJQUNBO0lBSkwsV0FFSyxVQUNBLFVBQ0EsU0FKTDs7OztvQkFGSjtNQUFBLHdFQUFrQzthQUFBLGdDQUNoQztNQUFBO01BQUEsZ0JBQXNCLGlEQUNwQjtNQUFBLDJFQUFBO01BQUE7TUFBQSx1Q0FlTTtNQUNGOztJQWZDO0lBREwsV0FDSyxTQURMOzs7O29CQXBCViwyQ0FDSTtNQUFBO01BQUEsOEJBQXFCLDZDQUNuQjthQUFBO2FBQUE7VUFBQSx3QkFlTSw2Q0FDTjtpQkFBQTthQUFBO1VBQUEsd0JBbUJNLDJDQUNGO2lCQUFBOztJQXBDQztJQUFMLFdBQUssU0FBTDtJQWdCSztJQUFMLFdBQUssU0FBTDs7O0lBakJHO0lBQUwsV0FBSyxTQUFMOzs7O29CQ0RKO01BQUE7K0JBQUE7TUFBQTtRQUFBO01BQUEsOEJBQUE7TUFBQTtJQUFBOzs7Ozs7In0=