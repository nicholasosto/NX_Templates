/**
 * @file        src/server/services/MessageService.ts
 * @module      MessageService
 * @layer       Server
 * @description Service for managing in-game messages, notifications, and announcements.
 */

import { Players, ReplicatedStorage } from "@rbxts/services";
import { 
	SEVERITY_KEYS, 
	SeverityKey, 
	MessageShape, 
	MessageMeta, 
	MessageMetaRecord 
} from "shared/definitions/Message";
import { generateUniqueId } from "shared/helpers";

interface QueuedMessage extends MessageShape {
	readonly recipientId?: number; // undefined = broadcast to all
	readonly expiresAt: number;
}

export class MessageService {
	private static instance: MessageService;
	private messageQueue = new Map<string, QueuedMessage>();
	private playerMessageHistory = new Map<number, MessageShape[]>();
	private readonly MAX_HISTORY_PER_PLAYER = 50;
	private readonly MESSAGE_EXPIRE_TIME = 300; // 5 minutes

	private constructor() {
		this.setupMessageFolder();
		this.startCleanupLoop();
	}

	public static getInstance(): MessageService {
		if (!MessageService.instance) {
			MessageService.instance = new MessageService();
		}
		return MessageService.instance;
	}

	/**
	 * Sends a message to a specific player
	 */
	public sendMessageToPlayer(
		player: Player, 
		content: string, 
		title: string = "", 
		severity: SeverityKey = "info"
	): string {
		const message = this.createMessage(content, title, severity);
		const queuedMessage: QueuedMessage = {
			...message,
			recipientId: player.UserId,
			expiresAt: tick() + this.MESSAGE_EXPIRE_TIME,
		};

		this.messageQueue.set(message.id, queuedMessage);
		this.addToPlayerHistory(player.UserId, message);
		this.deliverMessage(queuedMessage);

		return message.id;
	}

	/**
	 * Broadcasts a message to all players
	 */
	public broadcastMessage(
		content: string, 
		title: string = "", 
		severity: SeverityKey = "info"
	): string {
		const message = this.createMessage(content, title, severity);
		const queuedMessage: QueuedMessage = {
			...message,
			expiresAt: tick() + this.MESSAGE_EXPIRE_TIME,
		};

		this.messageQueue.set(message.id, queuedMessage);
		
		// Add to all connected players' history
		for (const player of Players.GetPlayers()) {
			this.addToPlayerHistory(player.UserId, message);
		}

		this.deliverMessage(queuedMessage);

		return message.id;
	}

	/**
	 * Sends a message to multiple specific players
	 */
	public sendMessageToPlayers(
		players: Player[], 
		content: string, 
		title: string = "", 
		severity: SeverityKey = "info"
	): string[] {
		const messageIds: string[] = [];

		for (const player of players) {
			const messageId = this.sendMessageToPlayer(player, content, title, severity);
			messageIds.push(messageId);
		}

		return messageIds;
	}

	/**
	 * Gets message history for a specific player
	 */
	public getPlayerMessageHistory(player: Player): readonly MessageShape[] {
		const history = this.playerMessageHistory.get(player.UserId);
		return history ? [...history] : [];
	}

	/**
	 * Clears message history for a specific player
	 */
	public clearPlayerMessageHistory(player: Player): void {
		this.playerMessageHistory.delete(player.UserId);
	}

	/**
	 * Gets a specific message by ID
	 */
	public getMessage(messageId: string): QueuedMessage | undefined {
		return this.messageQueue.get(messageId);
	}

	/**
	 * Cancels a queued message (if not yet delivered)
	 */
	public cancelMessage(messageId: string): boolean {
		return this.messageQueue.delete(messageId);
	}

	/**
	 * Gets all available severity levels
	 */
	public getAvailableSeverityLevels(): readonly SeverityKey[] {
		return SEVERITY_KEYS;
	}

	/**
	 * Gets message metadata for a severity level
	 */
	public getMessageMeta(severity: SeverityKey): MessageMeta | undefined {
		return MessageMetaRecord[severity];
	}

	/**
	 * Sends a system notification (pre-formatted for common system messages)
	 */
	public sendSystemNotification(
		player: Player, 
		notificationType: "level_up" | "achievement" | "warning" | "error" | "welcome",
		customMessage?: string
	): string {
		let content: string;
		let title: string;
		let severity: SeverityKey;

		switch (notificationType) {
			case "level_up":
				content = customMessage || "Congratulations! You've leveled up!";
				title = "Level Up!";
				severity = "success";
				break;
			case "achievement":
				content = customMessage || "Achievement unlocked!";
				title = "Achievement";
				severity = "success";
				break;
			case "warning":
				content = customMessage || "Warning: Something requires your attention.";
				title = "Warning";
				severity = "warning";
				break;
			case "error":
				content = customMessage || "An error has occurred.";
				title = "Error";
				severity = "error";
				break;
			case "welcome":
				content = customMessage || `Welcome to the game, ${player.Name}!`;
				title = "Welcome";
				severity = "info";
				break;
		}

		return this.sendMessageToPlayer(player, content, title, severity);
	}

	/**
	 * Cleans up messages when a player leaves
	 */
	public cleanupPlayer(player: Player): void {
		this.playerMessageHistory.delete(player.UserId);
		
		// Remove any messages specifically for this player from the queue
		const messagesToRemove: string[] = [];
		for (const [id, message] of this.messageQueue) {
			if (message.recipientId === player.UserId) {
				messagesToRemove.push(id);
			}
		}
		
		for (const id of messagesToRemove) {
			this.messageQueue.delete(id);
		}

		print(`MessageService: Cleaned up messages for ${player.Name}`);
	}

	private createMessage(content: string, title: string, severity: SeverityKey): MessageShape {
		const meta = this.getMessageMeta(severity);
		
		return {
			id: generateUniqueId(),
			timestamp: tick(),
			title,
			content,
			severity,
			textColor: meta?.textColor || Color3.fromRGB(255, 255, 255),
		};
	}

	private addToPlayerHistory(playerId: number, message: MessageShape): void {
		let history = this.playerMessageHistory.get(playerId);
		
		if (!history) {
			history = [];
			this.playerMessageHistory.set(playerId, history);
		}

		history.push(message);

		// Trim history if it exceeds max length
		if (history.size() > this.MAX_HISTORY_PER_PLAYER) {
			const itemsToRemove = history.size() - this.MAX_HISTORY_PER_PLAYER;
			for (let i = 0; i < itemsToRemove; i++) {
				history.shift();
			}
		}
	}

	private deliverMessage(queuedMessage: QueuedMessage): void {
		// This is where you would send the message to the client(s)
		// For now, we'll just print to console and use RemoteEvents
		
		if (queuedMessage.recipientId) {
			// Send to specific player
			const player = Players.GetPlayerByUserId(queuedMessage.recipientId);
			if (player) {
				print(`[${queuedMessage.severity.upper()}] To ${player.Name}: ${queuedMessage.title} - ${queuedMessage.content}`);
				// In a real implementation, you'd fire a RemoteEvent here
				// this.messageRemote.FireClient(player, queuedMessage);
			}
		} else {
			// Broadcast to all players
			print(`[${queuedMessage.severity.upper()}] BROADCAST: ${queuedMessage.title} - ${queuedMessage.content}`);
			// In a real implementation, you'd fire a RemoteEvent to all clients
			// this.messageRemote.FireAllClients(queuedMessage);
		}
	}

	private setupMessageFolder(): void {
		// Create RemoteEvents for client communication
		let remoteFolder = ReplicatedStorage.FindFirstChild("Remotes") as Folder;
		if (!remoteFolder) {
			remoteFolder = new Instance("Folder");
			remoteFolder.Name = "Remotes";
			remoteFolder.Parent = ReplicatedStorage;
		}

		// Create message-specific remotes
		if (!remoteFolder.FindFirstChild("MessageReceived")) {
			const messageRemote = new Instance("RemoteEvent");
			messageRemote.Name = "MessageReceived";
			messageRemote.Parent = remoteFolder;
		}
	}

	private startCleanupLoop(): void {
		// Clean up expired messages every 30 seconds
		task.spawn(() => {
			while (true) {
				task.wait(30);
				this.cleanupExpiredMessages();
			}
		});
	}

	private cleanupExpiredMessages(): void {
		const now = tick();
		const expiredMessages: string[] = [];

		for (const [id, message] of this.messageQueue) {
			if (now >= message.expiresAt) {
				expiredMessages.push(id);
			}
		}

		for (const id of expiredMessages) {
			this.messageQueue.delete(id);
		}

		if (expiredMessages.size() > 0) {
			print(`MessageService: Cleaned up ${expiredMessages.size()} expired messages`);
		}
	}
}
