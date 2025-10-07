variable "vpc_cidr" {
  description = "CIDR block para la VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_username" {
  description = "Usuario de RDS"
  type        = string
  default     = "finconectauser"
}

variable "db_password" {
  description = "Contraseña de RDS"
  type        = string
  sensitive   = true
}
