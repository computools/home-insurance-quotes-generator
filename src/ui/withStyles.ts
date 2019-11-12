import originalWithStyles, {CSSProperties, ClassNameMap, StyleRules, WithStylesOptions} from '@material-ui/core/styles/withStyles'; // tslint:disable-line
import {IReactComponent} from 'mobx-react';
import {Theme} from '@material-ui/core';

export {CSSProperties};

/**
 * See the frontend guidelines documentation for an explanation of why we have a custom withStyles.ts.
 */

export interface WithStylesForObject<TStyleRulesObject> {
  classes?: Partial<ClassNameMap<keyof TStyleRulesObject>>;
  theme?: Theme;
}

export type WithStyles<T> = T extends (...args: any[]) => infer U ? WithStylesForObject<U> : WithStylesForObject<T>;

// A much simpler decorator that gives no type errors, at the expense of providing less type information.
type StyleDecorator = <T extends IReactComponent>(clazz: T) => void;

export type OcastStyleRulesCallback<ClassKey extends string = string> = (theme: Theme) => StyleRules<ClassKey>;

export function withStyles<ClassKey extends string>(
  style: StyleRules<ClassKey> | OcastStyleRulesCallback<ClassKey>,
  options?: WithStylesOptions
): StyleDecorator {
  // Use the original withStyles function from material-ui, but override the type.
  return (originalWithStyles(style, options) as any) as StyleDecorator;
}
