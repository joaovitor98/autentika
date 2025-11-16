package org.example.repository;


import org.example.model.Endereco;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EnderecoRepository extends MongoRepository<Endereco, String> {
    List<Endereco> findByUsuarioId(String usuarioId);
    Optional<Endereco> findByUsuarioIdAndPrincipalTrue(String usuarioId);
}

