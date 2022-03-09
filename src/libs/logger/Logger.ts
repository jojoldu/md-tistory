export interface Logger {
   level(): string;

   error(message: string, error?: Error): void;

   warn(message: string, error?: Error): void;

   info(message: string, error?: Error): void;

   debug(message: string, error?: Error): void;

}
