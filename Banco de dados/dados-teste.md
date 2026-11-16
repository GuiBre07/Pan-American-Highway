# Dados de teste (ambiente local)

Recriados via API em 15/11/2026 (o banco tinha sido recriado e estava vazio), com a API rodando em http://localhost:3333.

## Usuário de teste (tabelas `cadastro` + `login`)

| Campo | Valor |
|-------|-------|
| Nome  | Usuario Teste |
| Email / login | teste@panamerican.com |
| CPF   | 12345678901 |
| Senha | Teste@123 |
| idCadastro | 1 |

## Destinos de teste (tabela `destino`)

| idDestino | País | Cidade | Tempo de estadia |
|-----------|------|--------|------------------|
| 1 | Peru | Cusco | 5 dias |
| 2 | Chile | Santiago | 4 dias |

## Avaliações de teste (tabela `comentario`, criadas pela tela)

| Destino | Ponto turístico | Nota |
|---------|-----------------|------|
| Cusco | Machu Picchu | 4 (editada várias vezes nos testes) |
| Cusco | Vale Sagrado | 5 |
| Cusco | Pão d'Açúcar inca | 4 (criada no teste da versão simplificada) |

> Use apenas para testes locais. Não reutilize essa senha em nada real.
