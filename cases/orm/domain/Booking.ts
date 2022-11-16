import { DomainColumn } from "./decorators/DomainColumn";
import { DomainEntity } from "./decorators/DomainEntity";

@DomainEntity()
export class Booking {
    @DomainColumn('this-will-be-status')
    private readonly status: 'success' | 'error';
}
