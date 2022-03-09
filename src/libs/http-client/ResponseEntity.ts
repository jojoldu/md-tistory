import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ResponseEntity {
    constructor(
        private readonly _statusCode: number,
        private readonly _body: string,
    ) {}

    get statusCode(): number {
        return this._statusCode;
    }

    get body(): string {
        return this._body;
    }

    transform<T>(classType: ClassConstructor<T>): T {
        return plainToInstance(classType, JSON.parse(this._body));
    }

    transforms<T>(classType: ClassConstructor<T>): T[] {
        const plain: T[] = JSON.parse(this._body);
        return plainToInstance(classType, plain);
    }
}
