import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import {go} from '@ngrx/router-store';
import 'rxjs/add/observable/combineLatest';


import {MenuItem} from 'primeng/primeng';

import {AppState, getAuthToken, getPathNames} from '../app.reducers';
import {RemoveTokenAction} from '../auth/auth.actions';


@Component({
  selector: 'menubar',
  template: `<p-menubar [model]="items$ | async"></p-menubar>`,
})
// TODO Implement onInit
export class MenubarContainer {
  items$: Observable<MenuItem[]>;

  constructor(private store: Store<AppState>) {
    this.items$ = Observable.combineLatest(store.select(getPathNames), store.select(getAuthToken),
      (pathNames, token) => pathNames.map(pathName => {

      let icon: string;
      if (pathName === '/') {
        icon = 'fa-home';
      } else if (pathName.startsWith('/rpc/')) {
        icon = 'fa-terminal';
      } else {
        icon = 'fa-table';
      }
      if (pathName === '/rpc/login' && token) {
        return {
          label: 'Logout',
          icon: icon,
          command: () => store.dispatch(new RemoveTokenAction(''))
        };
      } else {
        return {
          label: pathName,
          icon: icon,
          command: () => store.dispatch(go([pathName])),
          // This is not working
          visible: (pathName === '/rpc/login') ? (token === '') : true,
        };
      }
    })
    );
  }
}
