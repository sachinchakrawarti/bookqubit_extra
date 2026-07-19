import env from "../config/env/index.js";

export default function bootstrap() {
    console.log("=================================");
    console.log("🚀 Bootstrapping BookQubit");
    console.log("=================================");
    console.log(`Environment : ${env.NODE_ENV}`);
    console.log(`Host        : ${env.HOST}`);
    console.log(`Port        : ${env.PORT}`);
    console.log("=================================");
}