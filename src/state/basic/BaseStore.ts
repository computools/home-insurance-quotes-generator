import {action} from 'mobx';
import {ErrorStore} from 'state/ErrorStore';

export class BaseStore<T> extends ErrorStore {
  @action
  update(props: Partial<T>) {
    Object.assign(this, props);
  }
}
