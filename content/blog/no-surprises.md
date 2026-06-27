---
title: "No Surprises"
publishedAt: "2024-02-19"
description: "Things should be exactly where we expect them to be, and look exactly like what we expect them to look like. Code should do exactly what we expect it to do."
---

One of my principles for software development is “no surprises”. Things should be exactly where we expect them to be, and look exactly like what we expect them to look like. Code should do exactly what we expect it to do.

When things are surprising, we have to spend more mental effort trying to understand them. If we can't trust a codebase to have no surprises, we're constantly on high alert.

When code has no surprises, there's a whole cognitive load that is no longer needed. We can get into a focused flow state, knowing that we can trust the code we see and don't need to second-guess everything.

Here are some examples of how to apply this principle, in no particular order.

### Consistent style

Enforce a linter and autoformatter.

I don't care which rules you choose. The important part is to have consistent rules applied everywhere. This will make all code look consistent and predictable, so that no one has to spend time or effort with style decisions.

Don't make developers discuss style in pull requests. It has to be a solved problem at that point.

### Clear project structure

If you've got a models directory, don't put models files anywhere else.

If one endpoint calls a service that calls a model, don't have another endpoint calling a manager that calls a repository that calls the database directly.

When a developer is working on a new feature, they should never need to spend time deciding what the structure should be like: they should just need to follow the project convention.

Also: keep the project structure easy to understand and to apply for new code.

### No hidden consequences

If you're calling a GET endpoint, you're not expecting it to mutate data.

If you're calling a model method, you're not expecting calls to external providers.

When these assumptions fail, it not only forces the developer to spend more time hunting for those hidden consequences, but it's also a common source of bugs.

### No needlessly defensive code

If email is a required field for users, you don't need to protect against a missing email in the rest of the codebase.

If an endpoint returns a list of resources, you don't need to protect against a 404 when no resources exist: the response is a 200 with an empty list.

If a module requires a user to be an admin to reach it, you don't need to repeat that check inside the module.

This sort of needlessly defensive code is protecting against threats that don't exist, and is casting doubts onto developer's minds (wait, email could be undefined at this point??).

### Industry conventions

Write idiomatic code, use the framework's conventions, follow best practices.

You don't need to blindly cargo cult what everyone else is doing, or apply conventions that don't make sense for your specific situation. But often it's useful to look for common patterns and solutions that the industry has reached consensus on, which could benefit you as well.

This allows you not only to benefit from the wisdom of the crowd, but also to keep surprises low when switching between projects and teams.

### The right abstraction

The platform you're developing on provides a set of APIs and tools you and everyone else can use.

[Unneeded custom abstractions and complexity](/blog/resist-exploding-complexity/) on top of that common interface will look surprising and require more mental effort to understand and to look for unexpected behaviours. Not to mention more surface area for maintenance work and bugs.

### And more

I'm sure there are a lot more examples of this principle. I may update this list in the future, if something else meaningful comes up. But I hope its message is clear already.

Make your code as boring and as unsurprising as possible. The mental load from dealing with surprises and uncertainty may not seem much to you, at first, but it compounds, eventually turning a project into a fragile unmaintainable mess that developers are too afraid to touch.

I hope none of this sounds too surprising :)
