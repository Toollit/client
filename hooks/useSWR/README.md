# useSWR custom hooks creation guide

## parameters

- The first parameter should be isValid. isValid for controlling data requests based on conditions.
- The following parameters must be created to fit the situation, and the args parameter must come to the end of the required parameter. The args is the object type, which is used to identify unique data using page and tag.
- The optional parameters are written after args. because a required parameter cannot follow an optional parameter.
- If you use cookies to identify users and request data, make sure to include the word "My" in your custom hooks variable name.
- If you request the information of someone other than me, make sure to include the word "User" in your custom hooks variable name.
