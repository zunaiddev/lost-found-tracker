import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class AuthResDto {
    @Expose()
    id: number;

    @Expose()
    name?: string;

    @Expose()
    email?: string;

    @Expose()
    accessToken: string;

    constructor(partial: Partial<AuthResDto>) {
        Object.assign(this, partial);
    }
}