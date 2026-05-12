import { type FC, useMemo } from 'react';
import humps from 'humps';

type Object = Record<string, any>

type StyledVariablesProps = {
  name?: string;
  namespace?: string;
  variables: Object;
}

const Root = ':root'

const StyledVariables: FC<StyledVariablesProps> = (props) => {
  const { namespace = Root, name, variables = {} } = props;

  const obj = useMemo(() => {
    return humps.decamelizeKeys<Object>(variables, { separator: '-' });
  }, [variables]);

  const css = Object.keys(obj).reduce((content, key) => {
    return `${content}--${key}:${obj[key]};`;
  }, '');

  let prefix = namespace;

  if (prefix !== Root) {
    prefix = `.${namespace}`;
  }

  if (!css) {
    return null;
  }

  return (
    <style data-styled-name={name}>
      {`${prefix}{${css}}`}
    </style>
  );
}

export default StyledVariables;