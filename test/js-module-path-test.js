'use strict';

// Load dependencies
var grunt = require('grunt');
var fs = require('fs');

// Path to the test output file
var outputFilePath = './test/output/amd-modules.js';

// Fake AMD modules stored as modulePath => moduleFunction
var fakeModules = {};

// Fake the define function for the evaluated modules file
function define (pModulePath, pDependencies, pModuleFunction)
{
    // Just store the function on the modulePath as a key
    fakeModules[pModulePath] = pModuleFunction;
}

// Fake the AMD require method
function fakeRequire (pModulePath)
{
    return (pModulePath in fakeModules ? fakeModules[pModulePath] : null);
}

// Load the test output file including amd modules declaration patched by our grunt plugin
function loadOutputFile ()
{
    // Load file data
    if (!fs.existsSync(outputFilePath)) return false;

    // Load file data
    var fileData = fs.readFileSync(outputFilePath, 'utf8');

    // Try to parse JS file
    try
    {
        eval(fileData);
        return true;
    }
    catch (error)
    {
        console.error("Error while parsing test file " + error.message);
        return false;
    }
}

// Sub-test routine to check a module and the plugin
function subTestModule (test, pModuleName)
{
    // Number of sub-tests expected
    test.expect(3);

    // Require our module through fake require API
    var Module = fakeRequire(pModuleName);

    // Check if our module is loaded
    test.notEqual(Module, false, 'module should load');

    // Instanciate module
    var moduleInstance = new Module();

    // Test instance integrity
    test.ok('test' in moduleInstance, 'module should have a test method');

    // Call the testing mothod on the module instance
    test.ok(moduleInstance.test() == pModuleName, 'module test methode should return module path');

    // Ok
    test.done();
}

// Define test routines
exports.jsModulePath = {

    outputFileValidity: function (test)
    {
        console.log("Testing output JS file loading and integrity ...");

        // Load the file and test JS validity
        test.ok(loadOutputFile(), 'should load the proceeded js file');
        test.done();
    },

    // Test first module syntax
    testModule1: function(test)
    {
        console.log("Testing injection through first define syntax ...");

        subTestModule(test, 'lib/folder/another/ModuleName1');
    },

    // Test first module syntax
    testModule2: function(test)
    {
        console.log("Testing injection through second define syntax ...");

        subTestModule(test, 'lib/folder/another/ModuleName2');
    },

    // Test first module syntax
    testModule3: function(test)
    {
        console.log("Testing injection through third define syntax ...");

        subTestModule(test, 'lib/folder/another/ModuleName3');
    }
};