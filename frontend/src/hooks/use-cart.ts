import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/types";
import toast from "react-hot-toast";

export function useCart() {
  const store = useCartStore();

  const addItem = (item: CartItem) => {
    store.addItem(item);
    toast.success(`${item.name} adicionado ao carrinho`);
  };

  const removeItem = (id: string) => {
    const item = store.items.find((i) => i.id === id);
    store.removeItem(id);
    if (item) toast.success(`${item.name} removido do carrinho`);
  };

  return {
    items: store.items,
    addItem,
    removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getTotal: store.getTotal,
    getItemsCount: store.getItemsCount,
  };
}
