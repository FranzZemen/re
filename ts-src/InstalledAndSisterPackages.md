- [Wiki](./ts-src/wiki.md)
- [Wiki Index](./WikiIndex.md)

# Installed And Sister Packages

Installing @franzzemen will install subcomponents, including as of now:

    @franzzemen/re                        All about the Rules Engine
    @franzzemen/re-application            All About Applications
    @franzzemen/re-rule-set               All about Rule Sets
    @franzzemen/re-rule                   All about Rule
    @franzzemen/re-logical-condition      All about Logical Conditions. Also adds the Logical Condition Expression concept
    @franzzemen/re-condition              All about Conditions.  Also adds the Condition Expression concept
    @franzzemen/re-expression             All about Expressions
    @franzzemen/re-data-type              All about Data Types
    @franzzemen/re-common                 Common rules engine constructs
    @franzzemen/app-utility               Utility objects including a logger that supports any log framework

Third party non-development components directly installed include:

    moment                                Moment.js, which is deprecated but which we use for formatting and manipulation purposes (TBD on moving to something else)
    object-path                           An object traversal library. We build on this especially for Attribute Expressions
    uuid                                  A UID generator, used where random ids or other references must be constructed

These third party installations add their own dependencies.

Optional sister components, not included when installing the framework are:

    @franzzemen/re-standard-functions     A compilation of pre-made Function Expressions covering well known calculations
    @franzzemen/re-cli                    A cli (work in progress, but runs) to quickly test rules
    @franzzemen/re-commonjs-examples      Examples on how to integrate into a CommonJS module

Additional optional sister components are in various stages of development:

- Server Frameworks



    @franzzemen/re-server                 An abstraction to support a server implementation packages
    @franzzemen/re-rest                   A rest server implementation deployable on bare metal, AWS EC2, AppEngine. Usually configured with a re-persistence implementation.  Does **not** leverage Express or similar. Build from the ground up with Node, thus very lightweight.
    @franzzemen/re-express                An expression implementation for use with an Express install, or usable directly


- Persistence Frameworks



    @franzzemen/re-persistence            An abstraction to support persistence packages
    @franzzemen/re-re-jsondb              A json file based re-persistence implementation
    @franzzemen/re-reddis                 A reddis based re-persistence implementation
    @franzzemen/re-s3                     An AWS deployable S3 re-persistence implementation
    @franzzemen/re-dynamodb               An AWS deployable Dynamo re-persistence implementation
    @franzemen/re-rds                     An AWS deployable RDS re-persistence implementation
    @franzemen/re-lambdadb                An AWS deployable Lambda re-persistence implementation backed by re-s3, rre-dynamodb or rs-rds


- Browser Based



    @franzzemen/re-browser                Run re in the browser
    @franzzemen/re-web-workers:           Supports web workers


- UI Frameworks to manipulate building and parsing rules



    @franzzemen/re-ui:                    An abstract implementation to support ui packages, integrates either with re-browser, a re-server implementation or a configured mapping to a custom server rest API
    @franzzemen/re-angular                Angular implementation of re-ui
    @franzzemen/re-react                  React implementation of re-ui
    @franzzemen/re-vue                    Vue implementation of re-ui


- Hosted



    https://www.butchersrow.com/re/rest   Hosted, account based REST server and backing storage
    https://www.butchersrow.com/re        Hosted, account based UI, REST server and backing storage
