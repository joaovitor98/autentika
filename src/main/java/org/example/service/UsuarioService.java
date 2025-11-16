package org.example.service;

import org.example.model.Usuario;
import org.example.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repo){
        this.repo = repo;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Usuario salvar(Usuario u){
        // Verifica se o email já existe
        if (repo.findByEmail(u.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Faz o hash da senha antes de salvar
        String senhaHash = passwordEncoder.encode(u.getSenhaHash());
        u.setSenhaHash(senhaHash);
        
        return repo.save(u);
    }

    public Usuario buscarPorEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }

    public boolean validarLogin(String email, String senha) {
        Optional<Usuario> usuarioOpt = repo.findByEmail(email);
        
        if (usuarioOpt.isEmpty()) {
            return false;
        }
        
        Usuario usuario = usuarioOpt.get();
        return passwordEncoder.matches(senha, usuario.getSenhaHash());
    }

    public Usuario login(String email, String senha) {
        if (validarLogin(email, senha)) {
            Usuario usuario = buscarPorEmail(email);
            // Remove a senha do objeto antes de retornar
            usuario.setSenhaHash(null);
            return usuario;
        }
        return null;
    }

    public List<Usuario> listar() {
        return repo.findAll();
    }
}
