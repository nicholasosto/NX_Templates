/// <reference types="@rbxts/types" />

/**
 * @file        MessageSlice.ts
 * @module      MessageSlice
 * @layer       Client/State
 * @description Reactive container for transient user messages.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-06 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Value } from "@rbxts/fusion";
import { MessageShape } from "shared/definitions/Message";

export default class MessageSlice {
	private static instance: MessageSlice;

	private static messageData: Value<MessageShape | undefined> = Value(undefined);

	private constructor() {}

	public static show(message: MessageShape, duration: number = 5) {
		this.messageData.set(message);
		task.delay(duration, () => {
			if (this.messageData.get() === message) {
				this.messageData.set(undefined);
			}
		});
	}
	public static getMessageData(): Value<MessageShape | undefined> {
		return this.messageData;
	}
	public static getInstance(): MessageSlice {
		if (this.instance === undefined) {
			this.instance = new MessageSlice();
		}
		return this.instance;
	}
}
