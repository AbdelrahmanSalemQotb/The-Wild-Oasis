export interface StyledSelectTypes {
  $type?: string;
  $hasIcon?: boolean;
  $mediaQuery?: string;
}

export type Option<Value = string> = Readonly<{
  value: Value;
  label: string;
}>;

export type Options<Value = string> = readonly Option<Value>[];

export interface TypeSelect {
  options: Options;
  value: string;
  icon?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  [key: string]: unknown;
}
