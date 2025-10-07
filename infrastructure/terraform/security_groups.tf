resource "aws_security_group" "app_sg" {
  name        = "finconecta-app-sg"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # ⚠️
  }

  ingress {
    description = "Allow HTTP (Spring Boot)"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# SG para RDS (solo accesible desde EC2)
resource "aws_security_group" "db_sg" {
  name        = "finconecta-db-sg"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    description     = "Allow Postgres from App SG"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app_sg.id]
  }
}
