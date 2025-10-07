# ec2.tf (User Data actualizado para instalar Java y MongoDB)

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro" 
  subnet_id     = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.app_sg.id]
  key_name      = "tu-key-par" # CRÍTICO: Reemplazar con tu clave SSH

  # User data para instalar y ejecutar el entorno
  user_data = <<-EOF
              #!/bin/bash
              
              # 1. Instalar Java (para Spring Boot 3.x)
              sudo yum update -y
              sudo amazon-linux-extras install java-openjdk17 -y
              
              # 2. Instalar MongoDB (Self-hosted en este EC2)
              # Importar la clave GPG pública de MongoDB
              sudo rpm --import https://www.mongodb.org/static/pg/server-6.0.asc
              
              # Crear el archivo de repositorio de MongoDB (para Amazon Linux)
              echo "[mongodb-org-6.0]
              name=MongoDB Repository
              baseurl=https://repo.mongodb.org/yum/amazon/amazon-linux-extras/mongodb/6.0/x86_64/
              gpgcheck=1
              enabled=1" | sudo tee /etc/yum.repos.d/mongodb-org-6.0.repo
              
              # Instalar el paquete de MongoDB
              sudo yum install -y mongodb-org
              
              # Iniciar y habilitar el servicio de MongoDB
              sudo systemctl start mongod
              sudo systemctl enable mongod
              
              # 3. Preparar y ejecutar la aplicación Spring Boot (Simulado)
              # Aquí iría la lógica final de despliegue, por ejemplo:
              # sudo cp /path/to/finconecta-api.jar /opt/
              # sudo java -jar /opt/finconecta-api.jar &
              EOF
  
  tags = {
    Name = "finconecta-app-server"
  }
}