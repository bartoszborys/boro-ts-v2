import { Runner } from "./runner/Runner";
import { BasicRunner } from "./runner/BasicRunner";

export function AppRunner(): Runner {
    return new BasicRunner();
}
