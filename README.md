# AutêntikA

Aplicação Java Spring Boot com integração ao MongoDB para autenticação de usuários e gerenciamento de endereços. Frontend estático em `src/main/resources/static` consumindo a API em `http://localhost:8080/api`.

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

### Autenticação
- `POST /api/auth/cadastro`
- `POST /api/auth/login`

### Endereços
- `POST /api/enderecos`
- `GET /api/enderecos/usuario/{usuarioId}`
- `GET /api/enderecos/{id}`
- `PUT /api/enderecos/{id}`
- `DELETE /api/enderecos/{id}`

## Frontend

As páginas HTML em `src/main/resources/static` estão configuradas para consumir a API em `http://localhost:8080/api`.

### Para testar o frontend
- Abra os arquivos `index.html`, `login.html`, `cadastro.html`, `perfil.html` e `endereco.html`
- Garanta que o servidor Spring Boot está ativo na porta configurada (`8080` por padrão)
- Se abrir via `file://`, ative um servidor estático local para evitar restrições de CORS

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
│   │   │       │   └── EnderecoController.java
│   │   │       ├── model/
│   │   │       │   ├── Usuario.java
│   │   │       │   └── Endereco.java
│   │   │       ├── repository/
│   │   │       │   ├── UsuarioRepository.java
│   │   │       │   └── EnderecoRepository.java
│   │   │       └── service/
│   │   │           └── UsuarioService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── login.html
│   │           ├── cadastro.html
│   │           ├── perfil.html
│   │           ├── endereco.html
│   │           ├── js/
│   │           └── css/
│   └── test/
└── pom.xml
```

## Testes

### Executar testes

```bash
mvn test
```

Os testes de integração validam a conexão com o MongoDB e as operações das APIs principais.

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

