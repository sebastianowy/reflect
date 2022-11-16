import { inspect } from "util";
import { getClassMetadata } from "../../common/getClassMetadata";
import { Transport } from "./domain/Transport";
import { ormEntityMetadataIdentifier } from "./infra/OrmEntity";

export function runApp(): void {
    console.log(inspect(new Transport()));
    console.log(inspect(getClassMetadata(ormEntityMetadataIdentifier,Transport)));
}
