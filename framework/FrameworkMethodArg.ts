import { createMethodArgDecorator } from "../common/createMethodArgDecorator";

export function FrameworkMethodArg(
    data?: unknown,
): ParameterDecorator {
    return createMethodArgDecorator(FrameworkMethodArg.name, FrameworkMethodArg.name)(data);
}