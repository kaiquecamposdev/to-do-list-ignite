import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./Header";
import { Plus } from "../assets/Plus-icon";
import { EmptyList } from "./EmptyList";
import { v4 as uuidv4 } from "uuid";
import { List } from "./List";

export interface ItemsProps {
  uuid: string;
  item: string;
  isChecked: boolean;
}

export function App() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [newItemText, setNewItemText] = useState("");

  function handleInputText(event: ChangeEvent<HTMLInputElement>) {
    setNewItemText(event.target.value);
  }
  function handleSetNewItem(event: FormEvent) {
    event.preventDefault();
    const uuid = uuidv4();
    setItems((items) => [
      ...items,
      {
        uuid,
        item: newItemText,
        isChecked: false,
      },
    ]);
    setNewItemText("");
    localStorage.setItem("itemsList", JSON.stringify(items));
  }
  useEffect(() => {
    const data = localStorage.getItem("itemsList")
    if(data) {
      setItems(JSON.parse(data))
    }
  }, []);
  function removeItem(itemToDelete: string) {
    const itemsWithoutItemDeleted = items.filter(({ uuid }) => {
      return uuid !== itemToDelete;
    });
    setItems(itemsWithoutItemDeleted);
    const data = localStorage.getItem("itemsList")
    if(data){
      const parsedData = JSON.parse(data)
      const updatedData = parsedData.filter(item => item !== itemToDelete)

    }
  }

  const isTasksEmpty = items.length === 0;
  const isInputEmpty = newItemText.length === 0;

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.wrapperMain}>
          <main className={styles.content}>
            <form onSubmit={handleSetNewItem} className={styles.form}>
              <input
                required
                type="text"
                value={newItemText}
                onChange={handleInputText}
                placeholder="Adicione uma nova tarefa"
                className={styles.inputText}
              />
              <button
                disabled={isInputEmpty}
                type="submit"
                className={styles.buttonAdd}
              >
                Criar <Plus />
              </button>
            </form>
            <section className={styles.tasksManager}>
              <p>
                <strong>Tarefas criadas</strong>
                <span>{items.length}</span>
              </p>
              <p>
                <strong>Concluídas</strong>
                <span>{`${0} de ${items.length}`}</span>
              </p>
            </section>
            <section className={styles.list}>
              {isTasksEmpty ? (
                <EmptyList />
              ) : (
                items.map(({ uuid, item }) => {
                  return (
                    <List
                      key={uuid}
                      uuid={uuid}
                      item={item}
                      onDeleteItem={removeItem}
                    />
                  );
                })
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
