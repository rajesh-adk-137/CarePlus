package authz

default allow = false

allow {
    input.user.role == "admin"
}

allow {
    input.user.role == "user"
    input.action == "read"
    input.resource == "article"
}
