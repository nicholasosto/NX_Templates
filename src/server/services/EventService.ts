/**
 * @file        src/server/services/EventService.ts
 * @module      EventService
 * @layer       Server
 * @description Service for managing game events, triggers, and event-driven systems.
 */

type EventCallback<T = unknown> = (data: T) => void;

interface GameEvent<T = unknown> {
	readonly name: string;
	readonly timestamp: number;
	readonly data: T;
}

export class EventService {
	private static instance: EventService;
	private eventListeners = new Map<string, Array<EventCallback>>();
	private eventHistory = new Array<GameEvent>();
	private readonly MAX_HISTORY = 1000;

	private constructor() {
		// Initialize event system
	}

	public static getInstance(): EventService {
		if (!EventService.instance) {
			EventService.instance = new EventService();
		}
		return EventService.instance;
	}

	/**
	 * Registers an event listener
	 */
	public on<T = unknown>(eventName: string, callback: EventCallback<T>): void {
		if (!this.eventListeners.has(eventName)) {
			this.eventListeners.set(eventName, []);
		}
		
		const listeners = this.eventListeners.get(eventName)!;
		listeners.push(callback as EventCallback);
	}

	/**
	 * Removes an event listener
	 */
	public off<T = unknown>(eventName: string, callback: EventCallback<T>): void {
		const listeners = this.eventListeners.get(eventName);
		if (!listeners) return;

		const index = listeners.indexOf(callback as EventCallback);
		if (index !== -1) {
			listeners.remove(index);
		}
	}

	/**
	 * Fires an event to all registered listeners
	 */
	public fire<T = unknown>(eventName: string, data: T): void {
		const event: GameEvent<T> = {
			name: eventName,
			timestamp: tick(),
			data,
		};

		// Add to history
		this.eventHistory.push(event);
		if (this.eventHistory.size() > this.MAX_HISTORY) {
			this.eventHistory.shift();
		}

		// Fire to listeners
		const listeners = this.eventListeners.get(eventName);
		if (listeners) {
			for (const listener of listeners) {
				try {
					listener(data);
				} catch (error) {
					warn(`EventService: Error in event listener for ${eventName}: ${error}`);
				}
			}
		}
	}

	/**
	 * Gets recent event history
	 */
	public getEventHistory(eventName?: string): readonly GameEvent[] {
		if (eventName) {
			return this.eventHistory.filter(event => event.name === eventName);
		}
		return [...this.eventHistory];
	}

	/**
	 * Clears event history
	 */
	public clearHistory(): void {
		this.eventHistory.clear();
	}
}
