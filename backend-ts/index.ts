import { Server, Socket } from 'socket.io';

interface Category {
    name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  createdAt: number;
}

type State = Product[];

const io = new Server(8001, {
  cors: {
    origin: '*',
  },
});

const currentProducts: Product[] = [];

io.on('connection', (clientSocket: Socket) => {
  clientSocket.on('get-state', () => {
    clientSocket.emit('set-state', currentProducts);
  });

  clientSocket.on('add-product', (product: Product) => {
    currentProducts.push(product);

    clientSocket.broadcast.emit('set-state', currentProducts);
  });
});

console.log('WS Server is up on port 8001');