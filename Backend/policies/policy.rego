package authz

default allow = false

# Allow doctors to perform any action
allow {
  input.user.role == "doctor"
}

# Allow patients to submit their symptoms
allow {
  input.user.role == "patient"
  input.action == "submit"
  input.resource == "symptoms"
}

# Allow patients to read mild severity resources
allow {
  input.user.role == "patient"
  input.user.severity == "mild"
  input.action == "read"
  input.resource == "mild_resources"
}

# Allow patients to read severe severity resources
allow {
  input.user.role == "patient"
  input.user.severity == "severe"
  input.action == "read"
  input.resource == "severe_resources"
}

# Allow patients to read extreme severity resources
allow {
  input.user.role == "patient"
  input.user.severity == "extreme"
  input.action == "read"
  input.resource == "extreme_resources"
}
