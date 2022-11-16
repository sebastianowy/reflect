import { Booking } from "./Booking";
import { DomainEntity } from "./decorators/DomainEntity";
import { DomainColumn } from "./decorators/DomainColumn";

@DomainEntity(new Date())
export class Transport {
    @DomainColumn()
    private readonly id: string;

    private readonly bookings: Booking[];
}
