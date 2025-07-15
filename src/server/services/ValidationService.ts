/**
 * @file        src/server/services/ValidationService.ts
 * @module      ValidationService
 * @layer       Server
 * @description Service for validating game data, user inputs, and maintaining data integrity.
 */

export class ValidationService {
	private static instance: ValidationService;

	private constructor() {
		// Initialize validation rules
	}

	public static getInstance(): ValidationService {
		if (!ValidationService.instance) {
			ValidationService.instance = new ValidationService();
		}
		return ValidationService.instance;
	}

	/**
	 * Validates a player name
	 */
	public validatePlayerName(name: string): { valid: boolean; reason?: string } {
		if (name.size() < 3) {
			return { valid: false, reason: "Name must be at least 3 characters long" };
		}
		
		if (name.size() > 20) {
			return { valid: false, reason: "Name must be no more than 20 characters long" };
		}
		
		// Check for inappropriate content (basic example)
		const forbiddenWords = ["admin", "moderator", "staff"];
		const lowerName = name.lower();
		
		for (const word of forbiddenWords) {
			if (lowerName.find(word)[0]) {
				return { valid: false, reason: "Name contains forbidden content" };
			}
		}
		
		return { valid: true };
	}

	/**
	 * Validates a currency transaction
	 */
	public validateCurrencyTransaction(
		currentAmount: number, 
		transactionAmount: number, 
		maxAmount: number = 999999999
	): { valid: boolean; reason?: string } {
		if (transactionAmount < 0 && math.abs(transactionAmount) > currentAmount) {
			return { valid: false, reason: "Insufficient funds" };
		}
		
		if (currentAmount + transactionAmount > maxAmount) {
			return { valid: false, reason: "Would exceed maximum currency limit" };
		}
		
		if (currentAmount + transactionAmount < 0) {
			return { valid: false, reason: "Transaction would result in negative currency" };
		}
		
		return { valid: true };
	}

	/**
	 * Validates item data
	 */
	public validateItemData(item: { id: string; quantity: number; }): { valid: boolean; reason?: string } {
		if (!item.id || item.id.size() === 0) {
			return { valid: false, reason: "Item ID cannot be empty" };
		}
		
		if (item.quantity <= 0) {
			return { valid: false, reason: "Item quantity must be positive" };
		}
		
		if (item.quantity > 9999) {
			return { valid: false, reason: "Item quantity exceeds maximum stack size" };
		}
		
		return { valid: true };
	}

	/**
	 * Validates a coordinate position
	 */
	public validatePosition(position: Vector3, bounds?: { min: Vector3; max: Vector3; }): { valid: boolean; reason?: string } {
		// Check for NaN or infinite values
		if (!this.isValidNumber(position.X) || !this.isValidNumber(position.Y) || !this.isValidNumber(position.Z)) {
			return { valid: false, reason: "Position contains invalid numbers" };
		}
		
		// Check bounds if provided
		if (bounds) {
			if (position.X < bounds.min.X || position.X > bounds.max.X ||
				position.Y < bounds.min.Y || position.Y > bounds.max.Y ||
				position.Z < bounds.min.Z || position.Z > bounds.max.Z) {
				return { valid: false, reason: "Position is outside allowed bounds" };
			}
		}
		
		return { valid: true };
	}

	/**
	 * Validates a chat message
	 */
	public validateChatMessage(message: string): { valid: boolean; reason?: string; filteredMessage?: string } {
		if (message.size() === 0) {
			return { valid: false, reason: "Message cannot be empty" };
		}
		
		if (message.size() > 200) {
			return { valid: false, reason: "Message is too long" };
		}
		
		// Basic spam detection (repeated characters)
		if (this.detectSpam(message)) {
			return { valid: false, reason: "Message appears to be spam" };
		}
		
		// In a real implementation, you would use Roblox's text filtering service
		const filteredMessage = message; // TextService.FilterStringAsync() would go here
		
		return { valid: true, filteredMessage };
	}

	private isValidNumber(num: number): boolean {
		return num === num && num !== math.huge && num !== -math.huge;
	}

	private detectSpam(message: string): boolean {
		// Check for excessive repeated characters
		let consecutiveCount = 1;
		let lastChar = "";
		
		for (let i = 0; i < message.size(); i++) {
			const char = message.sub(i + 1, i + 1);
			if (char === lastChar) {
				consecutiveCount++;
				if (consecutiveCount > 5) {
					return true; // Too many consecutive identical characters
				}
			} else {
				consecutiveCount = 1;
				lastChar = char;
			}
		}
		
		return false;
	}
}
