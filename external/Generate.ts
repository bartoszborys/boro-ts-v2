import { Runner } from "./bootstrap/Runner";
import { BasicRunner } from "./bootstrap/BasicRunner";

export function AppRunner(): Runner {
    return new BasicRunner();
}
