import mysql.connector
from mysql.connector import Error
from datetime import datetime

class DailyDoings:
    def __init__(self):
        self.connection = self.create_connection()
        if self.connection:
            self.create_table()
        else:
            print("Conexão não estabelecida. Verifique as configurações de conexão.")

    def create_connection(self):
        try:
            connection = mysql.connector.connect(
                host='localhost',
                user='root',
                password='neto2104',
                database='daily_doings'
            )
            if connection.is_connected():
                print("Conexão ao MySQL bem-sucedida")
                return connection
            else:
                print("Não foi possível estabelecer a conexão")
                return None
        except Error as e:
            print(f"Erro ao conectar ao MySQL: {e}")
            return None

    def create_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            due_date DATE,
            status ENUM('pendente', 'em_andamento', 'concluída') DEFAULT 'pendente',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute(query)
            self.connection.commit()
            print("Tabela 'tasks' verificada/criada com sucesso")
        except Error as e:
            print(f"Erro ao criar tabela: {e}")
        finally:
            if cursor:
                cursor.close()

    def create_task(self, title, description, due_date=None, status='pendente'):
        query = """
        INSERT INTO tasks (title, description, due_date, status)
        VALUES (%s, %s, %s, %s)
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, (title, description, due_date, status))
            self.connection.commit()
            task_id = cursor.lastrowid
            print("Tarefa criada com sucesso! ID:", task_id)
            return task_id
        except Error as e:
            print(f"Erro ao criar tarefa: {e}")
            return None
        finally:
            if cursor:
                cursor.close()

    def read_tasks(self, status=None):
        query = "SELECT * FROM tasks"
        params = ()
        
        if status:
            query += " WHERE status = %s"
            params = (status,)
            
        query += " ORDER BY due_date ASC, created_at DESC"
        cursor = None
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, params)
            tasks = cursor.fetchall()
            
            if not tasks:
                print("Nenhuma tarefa encontrada")
                return []
                
            print("\n--- TAREFAS ENCONTRADAS ---")
            for task in tasks:
                print(f"ID: {task['id']}")
                print(f"Título: {task['title']}")
                print(f"Status: {task['status']}")
                print(f"Data Limite: {task['due_date']}")
                
                desc = task['description'] if task['description'] else ""
                print(f"Descrição: {desc[:50]}...\n")
            return tasks
        except Error as e:
            print(f"Erro ao ler tarefas: {e}")
            return []
        finally:
            if cursor:
                cursor.close()

    def update_task(self, task_id, **kwargs):
        if not kwargs:
            print("Nenhum campo para atualizar")
            return False

        fields = []
        values = []
        for key, value in kwargs.items():
            fields.append(f"{key} = %s")
            values.append(value)
        values.append(task_id)

        query = f"UPDATE tasks SET {', '.join(fields)} WHERE id = %s"
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, tuple(values))
            self.connection.commit()
            if cursor.rowcount > 0:
                print("Tarefa atualizada com sucesso!")
                return True
            print("Nenhuma tarefa encontrada com esse ID")
            return False
        except Error as e:
            print(f"Erro ao atualizar tarefa: {e}")
            return False
        finally:
            if cursor:
                cursor.close()

    def delete_task(self, task_id):
        query = "DELETE FROM tasks WHERE id = %s"
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, (task_id,))
            self.connection.commit()
            if cursor.rowcount > 0:
                print("Tarefa excluída com sucesso!")
                return True
            print("Nenhuma tarefa encontrada com esse ID")
            return False
        except Error as e:
            print(f"Erro ao excluir tarefa: {e}")
            return False
        finally:
            if cursor:
                cursor.close()

    def close_connection(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Conexão com MySQL encerrada")


if __name__ == "__main__":
    app = DailyDoings()
    
    if app.connection:
        app.create_task("Estudar Python", "Completar módulo de CRUD com MySQL")
        app.create_task("Reunião com equipe", "Apresentar novos projetos", "2023-10-15")
        
        tasks = app.read_tasks()
        
        if tasks:
            first_task_id = tasks[0]['id']
            app.update_task(first_task_id, status="em_andamento", description="Atualizado: Completar módulo avançado")
        
        app.delete_task(2)
        
        app.read_tasks(status="pendente")
        app.close_connection()