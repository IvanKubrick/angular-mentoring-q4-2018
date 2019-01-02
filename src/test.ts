// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import 'zone.js/dist/zone-testing';

// tslint:disable-next-line:no-reserved-keywords typedef
declare const require;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
// tslint:disable-next-line:typedef
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
