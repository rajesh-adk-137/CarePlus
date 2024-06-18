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

allow {
    input.user.role == "premium_user"
    input.action == "read"
    input.resource == "answer"
}
