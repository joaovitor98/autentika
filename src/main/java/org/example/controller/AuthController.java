package org.example.controller;

import org.example.model.Usuario;
import org.example.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            // Validações básicas
            if (usuario.getNome() == null || usuario.getNome().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Nome é obrigatório"));
            }
            
            if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Email é obrigatório"));
            }
            
            if (usuario.getSenhaHash() == null || usuario.getSenhaHash().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Senha é obrigatória"));
            }
            
            if (usuario.getSenhaHash().length() < 6) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Senha deve ter no mínimo 6 caracteres"));
            }

            // Tenta salvar o usuário
            Usuario usuarioSalvo = usuarioService.salvar(usuario);
            
            // Remove a senha antes de retornar
            usuarioSalvo.setSenhaHash(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuário cadastrado com sucesso!");
            response.put("usuario", usuarioSalvo);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Erro ao cadastrar usuário: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String senha = loginRequest.get("password");
            
            // Validações básicas
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Email é obrigatório"));
            }
            
            if (senha == null || senha.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Senha é obrigatória"));
            }

            // Tenta fazer login
            Usuario usuario = usuarioService.login(email, senha);
            
            if (usuario != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Login realizado com sucesso!");
                response.put("usuario", usuario);
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Email ou senha inválidos"));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Erro ao fazer login: " + e.getMessage()));
        }
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}

