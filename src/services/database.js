const generateUniqueId = () => `uid-${Math.random().toString(36).substring(2, 18)}`;

const getStorageData = () => {
  const data = localStorage.getItem("items");
  return data ? JSON.parse(data) : [];
};

const updateStorageData = (data) => {
  localStorage.setItem("items", JSON.stringify(data));
};

const list = () => getStorageData();

const fetchItem = (id) => {
  const items = getStorageData();
  return items.find((item) => item.id === id) || null;
};

const saveItem = (data) => {
  const items = getStorageData();
  items.push({ ...data, id: generateUniqueId() });
  updateStorageData(items);
};

const updateItem = (data, id) => {
  const items = getStorageData();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Item não encontrado.");
  items[index] = { ...data, id };
  updateStorageData(items);
};

const deleteItem = (id) => {
  const items = getStorageData();
  updateStorageData(items.filter((item) => item.id !== id));
};

export { list, fetchItem, saveItem, updateItem, deleteItem };
