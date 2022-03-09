import { Service } from 'typedi';
import { Logger } from './Logger';
import winston, { createLogger, format, transports } from 'winston';
import { Format } from 'logform';

@Service()
export class WinstonLogger implements Logger {
    private _logger: winston.Logger;
    private readonly _level: string;

    constructor() {
        const nodeEnv = process.env.NODE_ENV;
        this._level = nodeEnv === 'test' ? 'debug' : 'info';

        this._logger = createLogger({
            transports: [
                new transports.Console({
                    level: this._level,
                    format: this.getFormat()
                }),
            ],
        });
    }

    level(): string {
        return this._level;
    }

    debug(message: string, error?: Error): void {
        this._logger.debug(message, error);
    }

    error(message: string, error?: Error): void {
        this._logger.error(message, error);
    }

    info(message: string, error?: Error): void {
        this._logger.info(message, error);
    }

    warn(message: string, error?: Error): void {
        this._logger.warn(message, error);
    }

    private getFormat(): Format {
        return format.combine(
            format.label({label: `md-tistory`}),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.ms(),
            format.colorize({all:true}),
            format.printf(({level, message, timestamp}) => {
                return `${timestamp} [${level}]: ${message}`
            }),
        )
    }

}
