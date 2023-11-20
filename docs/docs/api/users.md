# Users
Supports registering, viewing, and updating user accounts.

## Register a new user account (this is no longer neccessary, since validation and registration of student is not authomatic)

**Request**:

`POST` `api/v1/users/`

Parameters:

Name       | Type   | Required | Description
-----------|--------|----------|------------
username   | string | Yes      | The username for the new user.
password   | string | Yes      | The password for the new user account.
first_name | string | No       | The user's given name.
last_name  | string | No       | The user's family name.
email      | string | No       | The user's email address.

*Note:*

- Not Authorization Protected

**Response**:

```json
Content-Type application/json
201 Created

{
  "id": "6d5f9bae-a31b-4b7b-82c4-3853eda2b011",
  "username": "richard",
  "first_name": "Richard",
  "last_name": "Hendriks",
  "email": "richard@piedpiper.com",
  "auth_token": "132cf952e0165a274bf99e115ab483671b3d9ff6"
}
```

The `auth_token` returned with this response should be stored by the client for
authenticating future requests to the API. See [Authentication](authentication.md).


## Get a user's profile information

**Request**:

`GET` `api/v1/users/id/`

Parameters:

*Note:*

- **[Authorization Protected](authentication.md)**

**Response**:

```json
Content-Type application/json
200 OK

{
  "id": "6d5f9bae-a31b-4b7b-82c4-3853eda2b011",
  "username": "richard",
  "first_name": "Richard",
  "last_name": "Hendriks",
  "email": "richard@piedpiper.com",
}
```


## Update your profile information

**Request**:

`PUT/PATCH` `api/v1/users/id/`

Parameters:

Name       | Type   | Description
-----------|--------|---
first_name | string | The first_name of the user object.
last_name  | string | The last_name of the user object.
email      | string | The user's email address.



*Note:*

- All parameters are optional
- **[Authorization Protected](authentication.md)**

**Response**:

```json
Content-Type application/json
200 OK

{
  "id": "6d5f9bae-a31b-4b7b-82c4-3853eda2b011",
  "username": "richard",
  "first_name": "Richard",
  "last_name": "Hendriks",
  "email": "richard@piedpiper.com",
}
```


## User login
`POST` `api-token-auth/ username='' password=''`

parameters:

Name       | Type   | Description
-----------|--------|---
username   | string | The user's username on singup/registration.
password   | straing| user's password



## User logout
The logout operation in Django REST Framework typically involves removing or invalidating the authentication token. However, since the authentication token management is usually handled on the client-side, there isn't a direct logout endpoint in Django REST Framework.

Typically, you'd clear the token from the client-side storage (like local storage or cookies) to achieve a logout effect. 

