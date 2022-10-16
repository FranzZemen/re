[../ReadMe](../ReadMe.md)/wiki

# @franzzemen/re Rules Engine Wiki

Welcome to the Rules Engine, hereforth referred to the "re" pronounced "R E", or also as its singleton name, the 
Rules.Engine.

## Status of Project

The project has moved from _experimental_ to alpha stage, anticipating to move to beta stage by December 31, 2022, 
and to production readiness by March 2023 or earlier.

Features are tested and working, but the test coverage is not adequate for beta stage, documentation is in progress 
and some backlog that is desired to be added is in flight.

## Versions/Tagging

At this time the code base is tagged as "Alpha".  Differences between "Alpha" releases will not be fully documented. The
hierarchy of Alpha releases are:

    vAlpha (original alpha release, all previous commits are not guaranteed to work together)

Only the top-most packages (Examples: re, re-cli, re-standard-functions) are tagged with publicly useful tags.  
Dependencies are managed through the top packages package.json files.  This avoids accidentally mis-managing dependent
package tags, which would cause headaches for users.

## Installation

See [Readme](../ReadMe.md) for installation instructions.

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
    git clone https://github.com/FranzZemen/re-cli

You might also want to contribute to the following, which is strictly speaking not part of the re framework but used 
by it:

    git clone https://github.com/FranzZemen/app-utility
    git clone https://github.com/FranzZemen/npmu
    git clone https://github.com/FranzZemen/gulp-base

## Contents

1. [Quick Start](./quick-start.md#quick-start)



