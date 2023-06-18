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
  completed: boolean | null;
}

export function App() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [countCheckTask, setCountCheckTask] = useState(0);
  const [isLight, setIsLight] = useState(false);

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
        completed: false,
      },
    ]);
    setNewItemText("");
  }
  function checkItem(uuid: string, check: boolean) {
    const updateItems = items.map((item) => {
      if (item.uuid === uuid) {
        return { ...item, completed: check };
      }
      return item;
    });
    setItems(updateItems);
  }
  useEffect(() => {
    const completedTasks = items.filter((item) => item.completed === true);
    setCountCheckTask(completedTasks.length);
    //eslint-disable-next-line
  }, [checkItem]);
  function removeItem(itemToDelete: string) {
    const itemsWithoutItemDeleted = items.filter(({ uuid }) => {
      return uuid !== itemToDelete;
    });
    setItems(itemsWithoutItemDeleted);
  }
  function removeItems() {
    setItems([]);
  }
  function handleChangeColorScheme() {
    setIsLight(!isLight);
  }
  const isEmptyTasks = items.length === 0;
  const isEmptyInput = newItemText.length === 0;

  return (
    <>
      <div
        className={
          isLight ? `${styles.wrapper} ${styles.wrapperLight}` : styles.wrapper
        }
      >
        <Header isLight={isLight} onSetColorScheme={handleChangeColorScheme} />
        <div className={styles.wrapperMain}>
          <main
            className={
              isLight
                ? `${styles.content} ${styles.contentLight}`
                : styles.content
            }
          >
            <form
              onSubmit={handleSetNewItem}
              className={
                isLight ? `${styles.form} ${styles.formLight}` : styles.form
              }
            >
              <input
                required
                type="text"
                value={newItemText}
                onChange={handleInputText}
                placeholder="Adicione uma nova tarefa"
                className={styles.inputText}
              />
              <button
                disabled={isEmptyInput}
                type="submit"
                className={styles.buttonAdd}
              >
                Criar <Plus />
              </button>
            </form>
            <section
              className={
                isLight
                  ? `${styles.managerTasks} ${styles.managerTasksLight}`
                  : styles.managerTasks
              }
            >
              <div className={styles.createdTasks}>
                <p>
                  <strong>Tarefas criadas</strong>
                  <span>{items.length}</span>
                </p>
              </div>
              <div className={styles.createdTasks}>
                <p>
                  <strong>Concluídas</strong>
                  <span>{`${countCheckTask} de ${items.length}`}</span>
                </p>
                {!isEmptyTasks && items.length >= 2 ? (
                  <div className={styles.containerRomoveAll}>
                    <button onClick={removeItems} className={styles.removeAll}>
                      <span>Apagar todos</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
            <section className={styles.list}>
              {isEmptyTasks ? (
                <EmptyList isLight={isLight} />
              ) : (
                items.map(({ uuid, item, completed }) => {
                  return (
                    <List
                      key={uuid}
                      uuid={uuid}
                      item={item}
                      isLight={isLight}
                      completed={completed}
                      onDeleteItem={removeItem}
                      onCheckItem={checkItem}
                    />
                  );
                })
              )}
            </section>
            {!isEmptyTasks && items.length >= 2 ? (
              <button onClick={removeItems} className={styles.removeAllMobile}>
                <span>Apagar todos</span>
              </button>
            ) : (
              ""
            )}
          </main>
        </div>
      </div>
    </>
  );
}
