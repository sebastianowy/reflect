import { Booking } from "./Booking";
import { DomainEntity } from "./decorators/DomainEntity";
import { DomainColumn } from "./decorators/DomainColumn";

@DomainEntity(new Date())
export class Transport {
  constructor(justSomeField: string) {
    console.log("# constructor", justSomeField);
  }
  @DomainColumn('yo')
  private readonly id: string;

  private readonly bookings: Booking[];
}
