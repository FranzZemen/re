# @franzzemen/re Rules Engine Wiki

Welcome to the Rules Engine, hereforth referred to the "re" pronounced "R E", or also as its singleton name, the 
Rules.Engine.

## Status of Project

The project has moved from _experimental_ to alpha stage, anticipating to move to beta stage by December 31, 2022, 
and to production readiness by March 2023 or earlier.

Features are tested and working, but the test coverage is not adequate for beta stage, documentation is in progress 
and some backlog that is desired to be added is in flight.

## Installation

See [Readme](/re/Readme)

To use the re framework:

    npm i @franzzemen/re

To contribute clone the full set of libraries (or the libraries you want to contribute to), making sure to npm 
install in each.

    git clone https://github.com/FranzZemen/re 
    git clone https://github.com/FranzZemen/re-application
    git clone https://github.com/FranzZemen/re-rule-set
    git clone https://github.com/FranzZemen/re-rule
    git clone https://github.com/FranzZemen/re-logical-condition
    git clone https://github.com/FranzZemen/re-condition
    git clone https://github.com/FranzZemen/re-expression
    git clone https://github.com/FranzZemen/re-data-type
    git clone https://github.com/FranzZemen/re-common
    git clone https://github.com/FranzZemen/re-standard-functions

You might also want to contribute to teh following, which is strictly speaking not part of the re framework but used 
by it:

    git clone https://github.com/FranzZemen/app-utility
    
## Key Dependencies
Some key dependencies are mentioned here to support the package user and contributor

### Runtime
This section is relevant to contributors, but may have some value for package users.

The rules engine makes use of several run-time dependencies:
- fastest-validator:  This is a powerful but lightweight package that enables object validation
- object-path:  This is used to build upon the concept of traversing deep objects
- uuid:  The frameworks universal id generator.  The framework leverages v4.
- [@franzzemen/app-utility](https://github.com/franzzemen/app-utility):  The framework leverages 
  the ExecutionContextI specification, the LogAdapter and the Hints capabilities extensively
- moment:  moment is used to manipulate dates and times internally; this is likely to change in the future.

### Development
This section is relevant to contributors only.

- Builds are performed using Gulp.js.
- Virtually all of the code is written in Typescript; however the scaffolding and build system does support Javascript
- The build system is encapsulated in [@franzzemen/gulp-base](https://github.com/franzzemen/gulp-base), and each re 
  package contains a Gulpfile.js with local specifications.  The build system supports build, test, basic git and 
  npm publishing including patch, minor and major rev changes.
- Because there are a fair number of hierarchical package dependencies in the re framework,            
  [@franzzemen/npmu](https://github.com/franzzemen/npmu) is leveraged to update a given package's dependencies and 
  itself in one shot.  This leverages npm-check-updates and currently, updates all available dependencies, which can 
  cause breaking changes.


## Contents

1. [Quick Start](./quick-start.md#quick-start)



