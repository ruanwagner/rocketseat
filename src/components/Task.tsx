import { Trash } from 'phosphor-react'
import styles from '../styles/Task.module.css'
export interface TaskType {
    id: string
    completed: boolean
    text: string
}
interface TaskProps {
    task: TaskType
    onDeleteTask: (id: string) => void
    onStatusChange: (id: string) => void
}
export function Task({ task, onDeleteTask, onStatusChange }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(task.id)
    }
    function handleCheckChange() {
        onStatusChange(task.id)
    }
    return (
        <div className={styles.taskContainer}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.completed}
                onChange={handleCheckChange}
            />
            <p
                className={task.completed ? styles.titleTaskCompleted : styles.titleTask}
            >
                {task.text}
            </p>
            <button>
                <Trash
                    role="button"
                    className={styles.removeIcon}
                    size={24}
                    onClick={handleDeleteTask}
                />
            </button>
        </div>
    )
}