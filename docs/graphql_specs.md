Mutations
---------------

# User Mutations
- SignIn with email, username and password
```
mutation {
  login(input: {email: "<email>", password:"<password>"}) {
    token
    error {
      message,
      validationMessages {
        key
        value
      }
    }
  }
}
```
- Set viewer from token (call this before any operation that requires a user authentication)
```
mutation {
  setViewer(input: {token: "<token>"}) {
    token
  }
}
```
- Register new user
```
register(input:{
  email:"newUasser@gmail.com",
  firstName: "New",
  lastName: "User"
  userType: "Blogger"
}) {
  user {
    firstName
    email
  }
  error {
    message
    name
    validationMessages {
      key
      value
    }
    stack
  }
}
```
- Update user profile
- Update payment details

# Product Mutations
- Create product
- Accept product
- Reject product

# Recipes Mutations
- Create recipe

# Groups Mutations
- Create group
- Update group products


Queries
---------------

# User queries
- Show all users (id, registerDate, noOfProducts, name)
- Show user details (profile details, payment details)


# Product queries
- List products by users ()
- 
