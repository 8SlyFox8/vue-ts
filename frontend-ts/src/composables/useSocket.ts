import { ref, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string) {
  const socket: Ref<Socket | null> = ref(io(url));
  const isConnected = ref(false);

  socket.value.on('connect', () => {
    isConnected.value = true;
    console.log('Socket connected:', socket.value?.id);
  });

  socket.value.on('disconnect', () => {
    isConnected.value = false;
    console.log('Socket disconnected');
  });

  socket.value.on('connect_error', (err: Error) => {
    console.error('Connection error:', err);
  });

  onBeforeUnmount(() => {
    if (socket.value) {
      socket.value.off();
      socket.value.disconnect();
      socket.value = null;
      isConnected.value = false;
    }
  });

  function emit(event: string, payload?: any) {
    if (socket.value && isConnected.value) {
      socket.value.emit(event, payload);
    } else {
      console.warn(`Socket not connected, cannot emit event: "${event}"`);
    }
  }

  function on(event: string, callback: (...args: any[]) => void) {
    if (!socket.value) return () => {};

    socket.value.on(event, callback);

    return () => {
      socket.value?.off(event, callback);
    };
  }

  return {
    socket,
    isConnected,
    emit,
    on,
  };
}