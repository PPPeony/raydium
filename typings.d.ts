import 'umi/typings';
declare module "*.svg"
declare module '*.less' {
  const resource: {[key: string]: string};
  export = resource;
}