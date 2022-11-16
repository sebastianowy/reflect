import { runApp } from "./app";
import { decorate } from "./decorate";

function bootstrap(): void {
    decorate();
    runApp();
}

bootstrap();