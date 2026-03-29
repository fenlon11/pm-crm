import { type LogicFunctionManifest } from 'pm-shared/application';
import { type InputJsonSchema } from 'pm-shared/logic-function';

export type LogicFunctionHandler = (...args: any[]) => any | Promise<any>;

export type LogicFunctionConfig = Omit<
  LogicFunctionManifest,
  | 'sourceHandlerPath'
  | 'builtHandlerPath'
  | 'builtHandlerChecksum'
  | 'handlerName'
  | 'toolInputSchema'
> & {
  handler: LogicFunctionHandler;
  toolInputSchema?: InputJsonSchema;
};
