package org.example.controller;

import org.example.model.Endereco;
import org.example.repository.EnderecoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enderecos")
@CrossOrigin(origins = "*")
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;

    public EnderecoController(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    @PostMapping
    public ResponseEntity<?> criarEndereco(@RequestBody Endereco endereco) {
        try {
            // Se este endereço for marcado como principal, desmarca os outros
            if (endereco.isPrincipal()) {
                Optional<Endereco> enderecoPrincipalExistente = enderecoRepository.findByUsuarioIdAndPrincipalTrue(endereco.getUsuarioId());
                if (enderecoPrincipalExistente.isPresent()) {
                    Endereco existente = enderecoPrincipalExistente.get();
                    existente.setPrincipal(false);
                    enderecoRepository.save(existente);
                }
            }

            Endereco enderecoSalvo = enderecoRepository.save(endereco);
            return ResponseEntity.status(HttpStatus.CREATED).body(enderecoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar endereço: " + e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Endereco>> listarEnderecosPorUsuario(@PathVariable String usuarioId) {
        List<Endereco> enderecos = enderecoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(enderecos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> buscarEnderecoPorId(@PathVariable String id) {
        Optional<Endereco> endereco = enderecoRepository.findById(id);
        return endereco.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarEndereco(@PathVariable String id, @RequestBody Endereco enderecoAtualizado) {
        try {
            Optional<Endereco> enderecoOptional = enderecoRepository.findById(id);
            if (enderecoOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Endereco endereco = enderecoOptional.get();

            // Se este endereço for marcado como principal, desmarca os outros
            if (enderecoAtualizado.isPrincipal() && !endereco.isPrincipal()) {
                Optional<Endereco> enderecoPrincipalExistente = enderecoRepository.findByUsuarioIdAndPrincipalTrue(endereco.getUsuarioId());
                if (enderecoPrincipalExistente.isPresent() && !enderecoPrincipalExistente.get().getId().equals(id)) {
                    Endereco existente = enderecoPrincipalExistente.get();
                    existente.setPrincipal(false);
                    enderecoRepository.save(existente);
                }
            }

            endereco.setCep(enderecoAtualizado.getCep());
            endereco.setLogradouro(enderecoAtualizado.getLogradouro());
            endereco.setNumero(enderecoAtualizado.getNumero());
            endereco.setComplemento(enderecoAtualizado.getComplemento());
            endereco.setBairro(enderecoAtualizado.getBairro());
            endereco.setCidade(enderecoAtualizado.getCidade());
            endereco.setEstado(enderecoAtualizado.getEstado());
            endereco.setPrincipal(enderecoAtualizado.isPrincipal());

            Endereco enderecoSalvo = enderecoRepository.save(endereco);
            return ResponseEntity.ok(enderecoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar endereço: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarEndereco(@PathVariable String id) {
        try {
            if (enderecoRepository.existsById(id)) {
                enderecoRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar endereço: " + e.getMessage());
        }
    }
}

