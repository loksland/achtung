# Achtung

> Add contextual notices in your scripts and text files, based on the #warning directive in C

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-achtung --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-achtung');
```

## The achtung task

### Overview

Enter text prefixed by `|!|` in the source of any text file:

```js
// |!| Enter a warning / notice here
```

This will result in the notice and line number being outputted to the console when the achtung task runs.

This can be useful for drawing attention to incomplete code that needs to be revisited before release.

Read more on the C directive upon which this plugin is based [here](http://embeddedgurus.com/stack-overflow/2011/09/effective-c-tip-9-%E2%80%93-use-warning/).

### Config

In your project's Gruntfile, add a section named `achtung` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  achtung: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.strict
Type: `Boolean`
Default value: `false`

If set to `true` the task will fail and exit when a notice is encountered. This is usually 
for production builds where notices may indicate unfinished functionality.

#### options.pattern
Type: `String`
Default value: `|!|`

The string pattern indicating notices. Usually entered within a comment block.

```js
// |!| This notice will be displayed when the "achtung" task runs
```

### Usage Examples

#### Basic task

In this example javascript source files are searched for notice declarations. 
Any notices will be outputted to the console with their line number.

```js
grunt.initConfig({
  achtung: {
    src: 'js/*.js',
  },
});
```

#### Mutiple sources

In this example various types of source files are searched for notice declarations. 

```js
grunt.initConfig({
  achtung: {
    src: ['js/*.js', 'css/*.css', 'html/*.html'],
  },
});
```

#### Multiple targets

In this example various targets are declared.

```js
grunt.initConfig({
  achtung: {
    dev {
    	src: ['src/js/*.js', 'src/css/*.css'],
    },
    prod {
    	src: ['dist/js/*.js', 'dist/css/*.css'],
    }
  },
});
```

#### Global options
In this example, the default options are overridden for all targets.

```js
grunt.initConfig({
	options: {
		strict: true,
		pattern: '#warning'
	},  
	achtung: {
		dev {
			src: 'src/js/*.js',
		},
		prod {
			src: 'dist/js/*.js',
		}
  },
});
```
#### Custom Options
In this example the `achtung:prod` target has its own custom options.

```js
grunt.initConfig({
  achtung: {
    dev {
    	src: 'js/*.js',
    },
    prod {
    	options: {
    		strict: true
    	},
    	src: 'js/*.js',
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- v0.1.0 – Initial release
- v0.1.3 – Updating publish meta