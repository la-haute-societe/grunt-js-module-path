# grunt-js-module-path
Grunt plugin adding file path to each AMD modules.
You can have multiple define statements by files and multiple and weird syntaxes are allowed (see tests).

Example with this module

```
define('path/to/my/module', ['dependency'], function () {
	var Module = function ()
	{
	 	// We want to know in which file we are, dynamically
	}
	
	return Module;
});
```

Will be patched as

```
define('path/to/my/module', ['dependency'], function () {
	var __FILE__ = 'path/to/my/module';
	var Module = function ()
	{
	 	console.log("We know we are in module " + __FILE__);
	}
	
	return Module;
});
```

## Installation and usage

Install as a node module
```
npm install grunt-js-module-path --save-dev
```

Load it in your grunt configuration
```
grunt.loadNpmTasks('grunt-js-module-path');
```

## Usage
Add this to your grunt config like any other grunt plugin
```
jsModulePath: {
	src: 'path/to/your/*/files.js'
},
```

Available in options : changing the injected var name :
```
jsModulePath: {
	src: 'path/to/your/*/files.js',
	options: {
		varName: "__varName"
	}
},
```

## Tests

Yo can run unit tests after `npm install` with `npm test` or `grunt test`.
Those tests will check if the proceeded file is still valid and if the module path is correctly injected with multiple AMD define syntaxes.