let items = [
  { id: 1, name: 'Item1', media: 'media1.jpg' },
  { id: 2, name: 'Item2', media: 'media2.jpeg' },
];

export const getItems = (req, res) => {
  res.status(200).json(items);
};

export const postItem = (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItem = (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  Object.assign(item, req.body);
  res.json(item);
};

export const deleteItem = (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).end();
};
