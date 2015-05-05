// Formated module 1
define('lib/folder/another/ModuleName1', ["require", "exports", "another", "module"], function (require, exports, another, module)
{
    function ModuleName () { }

    ModuleName.test = function ()
    {
        return (typeof __varName == "undefined") ? false : __varName;
    };

    return ModuleName;
});

// Formated module 2
define("lib/folder/another/ModuleName2",
["require", "exports", "another", "module"],
function (require, exports, another, module)
{
    function ModuleName () { }

    ModuleName.test = function ()
    {
        return (typeof __varName == "undefined") ? false : __varName;
    };

    return ModuleName;
});

// Randomly formated module
define(
                'lib/folder/another/ModuleName3',["require",
        "exports",                  "another", "module"],
function (require, exports, another, module)
{
    function ModuleName () { }

    ModuleName.test = function ()
    {
        return (typeof __varName == "undefined") ? false : __varName;
    };

    return ModuleName;
});