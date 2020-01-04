# primitive-interpolation

String Interpolation, like `${myVariable}` is usually type-unsafe.

for example when you have some logic that looks like:
```typescript
class User {
  async email(): Promise<string> {
    return fetchFromSomeAPI();
  }
}

async function main(): Promise<void> {
  const user = new User();
  const message = `hello ${user.email()}, welcome to github`;
  // >>> `hello [object Promise], welcome to github`;
  // oof, you forget to await the user.email()
}
```

Using this linter rule, such logic error, would be captured during linting, with this message:
```text
interpolated variable "user.email()" must be a primitive value, got Promise instead.
```

### Reasoning:
The idea behind this rules, is that any variable to be interpolated, should be a primitive object
e.g: `number | boolean | string | enum`

any, other type should first be whitelisted.

### Whitelisting:
This rules accept an options a list of string.
the name of type you want to allow.
for example, if you're okay with doing string interpolation of a Date variable, you can whitelist it by putting in the options:
```json
{
  "rules": {
    "primitive-interpolation": {
      "severity": "error",
      "options": ["Date"]
    }
  }
  // ... other configs.
}
```

### Shortcoming:
- unfortunately, this rules can't capture "any" and "unknown" type.
- for instance-object of a whitelisted object, it'll follow the prototypal-chain. see [here](/src/primitiveInterpolationRule.spec.ts#L79)
- for constructor of a whitelisted object, you'll need to whitelist them one by one. see [here](/src/primitiveInterpolationRule.spec.ts#L100) and [here](/src/primitiveInterpolationRule.spec.ts#L105)

### Installation:
TODO  
clone this repo, compile it, and put it into your `rulesDirectory` maybe?