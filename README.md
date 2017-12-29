
Set of Laravel Artisan Commands to enable you to get started with AngularJS 1.X as your Laravel Application front-end.
The boilerplate enables you to write your AngularJS application in ES6 style along with Webpack as your build tool and a Babel Transpiler.

It provides a list of commands to under the Angular namespace.

# Getting Started:

## Installation

As of now, although a composer.json file is present, composer is not explicitly supported. You have to add the following in your composer.json file
as follows:
```
	"require": {
        "mdemblani/laravel-angular-es6-boilerplate": "*"
    },
    "repositories": [
        {
            "type": "vcs",
            "url":  "GIT_CLONE_URL"
        }
    ]
```
You would have to clone the repository in your Vendor
folder.

Add `Angular\Providers\AngularServiceProvider::class` to app.php

# ROADMAP
- Enhance README
- Commands for
  - Component creation
  - Module Creation
  - Service Creation
  - Controller Creation
  - Interceptor Creation
  - Vendor Creation
- Add Wiki
