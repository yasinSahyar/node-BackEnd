let items = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' }
  ];
  
  // Retrieve all items
  export const getItems = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
  };
  
  // Add a new item
  export const postItem = (req, res) => {
    let body = '';
  
    req.on('data', chunk => {
      body += chunk.toString();  // Accumulate data from request
    });
  
    req.on('end', () => {
      try {
        if (body === '') {
          throw new Error('Empty body');  // Handle empty body case
        }
  
        const newItem = JSON.parse(body);  // Parse the JSON body
        newItem.id = items.length + 1;     // Create a new unique ID
        items.push(newItem);               // Add the new item to the list
  
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newItem));  // Return the new item in the response
  
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '400', message: 'Bad Request: Invalid JSON or Empty Body' }));
      }
    });
  };
  
  // Update an item by ID
  export const updateItem = (req, res, id) => {
    let body = '';
  
    req.on('data', chunk => {
      body += chunk.toString();  // Accumulate data from request
    });
  
    req.on('end', () => {
      try {
        if (body === '') {
          throw new Error('Empty body');  // Handle empty body case
        }
  
        const updatedItem = JSON.parse(body);  // Parse the JSON body
        const index = items.findIndex(item => item.id == id);  // Find the item to update
  
        if (index !== -1) {
          items[index].name = updatedItem.name;  // Update the item's name
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(items[index]));  // Return the updated item in the response
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: '404', message: 'Item Not Found' }));
        }
  
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '400', message: 'Bad Request: Invalid JSON or Empty Body' }));
      }
    });
  };
  
  // Delete an item by ID
  export const deleteItem = (res, id) => {
    const index = items.findIndex(item => item.id == id);  // Find the item to delete
  
    if (index !== -1) {
      items = items.filter(item => item.id != id);  // Remove the item
      res.writeHead(204);  // 204 No Content
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '404', message: 'Item Not Found' }));
    }
  };
  