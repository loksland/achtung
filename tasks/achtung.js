/*
 * grunt-achtung
 * https://github.com/loksland/achtung
 *
 * Copyright (c) 2014 loksland
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('achtung', 'Add warning comments in your scripts, based on the #warning directive in  C', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			pattern: '|!|',
			strict: false
		});
		
		var searchPattern = new RegExp(options.pattern.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '[^\n]*(?:$|\n)' , 'gi');
		
		this.files.forEach(function(file) {
			
			var log = [];
			var warnings = 0;
			
			file.src.forEach(function(f){ 
				var src = grunt.file.read(f);
				var matchInfo;
				var filenameOutputted = false;
				while ((matchInfo = searchPattern.exec(src)) !== null){				
				
						var lines = String(src).substr(0,matchInfo.index).match(/\n/g);
						var lineNum = lines == null ? 1 : lines.length + 1;
						var comment = matchInfo[0].substr(options.pattern.length).replace(/\n/g, '');
						var pad = '     ';
						
						var lineNumStr = String(lineNum);
						lineNumStr = pad.substr(0, pad.length - lineNumStr.length) + lineNumStr;
						
						if (!filenameOutputted){
							grunt.log.subhead('\n  ' + f);
							filenameOutputted = true;
						}
						grunt.log.writeln(lineNumStr  + (typeof String.prototype.yellow === 'string' ? comment.yellow : comment));
						warnings++;
						
						log.push({filepath:f, lineNum: lineNum, comment: comment});
						
				}
			});
			
			grunt.log.writeln();
			
			if (warnings > 0){			
			
				var errMsg = warnings + ' ' + grunt.util.pluralize(warnings, 'notice/notices') + ' in ' +
														file.src.length + ' ' + grunt.util.pluralize(file.src.length,'file/files');
				
				if (!options.strict){
					grunt.log.warn(errMsg);
				} else {
					grunt.fail.fatal(errMsg);					
				}
				
			} else {			
				grunt.log.ok(file.src.length + ' ' + grunt.util.pluralize(file.src.length, 'file/files') + ' notice free.');
			}
			
			// Write to log file
			if (file.log){
				grunt.file.write(file.log, JSON.stringify(log, null, 2));
			}
		});
		
	});
};
