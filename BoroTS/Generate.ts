import { Runner } from "./runner/runner";
import { BasicRunner } from "./runner/basic-runner";

export function AppRunner(): Runner {
    return new BasicRunner();
}
