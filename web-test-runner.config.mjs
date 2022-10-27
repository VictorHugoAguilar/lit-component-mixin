import fs from "fs";
import { playwrightLauncher } from "@web/test-runner-playwright";

// const packages = fs
//     .readdirSync("packages")
//     .filter(
//         (dir) =>
//             fs.statSync(`packages/${dir}`).isDirectory() && fs.existsSync(`packages/${dir}/test`)
//     )
//     // .filter(x => x.endsWith('-dropdown'))
//     .concat(
//         fs
//             .readdirSync("packages/helpers")
//             .filter(
//                 (dir) =>
//                     fs.statSync(`packages/helpers/${dir}`).isDirectory() &&
//                     fs.existsSync(`packages/helpers/${dir}/test`)
//             )
//             .map((dir) => `helpers/${dir}`)
//     );

export default {
    nodeResolve: true,
    coverageConfig: {
        report: true,
        reportDir: "coverage",
        threshold: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
    testFramework: {
        config: {
            timeout: "3000",
        },
    },
    browsers: [
        playwrightLauncher({ product: "chromium", concurrency: 1 }),
        // playwrightLauncher({ product: "firefox", concurrency: 1 }),
        // playwrightLauncher({ product: "webkit" }),
    ],
    // groups: packages.map((pkg) => ({
    //     name: pkg,
    //     files: `packages/${pkg}/test/**/*.test.js`,
    // })),
};
