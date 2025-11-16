package org.example.controller;

import org.example.model.Usuario;
import org.example.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teste")
public class TesteController {

    private final UsuarioService service;

    public TesteController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/salvar")
    public Usuario salvar(@RequestBody Usuario u) {
        return service.salvar(u);
    }

    @GetMapping("/listar")
    public Object listar() {
        return service.listar();
    }
}