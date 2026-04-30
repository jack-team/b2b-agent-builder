// svg组件化处理
declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  
  const ReactComponent: FC<SVGProps<SVGSVGElement> & {
    title?: string;
    desc?: string;
    titleId?: string;
    descId?: string;
  }>;
  
  export default ReactComponent;
}