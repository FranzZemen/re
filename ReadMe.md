# re

The @franzzemen/re framework is a rules engine with a text based interface for maximum usability, and referred in the
documentation as the Rules Engine. It can also be referred to by its singleton name Re.Engine.

## Pre-requisites

### Node / Browser Version

Node versions 16.x + are supported

Until we test and release either updates to support a browser version or release separate package supporting browsers we
make no commitments whether it can be loaded in a browser.

### Javascript Target

The Javascript target is ECMAScript 2021 (es2021 tsc target option).

The module resolution to load this package is ECMAScript which is now the standard.  A helpful package, 
[@franzzemen/re-commonjs-examples](https://www.npmjs.com/package/@franzzemen/re-commonjs-examples), has been 
provided in npm and github on how to integrate into a CommonJS loaded project.

For alternatives Javascript targets or for CommonJS see [this](./ts-src/JavascriptTargetAndModuleResolution.md)

Javascript Target is ECMAScript 2021 or es2021 tsc target option. This means that some of the latest features of
Javascript are included, and that module loading required to load this package is ES module loading, which was part of
the Javascript ES6 release. By default, commonjs module loading will-not-work, but see below how to get it working.

Alternatives for target Javascript:

- Clone the desired packages and re-transpile to desired target, change appropriate values in tsconfig.src.json. To
  better understand the build process, see the Contributor's Documentation. Realistically, you will need to rebuild all
  dependencies and may have issues with at least some third party libraries, which you'll need to back version.
- If you desire to obtain a published version to a past target place the request in the package's Github issues. If
  there is sufficient demand, we may consider how to provide a package that contains several target javascript versions.

CommonJS alternative to ES module loading:

- Clone, same answer as above.
- A potentially much easier option is to use dynamic import from your commonjs code:

For Typescript type checking, import types in local files, for example:

    type Rules = import('@franzzemen/es').Rules.

This will not be transpiled to generated javascript code; it will however provide you with type checking, and you don't
have to account for the asynchronicity (promise) associated with import() for types.

For actual working code, to incorporate promises for example:

    // Regular require declarations
    const _ = require('lodash');
    // ES Type imports
    type Rules = import('@franzzemen/es').Rules;
    // Dynamic imports
    import('@franzzemen/re')
      .then(re => {
        const Rules = re.Rules;
        Rules.Engine.load(...);
      });

A working example is provided
in [@franzzemen/re-commonjs-examples](https://www.npmjs.com/package/@franzzemen/re-commonjs-examples). You can install
and run, or clone from github and use the scaffolding as a starting point.

## Install

** Important the package type is "module", meaning that it is expecting an ECMAScript module loader to load it (it
cannot be loaded with "require"). If you are not familiar with ECMAScript module loading, see the Node documentation /
the Typescript documentation or any other source. If you cannot use ECMA module loading, you can still load this package
using the dynamic import method "import()", which is asynchronous, and leverage the typescript definition files for
static type checking. Do not convert your CommonJS or other module loading strategy to ECMAScript without knowing what
you are doing. We are also working on an adapter for CommonJS @franzzemen/re-commonjs-adapter as well as a CommonJS
native format @franzzemen/re-commons further down in the backlog **

Javascript Target: ECMAScript 2022 (es2022 Typescript target). For other targets, you can clone the github project and
manage from there.

Module Loader: module (ES). See important warning above.

    npm i @franzzemen/re

This will install sub-components, as of now:

    @franzzemen/re-application
    @franzzemen/re-rule-set
    @franzzemen/re-rule
    @franzzemen/re-logical-condition
    @franzzemen/re-condition
    @franzzemen/re-expression
    @franzzemen/re-data-type
    @franzzemen/re-common
    @franzzemen/app-utility

Third party non-development components directly installed include:

    moment
    object-path
    uuid

These third party installations add their own dependencies.

Sister components, not included are:

    @franzzemen/re-standard-functions
    @franzzemen/re-cli

## Wiki

Documentation is contained in the wiki. Note that this is not the Github project wiki. Access it through this link:

[Wiki](./ts-src/wiki.md)
