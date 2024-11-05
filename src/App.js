import Header from "./main/Header";
import AddItem from "./items/AddItem";
import SearchItem from "./items/searchItem";
import Content from "./main/Content";
import Footer from "./main/Footer";
import { useState, useEffect } from "react";
import apiRequest from "./api/apiRequest";

function App() {
  const API_URL = "http://localhost:3500/item";

  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("itemList")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItem = await response.json();
        setItem(listItem);
        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItem())();
    }, 2000);
  }, []);

  const addNewItem = async (newItem) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: newItem };
    const listItem = [...item, myNewItem];

    setItem(listItem);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItem = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItem(listItem);

    const myItem = listItem.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItem = item.filter((item) => item.id !== id);

    setItem(listItem);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addNewItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p className="text-danger">{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            item={item.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={item.length} />
    </div>
  );
}

export default App;
