import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from '../styles/List.module.css'
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { Task, TaskType } from './Task'
const arrayTasks: TaskType[] = [
    {
        id: uuidv4(),
        completed: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        id: uuidv4(),
        completed: false,
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        id: uuidv4(),
        completed: true,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        id: uuidv4(),
        completed: true,
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: uuidv4(),
        completed: false,
        text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer."
    },
]
export function List() {
    const [tasks, setTasks] = useState<TaskType[]>(arrayTasks)
    const [newTaskText, setNewTaskText] = useState('')
    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()
        tasks.push({
            id: uuidv4(),
            completed: false,
            text: newTaskText
        })
        setTasks(tasks)
        setNewTaskText('')
        console.log(arrayTasks)
    }
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("")
        setNewTaskText(event.target.value)
    }
    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório")
    }
    function completedTasks() {
        var count = 0
        tasks.filter((obj, e) => {
            if (obj.completed)
                count++
        })
        return count
    }
    function deleteTask(taskToDelete: string) {
        console.log(`Deletar task ${taskToDelete}`)
        const tasksWithoutDeletedOne = tasks.filter(task => {
            if (task.id !== taskToDelete)
                return task
        })
        setTasks(tasksWithoutDeletedOne)
    }
    function statusChange(taskToChange: string) {
        console.log(`Alterar status task ${taskToChange}`)
        const tasksChanged = tasks.map(task => {
            if (task.id === taskToChange)
                task.completed = !task.completed
            return task
        })
        setTasks(tasksChanged)
    }
    return (
        <section className={styles.section}>
            <form onSubmit={handleCreateNewTask}>
                <div className={styles.form}>
                    <div>
                        <input
                            className={styles.input}
                            value={newTaskText}
                            name="task"
                            type="text"
                            onChange={handleNewTaskChange}
                            onInvalid={handleNewTaskInvalid}
                            placeholder="Adicione uma nova tarefa"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit"> Criar <PlusCircle size={20} /> </button>
                    </div>
                </div>
            </form>
            <main>
                <header>
                    <div>
                        <label className={styles.createdTasks}> Tarefas criadas </label>
                        <span> {tasks?.length} </span>
                    </div>
                    <div>
                        <label className={styles.completedTasks}> Concluídas </label>
                        <span> {completedTasks()} de {tasks?.length} </span>
                    </div>
                </header>
                {
                    tasks.length ?
                        <div className={styles.list}>
                            { tasks.map((task, i) => {
                                    return <Task
                                        key={`${task.id}-${i}`}
                                        task={{
                                            id: task.id,
                                            completed: task.completed,
                                            text: task.text
                                        }}
                                        onDeleteTask={deleteTask}
                                        onStatusChange={statusChange}
                                    />
                                })
                            }
                        </div>
                    :
                        <div className={styles.empty}>
                            <ClipboardText size={60} />
                            <h4> Você ainda não tem tarefas cadastradas </h4>
                            <h5> Crie tarefas e organize seus itens a fazer </h5>
                        </div>
                }
            </main>
        </section>
    )
}