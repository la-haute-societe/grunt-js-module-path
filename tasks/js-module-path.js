/**
 * ZoulouX
 */
module.exports = function (grunt)
{
    grunt.registerMultiTask('jsModulePath', 'Add the module path to each amd module. The variable __FILE__ will be available in every amd module, giving path to the module.', function ()
    {
        // What we look for to get defined packages
        var search = "define(";

        // Get options
        var options = this.options({
            varName: "__FILE__"
        });

        // Browse each files
        this.files.forEach(function (file)
        {
            // Read the js file
            var fileContents = grunt.file.read(file.src[0], { encoding: 'UTF-8' });

            // New content output file
            var newFileContent = "";

            // Indexes and other keys
            var firstIndex;
            var secondIndex;
            var functionIndex;
            var dependenciesIndex;
            var insertionIndex;

            var currentIndex = 0;
            var currentInsertionIndex = 0;
            var totalModules = 0;

            // The path to our current module
            var modulePath;

            // Search for the next defined package instance
            while (fileContents.indexOf(search, currentIndex) != -1)
            {
                // Get the index right after the define call
                firstIndex = fileContents.indexOf(search, currentIndex) + search.length;

                // Get the index of the first comma after de the define call
                secondIndex = fileContents.indexOf(",", firstIndex);

                // Get the dependencies array and function index to know if we really are in a define declaration
                dependenciesIndex = fileContents.indexOf("[", firstIndex);
                functionIndex = fileContents.indexOf("function", firstIndex);

                // Extract the module path
                modulePath = fileContents.substring(firstIndex, secondIndex);

                // Get the new line index, this is where we insert our content
                insertionIndex = fileContents.indexOf("{", functionIndex) + 1;

                // Add the last parsed file part to the output file
                newFileContent += fileContents.substring(currentInsertionIndex, insertionIndex) + "\n";

                // This looks like an amd define
                if (
                        insertionIndex > secondIndex
                        &&
                        functionIndex > secondIndex
                        &&
                        insertionIndex > functionIndex
                        &&
                        dependenciesIndex > secondIndex
                        &&
                        functionIndex > dependenciesIndex
                    )
                {
                    // Inject our variable
                    newFileContent += "\n    var " + options.varName + " = " + modulePath + ";";

                    // Count this as patched module
                    totalModules ++;
                }
                else
                {
                    console.log("NON AMD")
                }

                // Update our indexes to get to the next define
                currentIndex = firstIndex;
                currentInsertionIndex = insertionIndex;
            }

            // Add the end of our file
            newFileContent += fileContents.substr(currentInsertionIndex, fileContents.length);

            // Right the file to the same spot
            grunt.file.write(file.src[0], newFileContent, { encoding: 'UTF-8' });

            // Notify the geek
            console.log(totalModules + " module" + (totalModules > 1 ? "s" : "") + " patched");
        });
    });
};
