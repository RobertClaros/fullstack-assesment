#!/bin/bash
set -e

echo "🚀 Desplegando backend Finconecta..."

# Variables
JAR_PATH="/home/ec2-user/finconecta-api-0.0.1-SNAPSHOT.jar"
LOG_PATH="/home/ec2-user/app.log"

# Detener cualquier proceso previo
sudo pkill -f "finconecta-api" || true

# Ejecutar el nuevo JAR
nohup java -jar $JAR_PATH > $LOG_PATH 2>&1 &

echo "✅ Backend desplegado y ejecutándose en puerto 8080"
