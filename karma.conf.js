/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require("@open-wc/testing-karma");
const merge = require("deepmerge");

module.exports = (config) => {
    config.set(
        merge(createDefaultConfig(config), {
            files: [
                // runs all files ending with .test in the test folder,
                // can be overwritten by passing a --grep flag. examples:
                //
                // npm run test -- --grep test/foo/bar.test.js
                // npm run test -- --grep test/bar/*
                {
                    pattern: config.grep ? config.grep : "test/**/*.test.js",
                    type: "module",
                },
            ],

            esm: {
                nodeResolve: true,
            },

            // anything named karma-* is normally auto included so you probably dont need this
            plugins: ["karma-coverage-istanbul-reporter"],

            //reporters: ["progress", "coverage-istanbul"],

            preprocessor: {
                "src/**/*.js": ["coverage"],
            },

            coverageIstanbulReporter: {
                // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
                //,"html-spa"
                reports: ["html"],

                // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
                // dir: path.join(__dirname, 'coverage'),

                // Combines coverage information from multiple browsers into one report rather than outputting a report
                // for each browser.
                combineBrowserReports: true,

                // if using webpack and pre-loaders, work around webpack breaking the source path
                fixWebpackSourcePaths: true,

                // Omit files with no statements, no functions and no branches covered from the report
                skipFilesWithNoCoverage: true,

                // Most reporters accept additional config options. You can pass these through the `report-config` option
                "report-config": {
                    // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
                    html: {
                        // outputs the report in ./coverage/html
                        subdir: "html",
                    },
                },

                // enforce percentage thresholds
                // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
                thresholds: {
                    emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
                    // thresholds for all files
                    global: {
                        statements: 100,
                        lines: 100,
                        branches: 100,
                        functions: 100,
                    },
                    // thresholds per file
                    // each: {
                    //     statements: 100,
                    //     lines: 100,
                    //     branches: 100,
                    //     functions: 100,
                    //     overrides: {
                    //         "baz/component/**/*.js": {
                    //             statements: 98,
                    //         },
                    //     },
                    // },
                },

                verbose: true, // output config used by istanbul for debugging
                autoWatch: false,
                singleRun: true,
                concurrency: Infinity,
            },
        })
    );
    return config;
};
