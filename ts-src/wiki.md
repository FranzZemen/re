[../ReadMe](../ReadMe.md)/wiki

# @franzzemen/re Rules Engine Wiki

Welcome to the Rules Engine, hereforth referred to the "re" pronounced "R E", or also as its singleton name, the
Rules.Engine.

## Status of Project

The project has moved from _experimental_ to alpha stage, anticipating to move to beta stage by December 31, 2022, and
to production readiness by March 2023 or earlier.

Features are tested and working, but the test coverage is not adequate for beta stage, documentation is in progress and
some backlog that is desired to be added is in flight.

## Versions/Tagging

Obtaining the latest @franzzemen/re package will provide the latest code that passes tests. Expect npm package
versioning to be fairly chatty, as we make strong use of semver and publish new changes aggressively and in as small
increments as possible, and because we like to remain on the latest third party packages as possible.

On a less frequent basis the code will be tagged to specific versions. Tagged versions can be considered more trusted
than npm package versions.

At this time the code base is tagged as "Alpha". Differences between "Alpha" releases will not be fully documented. The
hierarchy of Alpha releases are:

    vAlpha (original alpha release, all previous commits are not guaranteed to work together)

Only the top-most packages (Examples: re, re-cli, re-standard-functions) are tagged with publicly useful tags.  
Dependencies are managed through the top packages package.json files. This avoids accidentally mis-managing dependent
package tags, which would cause headaches for users.

## Installation

See [Readme](../ReadMe.md) for installation instructions.

To contribute clone the full set of libraries (or the libraries you want to contribute to), making sure to npm install
in each.

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

You might also want to contribute to the following, which is strictly speaking not part of the re framework but used by
it:

    git clone https://github.com/FranzZemen/app-utility
    git clone https://github.com/FranzZemen/npmu
    git clone https://github.com/FranzZemen/gulp-base

## Overview

### Formats

The Rules.Engine is a text interfaced rules engine, the format referred to as the Text Format. This means that the
primary convenient way to manipulate it from code or node command line, or other cli is to leverage it's main api with
text based rules.

Structurally there are two other formats.

The Reference Format is functionless object format, expressible as JSON. This format is most useful for document storage
of the rules and may also be for programmatic manipulation of rules.

Text Format can be parsed by api into the Reference Format and back again.

The third format is the Internal Format, which is the functional format. It contains the objects that do all the magic.
Some of the key Internal Objects expose the APIs one will most often use, but you need to know very little about them,
unless you are a code contributor.

### Usage

The core Rules.Engine published in the form of @franzzemen/re is an in-memory package, meaning that it provide minimal
support for persistence, streaming, ui and so on.

It is likely that users will want to leverage their own solutions for such integrations, but the following are in the
works and should be released shortly, if only as reference implementations.

**Server**

- @franzzemen/re-server:  An abstraction that provides basic functionality for any server implementation.
- @franzzemen/re-rest:  A node based rest service exposing key Rules.Engine apis. Installing it on a node enabled
  servicer (metal, EC2, AppEngine etc) will enable the Rule.Engine api to serve out as a rest service. A persistence
  configuration or integration is needed if one does not want all data to be lost with a rest service/node restart. Note
  that this is not implemented using a third party package - only dependencies are on node. A persistence option can be
  configured, otherwise it will use re-jsondb (or fail if drive writes are not enabled).
- @franzzemen/re-express:  A package for integration into Express; A persistence option can be configured, otherwise it
  will use re-jsondb (or fail if drive writes are not enabled).
- https://www.butchersrow.com/re/api:  Once deployed, this will provide a hosted version of the rules engine API. 
  Even if one does not desire hosting, it can be useful for testing without installing anything.

**Persistence**:
The persistence packages, were applicable or not otherwise stated will create resources necessary if they do not exist.
Target specific configuration, such as AWS configuration options are implicit.

- @franzzemen/re-persistence:  A light abstraction adapter for a persistence layer that can plug-in concrete
  implementations. It can also transfer/convert rules storage form one implementation to another, which is useful for
  migrating services or exporting data among other things.

re-persistence implementations:

- @franzemenn/re-jsondb:  A json file based persistence implementation
- @franzzemen/re-dynamodb:  An AWS Dynamo implementation, with user defined account configuration
- @franzemen/re-rds: An AWS RDS implementation, with user defined account configuration
- @franzemen/re-awsdb:  This is a combination of the re-lambda-db and one of re-dynamodb or re-rds. User account
  configuration.
- @franzzemen/re-lambdadb:  An AWS lambda framework with user account configuration for persistence to re-awsdb

** UI **

- @franzzemen/re-ui:  A framework-less package to integrate specific UIs.  Requires a concrete implementation of 
  re-server OR a configured mapping of functionality if the user is not implementing re-server
- @franzzemen/re-angular:  An Angular implementation of re-ui for integration into an Angular project.
- @franzzemen/re-react:  A React implementation.  Note this is at the bottom of the backlog.
- @franzzemen/re-vue:  A Vue implementation.  Note that this is at the bottom of the backlog.
- https://www.butchersrow.com/re:  Once deployed this will provide a hosted version of the engine, defaulting to the 
  hosted version of the server.  Users can configure to point to a different server.

## Contents

1. [Quick Start](./quick-start.md#quick-start)



