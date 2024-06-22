package authz

default allow = false

# Allow doctors to update the doctors database
allow {
  input.user.role == "doctor"
  input.action == "submit_doctor_info"
  input.resource == "doctors_database"
}

# Allow patients to submit their symptoms
allow {
  input.user.role == "patient"
  input.action == "submit"
  input.resource == "symptoms"
}

# Allow patients to view the doctors database information
allow {
  input.user.role == "patient"
  input.action == "view"
  input.resource == "doctors_database"
}

# Allow patients to read based on the severity of their case
allow {
  input.user.role == "patient"
  input.action == "read"
  allowed_resources_for_severity[input.severity][input.resource]
}

allowed_resources_for_severity = {
  "mild": {"combined_response"},
  "severe": {"combined_response", "doctor_card"},
  "extreme": {"extreme_response", "doctor_card"}
}
