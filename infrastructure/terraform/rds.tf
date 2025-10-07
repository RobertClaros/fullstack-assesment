resource "aws_db_subnet_group" "db_subnet_group" {
  subnet_ids = [aws_subnet.private_subnet.id]
  tags = {
    Name = "finconecta-db-sng"
  }
}

resource "aws_db_instance" "finconecta_postgres" {
  allocated_storage      = 20
  storage_type           = "gp3"
  engine                 = "postgres"
  engine_version         = "14.1"
  instance_class         = "db.t3.micro"
  db_name                = "finconectadb"
  username               = var.db_username
  password               = var.db_password
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
  skip_final_snapshot    = true
  publicly_accessible    = false
}
