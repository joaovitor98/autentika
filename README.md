# AutêntikA - Sistema de Autenticação

Sistema de cadastro e login integrado com MongoDB usando Spring Boot.

## Pré-requisitos

- Java 17 ou superior
- Maven 3.6 ou superior
- MongoDB instalado e rodando (padrão: localhost:27017)

## Configuração

### 1. Instalar e iniciar o MongoDB

Certifique-se de que o MongoDB está instalado e rodando na porta padrão (27017).

**Windows:**
```bash
# Inicie o MongoDB (se instalado como serviço, já estará rodando)
# Ou execute manualmente:
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# ou
mongod
```

### 2. Configurar a conexão do MongoDB

O arquivo `src/main/resources/application.properties` já está configurado para:
- Host: `localhost`
- Porta: `27017`
- Database: `autentika`

Se necessário, altere essas configurações no arquivo `application.properties`.

## Como executar

### 1. Compilar o projeto

```bash
mvn clean install
```

### 2. Executar a aplicação

```bash
mvn spring-boot:run
```

Ou execute a classe `AutentikaApplication.java` diretamente no seu IDE.

A aplicação estará disponível em: `http://localhost:8080`

## Endpoints da API

### Cadastro de Usuário
- **URL:** `POST /api/auth/cadastro`
- **Body:**
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senhaHash": "senha123"
}
```

### Login
- **URL:** `POST /api/auth/login`
- **Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

## Frontend

As páginas HTML (`login.html` e `cadastro.html`) já estão configuradas para fazer requisições à API.

### Para testar o frontend:

1. Abra as páginas HTML em um navegador
2. Certifique-se de que o servidor Spring Boot está rodando na porta 8080
3. As páginas farão requisições para `http://localhost:8080/api/auth/...`

**Nota:** Se você estiver abrindo os arquivos HTML diretamente (file://), pode haver problemas de CORS. Recomenda-se usar um servidor HTTP local ou configurar o navegador para permitir CORS.

## Estrutura do Projeto

```
autentika/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/example/
│   │   │       ├── AutentikaApplication.java
│   │   │       ├── config/
│   │   │       │   └── CorsConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   └── TesteController.java
│   │   │       ├── model/
│   │   │       │   └── Usuario.java
│   │   │       ├── repository/
│   │   │       │   └── UsuarioRepository.java
│   │   │       └── service/
│   │   │           └── UsuarioService.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── cadastro.html
├── login.html
├── index.html
└── pom.xml
```

## Segurança

- As senhas são criptografadas usando BCrypt antes de serem salvas no banco de dados
- A senha nunca é retornada nas respostas da API
- Validações de email e senha são realizadas tanto no frontend quanto no backend

## Troubleshooting

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando: `mongosh` ou `mongo`
- Verifique a porta e host no `application.properties`

### Erro de CORS
- O CORS já está configurado para permitir todas as origens
- Se ainda houver problemas, verifique a configuração em `CorsConfig.java`

### Porta 8080 já em uso
- Altere a porta no `application.properties`: `server.port=8081`
- Atualize as URLs nas páginas HTML também

## Desenvolvido com

- Spring Boot 3.2.0
- Spring Data MongoDB
- BCrypt para hash de senhas
- MongoDB

