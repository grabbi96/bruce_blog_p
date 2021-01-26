**Documentation - Blog API - v0.1**

**Routes**
 - Auth
 - Users
 - Posts

Auth endpoints:

|TYPE|PATH|DESCRIPTION|BODY|
|--|--|--|--|
|POST|/auth/register|Register User|`name`, `email`, `password`, `confirmPassword`
|POST|/auth/login|Login User|`email`, `password`
|GET|/auth/me|Get logged in user|`Authorization header`

User endpoints:

|TYPE|PATH|DESCRIPTION|
|--|--|--|
|GET|/users|Get all users|
|GET|/users/{:id}|Get a user by id|
|GET|/users/{:id}/posts|Get all posts of a user|
|PATCH|/users/{:id}|Update a user by id|
|DELETE|/users/{:id}|Delete a user by id|

Post endpoints:

|TYPE|PATH|DESCRIPTION|
|--|--|--|
|POST|/posts|Create a new post|
|GET|/posts|Get all posts|
|GET|/posts/{:id}|Get a post by id|
|PATCH|/posts/{:id}|Update a post by id|
|DELETE|/posts/{:id}|Delete a post by id|
