---
title: "Against Overly Defensive Coding"
publishedAt: "2024-09-10"
description: "Defensive coding is important to prevent bugs, but there's such a thing as being too defensive"
---

This is one of the most common programming errors I see, and it's probably one of the least obvious. Sure, we want to protect our code from failure scenarios, but we need to be careful about it: there's such a thing as being too defensive in our coding!

To start, here's an example of good defensive coding:

```javascript
function getUserNameById(userId, users) {
  const user = users.find((user) => user.id === userId);

  if (user) {
    // user can be undefined if there are no results
    // last name may be null
    return [user.firstName, user.lastName].filter((name) => name).join(" ");
  }
}
```

In this example, our code is protected against the failure scenarios of not finding a user, and dealing with a user who doesn't have a last name. It avoids bugs caused by a simpler approach such as:

```javascript
function getUserNameById(userId, users) {
  const user = users.find((user) => user.id === userId);

  // fails if user wasn't found
  // returns "firstName null" if last name is null
  return `${user.firstName} ${user.lastName}`;
}
```

We write defensive code to avoid bugs like these.

However, we can overdo it. Defensive code stops being useful when it no longer protects us from real failure scenarios.

Here's an example of defensive coding going too far:

```javascript
function getUserNameById(userId, users) {
  try {
    const filteredUsers = users.filter((user) => user.id === userId);

    if (filteredUsers) {
      // this is always true
      const user = filteredUsers[0];

      // after checking that user is set, the ?. is redundant
      // there's no need to confirm the user id, that has already been done above
      if (user && user?.id === userId) {
        // ?. is redundant, user is always defined here
        return [user?.firstName, user?.lastName].filter((name) => name).join(" ");
      }
    }
  } catch (error) {
    // the code above doesn't throw any error to handle here
  }
}
```

In this example, the code is:

- Protecting against `.filter()` returning a nullish value, even though it always returns an array (which might be empty). This is unnecessary and confusing.
- Using optional chaining (`?.`) to access `user` properties without throwing an error if `user` is not defined, even though it already checked that `user` is always is. This is redundant.
- Checking if the selected user has the intended id, even though that's always true because it was filtered by that id. This is pointless.
- Handling errors, even though no error is thrown. This is overkill.

The problem with this kind of defensive coding isn't just that it makes the code more complicated. There's something even worse happening.

When we write code, we write it for other humans, not for machines. Machines are happy with binary code, it's us imperfect humans who prefer to go for higher levels of abstraction. The code we write serves firstly to tell a story to the developers who will maintain it, and only then to be compiled or interpreted for a machine to run.

The story we tell with defensive coding is that there's danger, and we're guarding against it. When we write `if (user)`, we're signalling to other developers to be cautious: `user` might not be defined, and assuming it is could lead to problems.

This means that when we write `if (filteredUsers)`, still drawing from the examples above, we're also telling a story about the danger we're guarding against. But this time, there's no actual danger: `filteredUsers` is always defined. The story we're telling is a lie.

At best, this lie will be [surprising](/blog/no-surprises/) and confuse developers reading the code, which will throw them off and hurt their productivity: "Huh, weird, why are we checking if `filteredUsers` is set? Doesn't `.filter()` always return an array?"

At worst, developers will believe this lie and think there's a danger when there isn't. They might think `.filter()` returns a nullish value when it doesn't find records, even though that's not what it does! Or they might think an empty array evaluates to `false`, while it actually evaluates to `true` (a genuine mistake when dealing with JavaScript).

When developers start believing incorrect things about the code, these beliefs spread. If you're unsure whether a variable is set, you end up adding unnecessary checks everywhere. If the code throws an exception in a code branch that never runs, other developers will see that exception and start handling it whenever they call that code. This can also lead to them adding unit tests with mocks that throw that exception, testing behaviour that doesn't actually exist in production.

Ultimately, reacting to non-existent problems will harm developer productivity, increase code complexity, and lengthen CI times due to more code branches needing tests. It will also hurt performance because of unnecessary checks and missed optimisation opportunities.

We can push back against overly defensive coding by not blindly believing the story the code tells. For example, we can always verify what a piece of code actually does and remove anything redundant. Another strategy is to ensure great test coverage, making it easier to refactor with confidence, knowing we're just removing unnecessary checks without changing behaviour. There are even lint rules that can help, like eslint's [no-useless-escape](https://eslint.org/docs/latest/rules/no-useless-escape) or typescript-eslint's [no-unnecessary-condition](https://typescript-eslint.io/rules/no-unnecessary-condition).

It's important to defend against actual threats, but defending against imaginary ones isn't just unimportant: it's actually harmful. Be cautious of overly defensive coding, and always be on the lookout for lies in the code.
