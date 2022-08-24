[Home](../wiki.md) -> Quick Start

# Quick Start

This quick start is helpful to orient new users to the Rules Engine.

Suppose you have a stream of stock market equity objects of the shape:

    {
        ticker: string,
        price: number,
        peRatio: number
    }

You desire to take some action if the ticker = "ZEM" and the price is greater than $5. You decide to externalize this
decision, potentially to allow a user through UI to alter the ticker and/or price. Instead of writing custom code for
that functionality alone, you will leverage the Rules Engine so you have a standardized externalized way of quickly
making critical business logic changes.

You decide you need to know when the price is greater than 5.0 for a ticker called "ZEM". The rule you write for this
decision point is:

    ticker = "ZEM" and price > 5.0

The rule might be executed using the following API:

    if(Rules.Engine.awaitRuleExecution(dataDomain, 'ticker = "ZEM" and price > 5.0')) {
        // log the result
    }

    where data is an instance of the shape you are evaluationg, for example

    {ticker: "ZEM", price: 6.0} ---> valid
    {ticker: "ZEM", price: 5.0} ---> invalid
    {ticker: "ZEM", price: 4.0} ---> invalid

If you wanted to allow the user to vary the above rule parameters, you could provide a user interface to do so, but your
surrounding code would not need to change. Your user interface could be as simple as allowing an advanced user to create
entire rules, or vary only the parameters.

The main advantage to this approach is that critical sequences of business logic can be programmed in an orderly manner
once for any rule condition that may appear later. You are not changing the logic, just the decision criteria.

## Introducing Whitespace

It's worth describing how white space is used in rule constructs. In this section, we'll make liberal use of terms we
haven't yet defined; we just want to focus on the conventions for whitespace, and we'll define unknown terms elsewhere.

Generally rules are described using text. In our documentation we show that text unquoted, for example:

    ticker = "ZEM" and price > 5.0

Of course, if we wrote down that as text in a system that needs literal text to be quoted, say Javascript, we'd need to
put quotes around the text literal. When doing so, use single quotes, since double quotes are used inside of rule
constructs:

    const myRuLe = 'ticker = "ZEM" and price > 5.0'

If you're storing and manipulating rules in another language, make sure to honor the internal double quotes, even if you
need to escape them!

Moreover, the Rules Engine accepts the common whitespace codes including the space, the tab, the newline and the
carriage return, in any quantity. Where there is a limitation, the documentation will make that clear.

For example, leveraging the multi-line quote in Typescript:

    `ticker = "ZEM"
        and
     price > 5.0`

Hints can also be multi-line and whitespace is allowed around the "=" symbol:

    <<ex
      type = Attribute
      data-type
      =
      Float
    >> price > 5.0

Of course, one would use whitespace to make the rule more legible, unlike the contrived example above.

As rules get more complex, leverage whitespace for legibility.

## Introducing Conditions, Logical Conditions, Logical Operators and Comparators

The above rule construct...

    ticker = "ZEM" and price > 5.0

is known as a Logical Condition. In fact, it is the intersection of two smaller constructs known as Conditions,
intersected with the logical operator "and". There are four Logical Operators in the Rules Engine, from which all
logical combinations can be made (with helper brackets - below). The four Logical Operators are:

- and
- and not
- or
- or not

Returning to the rule construct, we break down the Logical Condition into two "Conditions":

    ticker = "ZEM"                  // A Condition
    price > 5.0                     // A Condition
    ticker = "ZEM" and price > 5.0  // A Logical Condition

A Condition is simply a rule construct that compares two expressions. In the first Condition above, "ticker" is an
Expression, as is "ZEM". The "=" sign is a Comparator.

So it is accurate to say that a Condition is...

    A Left Hand Side Expression (LHS) Compared To A Right Hand Side Expression (RHS)

Back to our Logical Condition...

    ticker = "ZEM" and price > 5.0

... what if we wanted to make a trade for the ticker either the price was greater than 5.0 or the Price to Earnings
Ratio (peRatio) was less than 10.0? A quick answer would be that we would leverage the Logical Operator "or":

    ticker = "ZEM" and price > 5.0 or peRatio < 10.0       // WRONG!!!!

That would be a mistake, because just as in many logical systems, intersection is resolved before union, meaning that
the result of the "and" would be evaluated prior to considering the "or". That would mean that the rule would signal
trade for the ticker "ZEM" with price > 5.0 or any ticker with peRatio < 10.0.

To solve for this, as with other systems, we introduce brackets to nest Logical Conditions:

    ticker = "ZEM" and (price > 5.0 or peRatio < 10.0)

You can use brackets to provide clarity (where they wouldn't matter either way) or to enforce the proper logical
evaluation. You can nest to any depth. For example, and noting that we use symbols here for Conditions...

    A and (B or (C and D)) 

Anything within brackets is a nested Logical Condition, so in the above we have three Logical Conditions:

    C and D  // Result E
    B or  E  // Result F
    A and F  // Outer/topmost Logical Condition

However, you really don't need to worry about inner/outer/nested Logical Conditions in writing rules. Just write them to
make logical sense, using brackets as you would in any other system.

## Introducing Data Types

The Rules Engine constrains things to be compared by Data Types. In other words you can't directly compare text to a
number (but there are implicit, explicit and functional conversions you can do to achieve an intended result,  
more on that later). The available "standard" Data Types at this time are the obvious:

- Text
- Number (integer)
- Float
- Boolean
- Date
- Time
- Timestamp
- Unknown

Note that the Unknown Data Type is a Data Type used by the Rules Engine when the overall Data Type is not inferrable
during Rule inspection (non-runtime). The Rules Engine will (optionally) attempt to infer it at run time. This may or
may not be desired; so the default behavior is that Unknown Data Types generate an error at inspection time and you need
to supply an Option to enable its use.

You can (and probably will) create many more custom structured (object based) and unstructured (character based) Data
Types, some of which you will want to contribute into the project, others of which will be proprietary to your own
projects.  (Creating custom Data Types is beyond the scope of this Quick Start)

In the Logical Condition of discussion...

    ticker = "ZEM" and price > 5.0

... we have two Data Types in play.

First we have the Text Data Type, which is inferred because it is contained in double quotes. Are all double quoted text
elements "Text"? No. The Rules Engine's inference logic decides when it is Text. Suffice it to say that some Data Types,
such as Dates, are also expressed as text in double quotes, and they are inferred first. So more accurately the
following statement is true:  Double quoted expressions are inferred as Text if they are not inferred as another Data
Type first. This provides the ability to create unstructured data types in text format using double quotes, and ensuring
that the Rules Engine doesn't infer them as Text.

We also have a Float Data Type, because any literal number expressed with a decimal point is inferred to be a Float.

Of course the Expressions "ticker" and "price" do not provide inferrable Data Types, but they are constrained to the
Data Types of the Condition they are in. In other words, because "ticker" is compared to Text, it is assumed to be Text.

## A Little More On Comparators

We said that a Comparator compares two Expressions, and we said that the comparison must be along identical Data Types,
or converted to identical Data Types in some manner.

This implies that Comparators are bound to Data Types. In other words, for every Data Type, there is a list of usable
Comparators. See the table below:

TABLE TBD

Of course, we said that we could easily create new Data Types. By extension, this means that we can (easily) create new
Comparators for custom Data Types. In fact you can also create new Comparators for _existing_ Data Types if you like!

## Introducing Expression Types

In our Logical Condition...

    ticker = "ZEM" and price > 5.0

... we identified Expressions ticker, "ZEM", price and 5.0. In fact, we have two types of Expressions here, namely
Attribute and Value Expressions.

Starting with Value Expressions, these are Expressions that are literal - you can literally see the value
(noting that behind the scenes, the Value Expression literal format is the literal format of the Data Type it
represents). Value Expressions are the simplest to understand because we can relate to them, i.e. "some text", 4, 5.0,
true, "10-24-1967" etc.

For custom data types, A Value Expressions might look like "--- ___ ---" (Morse data type) or even...

    {
        "ticker": "ZEM",
        "price": 5.0,
        "peRatio": 15.5
    }

... for a fictitious "Stock" Data Type (note that we are not defining a Stock Data Type in this Quick Start, we are
leveraging Attribute Expressions to get to the individual fields).

Moving on to Attribute Expressions, these are Expressions that point to fields in the Data Domain (the Data Domain is
the object passed in for evaluation).

Attribute Expressions are simply the path to the attribute of interest. It can be a top level field, a nested field, an
array element and so on. Here are some examples of the usage pattern:

    price               -> simple price attribute
    stock.price         -> nested simple price attribte
    allStocks["ZEM"]    -> field in all Stocks called "ZEM" which hypothetically contains a stock object
    [0]                 -> A JSON Array, element 0
    [0].price           -> A JSON Array whose element 0 is a stock object, from which we get the price
    ... and so on

You can write an infinite number of rules just leveraging Attribute Expressions and Value Expressions, but want if you
want more sophisticated constructs? Here are the Expression Types currently supported:

- Value Expression:  As discussed a literal expression
- Attribute Expression:  As discussed, points to a field in the data domain
- Function Expression:  An expression whose logical can be user defined, then exposed in a simple syntax. It can take
  parameters which themselves are Expressions.
- Formula Expression:  A formula expression, made up of Operators operating on other Expressions
- Set Expression:  An Expression that is a Set of Expressions
- Condition Expression:  Similar to a Condition, but evaluable outside of the context of a Logical Condition
- Logical Condition Expression:  Similar to a Logical Condition, but evaluble outside of the context of a Rule

It is beyond the scope of this Quick Start to dive into each of these Expressions, but over time you will undoubtedly
use most of them.

## Introduction To Hints

Hints are text fragments that can be optional or required and supplied within the rule itself. One of the most often
used hints will be to provide a Data Type hint to a Condition where it cannot be inferred. For example, the following
condition compares two Attribute Expressions, but the Rules Engine has no way of inferring the Data Type at inspection
time:

    stock.price < limit

In order to provide the Rules Engine the ability to know the Data Type at inspection time we need to provide at least
one Data Type Hint (if we don't, then a Data Type of Unknown will be assigned, and the Rules Engine will attemp to
resolve it through inference at run time, if that option is set. If that option is not set, indeterminate Data Types
will throw an error any time the Rule is manipulated):

    <<ex data-type=Float>> stock.price < limit

In the above...

    <<ex data-type=Float>>

... is a Hint. Hints are always encased in double angular brackets "<<" and ">>". In the Rules Engine, Hints always have
a prefix that immediately follows the opening angular brackets. In this current example the prefix is
"ex" which signifies a Hint block for the expression that follows. Hints can be unary, i.e. just a key or a key, value
pair separated by an "=" symbol. If more than one hint is needed, they must all be put in the same hint block. Hint
values can take on several formats. If they are one word, they can be unquoted or double quoted. If they are multiple
words, they require double quotes. They can also be legal JSON object definitions, and can take on other unique
formatting as the case may be.

For current purposes, we'll cover two hints applicable to Expressions.

The first data type to cover is the above binary hint, having the key "data-type" and value Float. The value of the
"data-type" hint is always the refName (or just name) of the Data Type whether it is one of the so called standard Data
Types or a custom defined one.

Note that the data-type hint is not necessary if the data type is inferrable, but can be used to force underlying type
conversion. For example...

    <<ex data-type=Number>> "10.0" 

... treats the "10.0" text as a Number instead of as Text. Similarly, if below the attribute volatilityIndex comes in as
an integer(Number) at run time, the following...

    <<ex data-type=Text>> stock.volatilityIndex ~ "4*"

...coverts the number to Text before using the Comparator "like" to compare it to anything that starts with a 4

The second expression hint type is the type of Expression, with the key "type". It is almost always optional, but can be
used either for clarity.

For instance in...

    <<ex type=Value data-type=Number>> "10.0"

...the type is completely unnecessary because the Expression will be assumed to be a Value Expression, but it is added
for clarity (but...is it really more clear???).

Note that incongruency between what is specified and the actual expression will throw an error:

    <<ex type=Value>> stock.price

This will throw an error because unquoted stock.price cannot be interpreted as a Value Expression. There is no Data Type
that would define stock.price as a literal value (assuming the user did not create one).

## Introduction To The Rules API

Writing rules is great, but we really want to run them. There are several objects that purposefully expose APIs.  
Here we will focus on some key API of the Rules.Engine singleton.

### Execute a Rule

There are many ways to execute rules, and we already saw one of them above:

    Rules.Engine.awaitExecution(dataDomain, 'ticker = "ZEM" and price > 5.0')

This executes a specific rule expressed as text and returns the execution result.

The full Typescript signature of this API is:

    awaitExecution = (domain: any, ruleText: string, ec?: ExecutionContextI) => RuleResult | Promise<RuleResult>;

Meaning it is a function that takes 3 parameters, including one optional parameter, and returns either a Result
(RuleResult) or a Promise to one.

Any options set on the Rules.Engine are applied (and additional options can be included in the Rule text). The function
itself does not accept Options.

If the text passed doesn't correspond to rule constructs, the Rules.Engine will search its schema for a rule by that
textual name and execute the first instance it finds. Alternatively, if the text is a properly constructed rule it will
compile and execute it, but it will not add it to the schema.

At this point, you might wonder a few things; namely why would a Rule (potentially) return a Promise and what is this
object called the Execution Context?

#### Why Rules May Return Promises

In general, Rule evaluation will not return a Promise. At the current time, all "standard" package constructs are
synchronous for rule execution as there is generally no i/o etc.

However, at least one rule construct _may_ return a Promise, and potentially others as well. A user defined rule
construct might be asynchronous and the most obvious one is the Function Expression.

While we did not go into detail in this Quick Start on Function Expressions, suffice it to say that they represent
externalized capability, and thus may return Promises by design. It's entirely possible that rule execution, for
instance is dependent on a database lookup provided by a Function Expression. Let's take our example of comparing a
stock price; what if the stock price is not in the data domain? It's quite logical that it might be directly obtained
from an API. We can wrap the API call and expose it as a Function Expression for re-use, passing in the ticker, which
itself may come from the data domain:

    @CurrentStockPrice[ticker] > 5.0

Of course, i/o such as exteran API calls should almost always be asynchronous, so the Rules Engine allows it.

If the Rules Engine encounteres an asynchronous result anywhere during its execution of Rules, Rule Sets, Applications
etc., it will switch to Promise based asynchronous execution from that point on.

Tip:  The Rules Engine provides a type guard, "isPromise" to quickly evaluate whether it is a Promise that is returned.

#### What Is The Execution Context

The Execution Context, represented by the shape interface definition ExecutionContextI is an optional object passed to
almost all methods in the Rules Engine and supports logging, 'thread' tracing and so on. For the Rules Engine the most
important feature is its logging definition.

We will cover the Execution Context in more detail elsewhere. Suffice it to say for now that if it is omitted, the
default implementation logger will be the console.

### The Rules.Engine

The Rules.Engine is a singleton of type Rules (plural). It is not possible to create another instance of Rules
within a process space as its constructor is private.

The Rules.Engine contains APIs to impact its schema or to impact rule constructs that are not part of its schema.  
The schema of the Rules.Engine is a list of Applications (below).

There are two ways to utilize the Rules.Engine, and they can be used interchangeably. The first is to keep all rule
constructs in a separate place and execute them through the Rules.Engine and other various constructs, define below. The
second is to add them to the overall Rules.Engine schema and execute them from there. The choice of approach is up to
the user, but both have merit.

We already covered one important Rules.Engine API:

#### Execute a single Rule

    awaitRuleExecution = (domain: any, ruleText: string | string[3], ec?: ExecutionContextI) 
      => RuleResult | Promise<RuleResult>

    executeRule = (domain: any, ruleText: string | string[3], ec?: ExecutionContextI) => RuleResult

Examples:

    Rules.Engine.executeRule({ticker: "ZEM", price: 5.0}, '<<ru>> <<ex type=Attribute data-type=Float>> price < 10.0');

    Rules.Engine.executeRule({ticker: "ZEM", price: 5.0}, 'price < 10.0');

    Rules.Engine.executeRule({ticker: "ZEM", price: 5.0}, ['Financial Triggers', 'Buy Triggers', 'ZEM Trigger'];

#### Execute a Rule Set

    awaitRuleSetExecution = (domain: any, ruleset: string | string[2], ec?: ExcecutionContextI) 
      => RuleSetResult | Promise<RuleSetResult>


    executeRuleSet = (domain: any, ruleset: string | string[2], ec?: ExcecutionContextI) => RuleSetResult

Examples:

    Rules.Engine.executeRuleSet({ticker: "ZEM", price: 5.0}, '<<rs>> <<ru>> price < 10.0');

    Rules.Engine.executeRuleSet({ticker: "ZEM", price: 5.0}, 'price < 10.0');

    Rules.Engine.executeRuleSet({ticker: "ZEM", price: 5.0}, ['Financial Triggers', 'Buy Triggers']);

#### Execute an Application

    awaitApplicationExecution = (domain: any, application: string, ec?: ExecutionContextI)
      => ApplicationResult | Promise<ApplicationResult>

    executeApplication = (domain: any, application: string, ec?: ExecutionContextI) => ApplicationResult

Example using the Application and Rule Set hints:

    Rules.Engine.executeApplication({ticker: "ZEM", price: 5.0}, '<<ap>> <<rs>> <<ru>> price < 10.0');

or not using the hints, since they are not necessary in this context:

    Rules.Engine.executeApplication({ticker: "ZEM", price: 5.0}, 'price < 10.0');

Executing a named Application:

    Rules.Engine.executeApplication({ticker: "ZEM", price: 5.0}, 'Financial Triggers');

====>>> HERE

#### Execute a Rules Engine Schema

    awaitExecution = (domain: any, rules?: string, ec?: ExecutionContextI)
      => RulesEngineREsult | Promise<RulesEngineResult>

    execute = (domain: any, rules?: string, ec?: ExecutionContextI) => RulesEngineREsult

#### Add an application to the Rules.Engine schema

    addApplication = (app: Application | ApplicationReference | string, ec?: ExecutionContextI);

This adds an application to the Rules.Engine schema. For the purposes of this Quick Start, assume the input is a textual
Application construct. Application and ApplicationReference are covered elsewhere.

#### Add a Rule Set to the Rules.Engine schema

    addRuleSet = (appRef: string, ruleSet: RuleSet | RuleSetReference | string, ec?: ExecutionContextI);

#### Add a Rule to the Rules.Engine schema

    addRule = (appRef: string, ruleSetRef: string, rule: Rule | RuleReference | string, ec?: ExecutionContextI);

### Applications

Applications are an organizational concept. They store Rule Sets. A Rules.Engine schema can have more than one Rule Set,
and if none is provided when adding other rule constructs, or if rule construct text does not specify the name, a
default one called "Default" is added automatically.

### Rule Sets

### Rules

### Different Ways To Execute Rules

### Manipulating Rules
