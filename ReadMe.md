# re

The @franzzemen/re framework is a rules engine with a text based interface for maximum usability, and referred in the
documentation as the Rules Engine. It can also be referred to by its singleton name Re.Engine.

## Install

** Important **

** The package type is "module", meaning that it is expecting an ECMAScript module loader to load it (it cannot be
loaded with "require"). If you are not familiar with ECMAScript module loading, see the Node documentation / the
Typescript documentation or any other source. If you cannot use ECMA module loading, you can still load this package
using the dynamic import method "import()", which is asynchronous, and leverage the typescript definition files for
static type checking. Do not convert your CommonJS or other module loading strategy to ECMAScript without knowing what
you are doing. We are also working on an adapter for CommonJS @franzzemen/re-commonjs-adapter as well as a CommonJS 
native format @franzzemen/re-commons further down in the backlog **

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
