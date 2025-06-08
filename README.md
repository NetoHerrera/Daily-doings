README

Daily Doings - Sistema de Gerenciamento de Tarefas

Objetivo da Aplicação

O Daily Doings é uma aplicação desenvolvida para ajudar usuários a organizar suas tarefas diárias de forma eficiente. Com esse aplicativo, os usuários poderão:

•	Criar novas tarefas com título, descrição, prazo e prioridade.
•	Visualizar todas as tarefas em uma lista organizada.
•	Atualizar o status das tarefas (pendente, em andamento, concluída).
•	Excluir tarefas quando não forem mais necessárias.

A aplicação visa melhorar a produtividade pessoal e profissional, garantindo que nenhuma tarefa importante seja esquecida.

Tecnologias Utilizadas

Linguagem de Programação: Python (versão 3.8+)
Banco de Dados: MySQL (versão 8.0+)
Bibliotecas Principais: mysql-connector-python - Conector oficial MySQL para Python
python-dotenv - Para gerenciamento de variáveis de ambiente (opcional)
Controle de Versão: Git
Hospedagem de Código: GitHub

Ambiente de Desenvolvimento

Sistema Operacional: Windows 10/11
Editor de Código: VS Code (com extensões Python e MySQL)
Gerenciador de Pacotes: pip (Python Package Installer)
Ferramenta de Banco de Dados: MySQL Workbench

Instalação e Execução

Pré-requisitos
1. Python 3.8 ou superior instalado
2. Servidor MySQL instalado e em execução
3. Git instalado (opcional)

Configuração

1.Clonar o repositório (ou baixar o código fonte):
git clone https://github.com/NetoHerrera/daily-doings.git
cd daily-doings

2. Instalar dependências 
pip install mysql-connector-python python-dotenv

3. Configurar banco de dados
CREATE DATABASE daily_doings;
CREATE USER 'daily_user'@'localhost' IDENTIFIED BY 'sua_senha;
GRANT ALL PRIVILEGES ON daily_doings.* TO 'daily_user'@'localhost';
FLUSH PRIVILEGES;


4. Executar aplicação
python main.py


Requisitos de Sistema

Python 3.8 ou superior
MySQL 8.0 ou superior
2GBMB de RAM (mínimo)
1GB de espaço em disco
Conexão com internet (instalação inicial)

Como Contribuir

•	Faça um fork do projeto
•	Crie uma branch para sua funcionalidade
•	Faça commit das suas alterações 
•	Faça push para a branch 
•	Abra um Pull Request

Padrões de Contribuição:

•	Siga as convenções PEP 8 para código Python
•	Mantenha testes atualizados
•	Documente novas funcionalidades
•	Use mensagens de commit claras e descritivas

Práticas de Código Limpo

•	PEP 8 Compliance: Estilo de código seguindo as convenções Python
•	Documentação Clara: Para todas as funções e classes
•	Separação de Responsabilidades: Cada função com uma única responsabilidade
•	Nomenclatura Significativa: Variáveis e funções com nomes autoexplicativos
•	Tratamento de Erros: Exceções tratadas adequadamente
•	Gestão de Recursos: Conexões com banco de dados gerenciadas corretamente
•	Modularização: Código organizado em funções reutilizáveis

Testes Automatizados

A aplicação inclui testes automatizados implementados com o framework unittest. Os testes cobrem:
•	Conexão com o banco de dados
•	Operações CRUD (Create, Read, Update, Delete)
•	Validação de dados
•	Comportamento de borda e casos de erro

Executando os Testes

python -m unittest discover

Padrão de Projeto Aplicado

Foi implementado o padrão Repository para abstrair o acesso ao banco de dados. Este padrão:
•	Separa a lógica de negócio do acesso a dados
•	Centraliza todas as operações de banco em uma única classe
•	Facilita a manutenção e futuras mudanças de banco de dados
•	Promove a reutilização de código

Estrutura do Padrão:
python
class TaskRepository:
    def __init__(self, connection):
        self.connection = connection
    
    def create_task(self, task_data):
        # Implementação da criação
    
    def get_task(self, task_id):
        # Implementação da leitura
    
    def update_task(self, task_id, update_data):
        # Implementação da atualização
    
    def delete_task(self, task_id):
        # Implementação da exclusão

Este README atualizado inclui:

1. Alteração da linguagem para Python
2. Ambiente de desenvolvimento
3. Especificação das tecnologias usadas
4. Instruções de instalação e execução
5. Requisitos de sistema
6. Como contribuir
7. Descrição das práticas de código aplicadas
8. Identificação da estratégia de testes automatizados
9. Implementação do padrão de projeto Repository
