type Node<V> = {
    value: V;
    next?: Node<V>;
    prev?: Node<V>;
};

export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(capacity: number) {
        this.head = this.tail = undefined;
        this.length = 0;
        this.capacity = capacity;
        this.lookup = new Map();
        this.reverseLookup = new Map();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            node = { value } as Node<V>;
            this.prepend(node);
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
            this.length++;
            this.trimCache();
        }
        node.value = value;
        this.detach(node);
        this.prepend(node);
    }
    get(key: K): V | undefined {
        let node = this.lookup.get(key);
        if (!node) return undefined;
        this.detach(node);
        this.prepend(node);
        return node.value;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = node.next;
        }

        if (this.tail === node) {
            this.tail = node.prev;
        }

        node.next = node.prev = undefined;
    }
    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }

    private trimCache(): void {
        if (this.length > this.capacity) {
            const node = this.tail as Node<V>;
            this.tail = node.prev;
            if (this.tail) {
                this.tail.next = undefined;
            }
            const key = this.reverseLookup.get(node) as K;
            this.lookup.delete(key);
            this.reverseLookup.delete(node);
            this.length--;
        }
    }
}

