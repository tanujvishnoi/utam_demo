
module.exports = {
    // file masks for utam page objects
    pageObjectsFileMask: ['./__utam__/**.utam.json'],
    // output folder for generated page objects, relative to the package root
    pageObjectsOutputDir: 'pageObjects',
    moduleTarget: "module",
	module: "utam",
	interruptCompilerOnError: false,
    alias:{
        "pObject": "#utam-pageObjects"
    }
};
